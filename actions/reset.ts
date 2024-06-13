'use server'
import * as z from 'zod'
import { getUserByEmail } from '@/data/user'
import { ResetSchema } from '@/schemas'
import { sendPasswordResetEmail } from '@/lib/mail'
import { generatePasswordResetToken } from '@/lib/tokens'

export const reset = async (values: z.infer<typeof ResetSchema>) => {
  // validate fields
  const validatedFields = ResetSchema.safeParse(values)
  // check if fields are valid
  if (!validatedFields.success) {
    return { error: 'Invalid email!' }
  }
  // extract email
  const { email } = validatedFields.data

  // check exisiting user
  const existingUser = await getUserByEmail(email)
  // if user does not exist
  if (!existingUser) {
    return { error: 'Email does not exist!' }
  }
  //send reset email
  const passwordResetToken = await generatePasswordResetToken(email)
  await sendPasswordResetEmail(
    passwordResetToken.email,
    passwordResetToken.token
  )
  // success message
  return { success: 'Reset email sent 📫' }
}
