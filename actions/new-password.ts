'use server'
import * as z from 'zod'
import { NewPasswordSchema } from '@/schemas'
import { getPasswordResetTokenByToken } from '@/data/password-reset-token'
import { getUserByEmail } from '@/data/user'
import bcrypt from 'bcrypt'
import { db } from '@/lib/db'

export const newPassword = async (
  values: z.infer<typeof NewPasswordSchema>,
  token?: string | null
) => {
  // if error, return error
  if (!token) {
    return { error: 'Token is required' }
  }

  // validate fields
  const validatedFields = NewPasswordSchema.safeParse(values)

  // if not fields are not valid, return error
  if (!validatedFields.success) {
    return { error: 'Invalid Fields' }
  }

  // extract password
  const { password } = validatedFields.data

  // token validation
  const existingToken = await getPasswordResetTokenByToken(token)

  // if token not found, return error
  if (!existingToken) {
    return { error: 'Invalid Token' }
  }

  // check if token is expired (if it is less than the date we set, which is an hour)
  const hasExpired = new Date(existingToken.expires) < new Date()

  // if expired, return error
  if (hasExpired) {
    return { error: 'Token has expired' }
  }

  // check exisiting user
  const existingUser = await getUserByEmail(existingToken.email)

  // if user not found, return error
  if (!existingUser) {
    return { error: 'Email not found' }
  }
  // hash password
  const hashedPassword = await bcrypt.hash(password, 10)

  // update db
  await db.user.update({
    where: { id: existingUser.id },
    data: {
      password: hashedPassword
    }
  })

  // delete token
  await db.passwordResetToken.delete({
    where: { id: existingToken.id }
  })

  // return success message
  return { success: 'Password updated successfully' }
}
