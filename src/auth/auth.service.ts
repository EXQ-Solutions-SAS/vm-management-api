// src/auth/auth.service.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async login(loginDto: any, res: Response) {
    const { email, password } = loginDto;

    // 1. Validar usuario (aquí deberías usar bcrypt para comparar el hash)
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user || user.password !== password) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    // 2. Generar JWT Payload
    const payload = { sub: user.id, email: user.email, role: user.role };
    const token = await this.jwtService.signAsync(payload);

    // 3. Setear Cookie HttpOnly (Requerimiento clave) [cite: 37]
    res.cookie('access_token', token, {
      httpOnly: true, // No accesible desde JS del Front (previene XSS) [cite: 36, 37]
      secure: process.env.NODE_ENV === 'production', // Solo HTTPS en producción [cite: 37]
      sameSite: 'strict', // Previene CSRF [cite: 37]
      maxAge: 1000 * 60 * 60 * 24, // 1 día
    });

    // 4. Retornar info básica del usuario [cite: 40]
    return res.send({
      email: user.email,
      role: user.role,
    });
  }
}