import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const email = process.env.ADMIN_EMAIL;
const password = process.env.ADMIN_PASSWORD;

if (!email || !password) {
  throw new Error("ADMIN_EMAIL and ADMIN_PASSWORD are required.");
}

const passwordHash = await bcrypt.hash(password, 12);

await prisma.admin.upsert({
  where: { email },
  update: { passwordHash },
  create: {
    email,
    passwordHash,
  },
});

console.log(`Admin created/updated: ${email}`);

await prisma.$disconnect();
