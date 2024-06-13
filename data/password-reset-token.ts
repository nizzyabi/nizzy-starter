import { db } from '@/lib/db'

// token functionality
export const getPasswordResetTokenByToken = async (token: string) => {
  try {
    const passwordResetToken = await db.passwordResetToken.findUnique({
      where: { token }
    })
    return passwordResetToken
  } catch {
    return null
  }
}

// Token Email functionality (match emails)
export const getPasswordResetTokenByEmail = async (email: string) => {
  try {
    const passwordResetToken = await db.passwordResetToken.findFirst({
      where: { email }
    })
    return passwordResetToken
  } catch {
    return null
  }
}
