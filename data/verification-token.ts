import { db } from '@/lib/db'

export const getVerificationTokenByToken = async (token: string) => {
  // Get Verification Token
  try {
    const verificationToken = await db.verificationToken.findUnique({
      where: { token }
    })

    return verificationToken
  } catch {
    return null
  }
}

export const getVerificationTokenByEmail = async (email: string) => {
  // Get Email Verification
  try {
    const verificationToken = await db.verificationToken.findFirst({
      where: { email }
    })

    return verificationToken
  } catch {
    return null
  }
}
