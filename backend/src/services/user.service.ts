import { prisma } from "../plugins/db.js";
import { hashPassword } from "../utils/password.js";
import { AppError } from "../utils/errors.js";

interface CreateUserInput {
  name: string;
  email: string;
  password: string;
  role: "CLIENT" | "ADMIN";
}

export async function getUsers() {
  return prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
      updatedAt: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function getUserById(id: string) {
  const user = await prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  if (!user) {
    throw new AppError("User not found", 404);
  }

  return user;
}

export async function createUser(data: CreateUserInput) {
  const existing = await prisma.user.findUnique({
    where: {
      email: data.email,
    },
  });

  if (existing) {
    throw new AppError("An account with this email already exists", 409);
  }

  const passwordHash = await hashPassword(data.password);

  return prisma.user.create({
    data: {
      name: data.name,
      email: data.email,
      passwordHash,
      role: data.role,
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
      updatedAt: true,
    },
  });
}

export async function updateUser(
  id: string,
  data: {
    name?: string;
    email?: string;
    password?: string;
    role?: "CLIENT" | "ADMIN";
  },
) {
  const updateData: {
    name?: string;
    email?: string;
    passwordHash?: string;
    role?: "CLIENT" | "ADMIN";
  } = {};

  if (data.name !== undefined) {
    updateData.name = data.name;
  }

  if (data.email !== undefined) {
    updateData.email = data.email;
  }

  if (data.password !== undefined) {
    updateData.passwordHash = await hashPassword(data.password);
  }

  if (data.role !== undefined) {
    updateData.role = data.role;
  }

  try {
    return await prisma.user.update({
      where: { id },
      data: updateData,
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  } catch {
    throw new AppError("User not found", 404);
  }
}
