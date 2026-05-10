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

    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user || user.password !== password) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    //  Generar JWT Payload
    const payload = { sub: user.id, email: user.email, role: user.role };
    const token = await this.jwtService.signAsync(payload);

    //  Setear Cookie HttpOnly (Requerimiento clave) 
    res.cookie('access_token', token, {
      httpOnly: true, // No accesible desde JS del Front (previene XSS) 
      secure: process.env.NODE_ENV === 'production', // Solo HTTPS en producción 
      sameSite: 'strict', // Previene CSRF 
      maxAge: 1000 * 60 * 60 * 24, // 1 día
    });

    //  Retornar info básica del usuario 
    return res.send({
      email: user.email,
      role: user.role,
    });
  }
}