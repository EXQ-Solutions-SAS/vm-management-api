// prisma/seed.ts
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import * as dotenv from 'dotenv';

dotenv.config();

// 1. Configuración del adaptador igual que en tu Service
const url = process.env.DATABASE_URL?.replace(/"/g, '');
const pool = new Pool({ connectionString: url });
const adapter = new PrismaPg(pool);

// 2. Instanciamos con el adaptador requerido en Prisma 7
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('🌱 Iniciando seeding con Prisma 7 Adapter...');

  const adminPassword = 'admin_password'; // Idealmente usa bcrypt.hash()
  const clientePassword = 'cliente_password';

  // Seed de Usuarios según requerimiento [cite: 40, 56]
  await prisma.user.upsert({
    where: { email: 'admin@ifx.com' },
    update: {},
    create: {
      email: 'admin@ifx.com',
      password: adminPassword,
      role: 'ADMIN',
    },
  });

  await prisma.user.upsert({
    where: { email: 'cliente@ifx.com' },
    update: {},
    create: {
      email: 'cliente@ifx.com',
      password: clientePassword,
      role: 'CLIENTE',
    },
  });

  console.log('✅ Usuarios creados: admin@ifx.com y cliente@ifx.com');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end(); // Importante cerrar el pool de pg al terminar
  });