import { PrismaClient, UserRole } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash("admin123", 12);

  const admin = await prisma.user.upsert({
    where: {
      email: "admin@nexus.local",
    },
    update: {
      name: "Nexus Admin",
      passwordHash,
      role: UserRole.ADMIN,
    },
    create: {
      name: "Nexus Admin",
      email: "admin@nexus.local",
      passwordHash,
      role: UserRole.ADMIN,
    },
  });

  console.log("Default admin created:");
  console.log({
    id: admin.id,
    name: admin.name,
    email: admin.email,
    role: admin.role,
  });
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
