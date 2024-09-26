"use server";

import { prisma } from "../prisma"
import { randomBytes, pbkdf2Sync } from 'crypto'

function generatePassword(): string {
  const length = 16
  const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+'
  let password = ''

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length)
    password += charset[randomIndex]
  }

  
  const salt = randomBytes(16).toString('hex')
  const hashedPassword = pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex')

  return hashedPassword
}
export const registerUser = async (user: { email: string; password: string; name: string }) => {
    const isExist = await prisma.users.findUnique({
        where: {
            email: user.email,
        },
    });

    if (isExist) {
        return { success: false, message: "User already exists" };
    }

    const newUser = await prisma.users.create({
        data: {
            email: user.email,
            password: generatePassword(),
            username: user.name,
        },
    });

    return newUser;
};
