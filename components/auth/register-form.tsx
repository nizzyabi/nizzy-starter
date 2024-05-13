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
import { RegisterSchema } from "@/schemas"
import { Input } from "@/components/ui/input"
import { CardWrapper } from "@/components/auth/card-wrapper"
import { FormError } from "@/components/auth/form-error"
import { FormSuccess } from "@/components/auth/form-success"
import { Button } from "@/components/ui/button"
import { useState, useTransition } from "react"
import { register } from "@/actions/register"

export const RegisterForm = () => {
    const [isPending, startTransition] = useTransition()
    const [error, setError] = useState<string | undefined>('')
    const [success, setSuccess] = useState<string | undefined>('')
  
    const form = useForm<z.infer<typeof RegisterSchema>>({
      resolver: zodResolver(RegisterSchema),
      defaultValues: {
        email: '',
        password: '',
        name: ''
      }
    })

    const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
        setError('')
        setSuccess('')
        startTransition(() => {
          register(values).then((data) => {
            setError(data.error)
            setSuccess(data.success)
          })
        })
      }

    return (
        <CardWrapper
        headerTitle="Register"
        backButtonLabel="Already have an account?"
        backButtonHref="/login"
        showSocial
    >
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-1 w-full">
                <div className="space-y-2">
                <FormField 
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input 
                                        {...field}
                                        placeholder="Tyler Durden"
                                        disabled={isPending}
                                        type="name"
                                        className="bg-secondary border-primary/20"
                                    />
                                </FormControl>
                                <FormMessage className="text-red-500" />
                            </FormItem>
                        )}
                    />
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
                                        placeholder="Password"
                                        disabled={isPending}
                                        type="password"
                                        className="bg-secondary border-primary/20"
                                    />
                                </FormControl>
                                <FormMessage className="text-red-500 " />
                            </FormItem>
                        )}
                    />
                    <div></div>    
                </div>
                <FormError message={error} />
                <FormSuccess message={success} />
            
                <Button 
                    className="w-full"
                    disabled={isPending}
                    type="submit"
                >
                    Register
                </Button>
            </form>
        </Form>
    </CardWrapper>
    )
}