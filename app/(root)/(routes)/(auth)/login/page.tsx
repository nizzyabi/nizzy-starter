'use client'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { LoginSchema } from '@/schemas'
import { Input } from '@/components/ui/input'
import { CardWrapper } from '@/components/auth/card-wrapper'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useEffect, useRef, useTransition } from 'react'
import { login } from '@/actions/login'
import toast from 'react-hot-toast'

export default function Page() {
  const searchParams = useSearchParams()
  const urlError =
    searchParams.get('error') === 'OAuthAccountNotLinked'
      ? 'Email already in use with different provider!'
      : ''

  const [isPending, startTransition] = useTransition()
  const hasDisplayedError = useRef(false)
  useEffect(() => {
    if (urlError && !hasDisplayedError.current) {
      toast.error(urlError)
      hasDisplayedError.current = true
    }
  }, [urlError])

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    startTransition(() => {
      login(values).then((data) => {
        if (data?.error) {
          toast.error(data.error)
        }
        if (data?.success) {
          toast.success(data.success)
          form.reset({ email: '', password: '' })
          window.location.href = '/'
        }
      })
    })
  }
  return (
    <CardWrapper
      headerTitle="Login"
      backButtonLabel="Don't have an account?"
      backButtonHref="/register"
      showSocial
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-1">
          <div className="space-y-2">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="tylerdurden@gmail.com"
                      disabled={isPending}
                      type="email"
                      className="bg-background/50 dark:bg-background/30 ring-foreground/5"
                    />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="••••••••"
                      disabled={isPending}
                      type="password"
                      className="bg-background/50 dark:bg-background/30 ring-foreground/5"
                    />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                  <Button
                    size="sm"
                    variant="link"
                    className="px-0 text-blue-500"
                  >
                    <Link href="/reset">Forgot Password?</Link>
                  </Button>
                </FormItem>
              )}
            />
          </div>
          <Button className="w-full" disabled={isPending} type="submit">
            Login
          </Button>
        </form>
      </Form>
    </CardWrapper>
  )
}
