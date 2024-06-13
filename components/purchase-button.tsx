'use client'
import axios from 'axios'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { Button } from '@/components/ui/button'

export const PurchaseButton = () => {
  const [isLoading, setIsLoading] = useState(false)
  const onClick = async () => {
    try {
      setIsLoading(true)
      const response = await axios.post('/api/checkout')
      window.location.href = response.data.url
    } catch (error) {
      toast.error('An error occurred. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }
  return (
    <Button onClick={onClick} disabled={isLoading}>
      {isLoading ? 'Loading...' : 'Purchase'}
    </Button>
  )
}
