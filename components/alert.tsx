'use client'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { RocketIcon } from 'lucide-react'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from 'react-hot-toast'
import { useState, useTransition } from 'react'
import { Form } from '@/components/ui/form'
export function AlertDemo() {
  const [loading, setLoading] = useState(false)
  const [isPending, startTransition] = useTransition();
  const [email, setEmail] = useState("")
  const [error, setError] = useState("")
  const handleSubmit = async(e:any) => {
    e.preventDefault();
    setLoading(true); // Set loading to true
    setError("");
    const email = e.target.email.value;
    try {
      const response = await fetch('/api/mail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();

      if (data.message) {
        toast.success(data.message)
         // Show success message
        setEmail(""); 
        setError('Go here')
      } else {
        console.error(data); // Handle error response
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }

  return (
    <div className="w-full max-w-6xl px-6 py-4">
      <Alert className="px-6 rounded-xl border-0 ring ring-primary/20 ring-inset text-secondary bg-primary/15 text-black dark:text-white cursor-default">
        <AlertTitle className="flex gap-1">
          <RocketIcon className="h-4 w-4" />
          Heads up!
        </AlertTitle>
        <AlertDescription className='flex'>
          <p>This is a demo. You can get the github repository</p>
          <Dialog>
            <DialogTrigger asChild>
              <p className='text-primary ml-1.5 underline cursor-pointer'>here</p>
            </DialogTrigger>
            <DialogContent className="rounded-lg sm:max-w-[425px] ">
        <DialogHeader>
          <DialogTitle>Starter Kit</DialogTitle>
          <DialogDescription>
            Enter your email to get the starterkit link in your inbox
          </DialogDescription>
        </DialogHeader>
  
          <form onSubmit={handleSubmit}>
            <Label htmlFor="name" className="text-right mb-2">
              Email
            </Label>
            <Input
              onChange={(e) => setEmail(e.target.value)}
              name="email" 
              id="email" 
              type="email" 
              required 
              placeholder="tylerdurder@gmail.com"
              className="mt-3"
              value={email} 
            />
        <DialogFooter>
          <Button type="submit" className='mt-4'>Get The Starter Kit</Button>
        </DialogFooter>
        </form>
      </DialogContent>
          </Dialog>
        </AlertDescription>
      </Alert>
    </div>
  )
}
