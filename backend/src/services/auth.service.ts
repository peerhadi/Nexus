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

const publicUserSelect = {
  id: true,
  name: true,
  email: true,
  role: true,
  createdAt: true,
} as const;

function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

export async function signup(data: SignupInput) {
  const name = typeof data.name === "string" ? data.name.trim() : "";
  const email = normalizeEmail(data.email);
  const password = data.password;

  if (name.length < 2 || name.length > 100) {
    throw new AppError("Name must be between 2 and 100 characters", 400);
  }

  if (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw new AppError("A valid email address is required", 400);
  }

  if (
    typeof password !== "string" ||
    password.length < 12 ||
    password.length > 128
  ) {
    throw new AppError("Password must be between 12 and 128 characters", 400);
  }

  const existingUser = await prisma.user.findUnique({
    where: { email },
    select: { id: true },
  });

  if (existingUser) {
    throw new AppError("An account with this email already exists", 409);
  }

  const passwordHash = await hashPassword(password);

  try {
    return await prisma.user.create({
      data: {
        name,
        email,
        passwordHash,
        role: "CLIENT",
      },
      select: publicUserSelect,
    });
  } catch (error: unknown) {
    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      error.code === "P2002"
    ) {
      throw new AppError("An account with this email already exists", 409);
    }

    throw error;
  }
}

export async function login(data: LoginInput) {
  const email =
    typeof data.email === "string" ? normalizeEmail(data.email) : "";
  const password = data.password;

  if (
    !email ||
    email.length > 254 ||
    typeof password !== "string" ||
    password.length === 0 ||
    password.length > 128
  ) {
    throw new AppError("Invalid email or password", 401);
  }

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw new AppError("Invalid email or password", 401);
  }

  const validPassword = await comparePassword(password, user.passwordHash);

  if (!validPassword) {
    throw new AppError("Invalid email or password", 401);
  }

  const { passwordHash: _passwordHash, ...safeUser } = user;

  return safeUser;
}
