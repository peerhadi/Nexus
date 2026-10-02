import { prisma } from "../plugins/db.js";
import { comparePassword, hashPassword } from "../utils/password.js";
import { AppError } from "../utils/errors.js";

interface SignupInput {
  name: string;
  email: string;
  password: string;
}

interface LoginInput {
  email: string;
  password: string;
}

export async function signup(data: SignupInput) {
  const existingUser = await prisma.user.findUnique({
    where: {
      email: data.email,
    },
  });

  if (existingUser) {
    throw new AppError("An account with this email already exists", 409);
  }

  const passwordHash = await hashPassword(data.password);

  return prisma.user.create({
    data: {
      name: data.name,
      email: data.email,
      passwordHash,
      role: "CLIENT",
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
    },
  });
}

export async function login(data: LoginInput) {
  const user = await prisma.user.findUnique({
    where: {
      email: data.email,
    },
  });

  if (!user) {
    throw new AppError("Invalid email or password", 401);
  }

  const validPassword = await comparePassword(data.password, user.passwordHash);

  if (!validPassword) {
    throw new AppError("Invalid email or password", 401);
  }

  return user;
}
