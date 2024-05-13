'use client'

import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
  } from "@/components/ui/form"
import { LoginSchema } from "@/schemas"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CardWrapper } from "@/components/auth/card-wrapper"
import { FormError } from "@/components/auth/form-error"
import { FormSuccess } from "@/components/auth/form-success"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { useState, useTransition } from "react"
import { login } from "@/actions/login"

export const LoginForm = () => {
    // Error handling
    const searchParams = useSearchParams()
    const urlError = searchParams.get('error') === 'OAuthAccountNotLinked'
      ? 'Email already in use with different provider!'
      : ''

    const [isPending, startTransition] = useTransition()
    const [error, setError] = useState<string | undefined>('')
    const [success, setSuccess] = useState<string | undefined>('')
    
    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: '',
            password: ''
        }
    })

    const onSubmit = (values: z.infer<typeof LoginSchema>) => {
        setError('');
        setSuccess('');
        startTransition(() => {
            login(values).then((data) => {
                setError('');
                setSuccess('');
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
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-1 w-full">
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
                                            className="bg-secondary border-primary/20"
                                        />
                                    </FormControl>
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
                                            placeholder="Password"
                                            disabled={isPending}
                                            type="password"
                                            className="bg-secondary border-primary/20"
                                        />
                                    </FormControl>
                                    <Button size="sm" variant="link" className=" px-0 pl-1">
                                        <Link href="/forgot-password">Forgot Password?</Link>
                                    </Button>
                                </FormItem>
                            )}
                        />    
                    </div>
                    <FormError message={error || urlError} />
                    <FormSuccess message={success} />
                
                
                    <Button 
                        className="w-full"
                        disabled={isPending}
                        type="submit"
                    >
                        Login
                    </Button>
                </form>
            </Form>
        </CardWrapper>
    )
}