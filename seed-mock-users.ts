import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const password = await bcrypt.hash("password123", 10);

  await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: { password },
    create: {
      email: 'admin@example.com',
      name: 'Mock Admin',
      role: 'ADMIN',
      password,
    }
  });

  await prisma.user.upsert({
    where: { email: 'organizer@example.com' },
    update: { password },
    create: {
      email: 'organizer@example.com',
      name: 'Mock Organizer',
      role: 'ORGANIZER',
      password,
    }
  });

  await prisma.user.upsert({
    where: { email: 'attendee@example.com' },
    update: { password },
    create: {
      email: 'attendee@example.com',
      name: 'Mock Attendee',
      role: 'ATTENDEE',
      password,
    }
  });

  console.log("Mock users seeded.");
}

main().catch(console.error).finally(() => prisma.$disconnect());
