import { UserRole } from '@prisma/client'
import NextAuth, { type DefaultSession } from 'next-auth'

// write extended user

// It is a bit messy, so in the future, checkout the docs for a better way to do this (authjs.dev/getting-started/typescript)

export type ExtendedUser = DefaultSession['user'] & {
  role: UserRole
}

declare module 'next-auth' {
  interface Session {
    user: ExtendedUser
    userId: string
  }
}
