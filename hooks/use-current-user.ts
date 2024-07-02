// Hook to get user data in a more convenient way
import { useSession } from 'next-auth/react'

export const useCurrentUser = () => {
  try {
    const session = useSession()
    return session.data?.user
  } catch (err){
    console.error("Error in getCurrentUser:", err)
    return null
  }
}