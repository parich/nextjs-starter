import { v4 as uuidv4 } from "uuid";
import { prisma } from "@/lib/prisma";

export const generatePasswordResetToken = async (email: string) => {
  const token = uuidv4();
  const expires = new Date(new Date().getTime() + 3600 * 1000); // 1 hour

  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (!existingUser) {
    throw new Error("User not found");
  }

  const existingToken = await prisma.passwordResetToken.findFirst({
    where: { email },
  });

  if (existingToken) {
    await prisma.passwordResetToken.delete({
      where: { id: existingToken.id },
    });
  }

  const passwordResetToken = await prisma.passwordResetToken.create({
    data: {
      email,
      token,
      expires,
      userId: existingUser.id,
    },
  });

  return passwordResetToken;
};

export const getPasswordResetTokenByToken = async (token: string) => {
  try {
    const passwordResetToken = await prisma.passwordResetToken.findUnique({
      where: { token },
    });

    return passwordResetToken;
  } catch {
    return null;
  }
};

export const getPasswordResetTokenByEmail = async (email: string) => {
  try {
    const passwordResetToken = await prisma.passwordResetToken.findFirst({
      where: { email },
    });

    return passwordResetToken;
  } catch {
    return null;
  }
};
