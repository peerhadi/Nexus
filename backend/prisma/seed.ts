import { PrismaClient, UserRole } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

const admins = [
  { name: "Hadi", email: "hadi@nexusmade.com" },
  { name: "Izhaan", email: "izhaan@nexusmade.com" },
  { name: "Ahmad", email: "ahmad@nexusmade.com" },
  { name: "Suwaid", email: "suwaid@nexusmade.com" },
];

async function main() {
  const passwordHash = await bcrypt.hash("nexusadmin@26", 12);

  for (const admin of admins) {
    const user = await prisma.user.upsert({
      where: { email: admin.email },
      update: {
        name: admin.name,
        passwordHash,
        role: UserRole.ADMIN,
      },
      create: {
        name: admin.name,
        email: admin.email,
        passwordHash,
        role: UserRole.ADMIN,
      },
    });

    console.log(`Admin account ready: ${user.email} (${user.role})`);
  }

  console.log("\nAll admin accounts created successfully.");
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
