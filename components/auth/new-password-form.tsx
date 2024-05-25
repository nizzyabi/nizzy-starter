'use client';
import * as z from "zod";
import { CardWrapper } from "@/components/auth/card-wrapper"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form"
import { NewPasswordSchema } from "@/schemas";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useTransition } from "react";
import { newPassword } from "@/actions/new-password";
import { toast } from "react-hot-toast";

export const NewPasswordForm = () => {
    const searchParams = useSearchParams();
    const token = searchParams.get("token");
    const router = useRouter()
    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof NewPasswordSchema>>({
        resolver: zodResolver(NewPasswordSchema),
        defaultValues: {
            password: "",
        }
    })

    const onSubmit = (values: z.infer<typeof NewPasswordSchema>) => {
        startTransition(() => {
            newPassword(values, token).then((data) => {
                if (data?.error) {
                    toast.error(data.error);
                }
                if (data?.success) {
                    toast.success(data.success)
                    form.reset({ password: "" })
                }
                router.push("/login")
             })
        })
    }
    return (
        <CardWrapper
            headerTitle="Reset Password"
            backButtonHref="/login"
            backButtonLabel="Back to login"
        >
            <Form {...form}>
                <form 
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-4 w-full"
                >
                    <div className="space-y-4">
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
                                            type='Password'
                                            className="bg-secondary border-primary/20"
                                        />
                                    </FormControl>
                                    <FormMessage className="text-red-500" />
                                </FormItem>
                            )}
                        />
                    </div>
                    <Button 
                        className="w-full mt-4"
                        disabled={isPending}
                        type="submit"
                    >
                        Reset Password 
                    </Button>
                </form>
            </Form>
        </CardWrapper>
    )
}