import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CardWrapper } from "@/components/auth/card-wrapper"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export const LoginForm = () => {
    return (
        <CardWrapper
            headerTitle="Login"
            backButtonLabel="Don't have an account?"
            backButtonHref="/register"
            showSocial
        >
            <form className="space-y-1 w-full">
                <div className="space-y-2">
                    <Label className="pl-1">Email</Label>
                    <Input placeholder="Email" className="bg-secondary border-primary/20"/>
                    <Label className="pl-1">Password</Label>
                    <Input placeholder="Password" id="password" type="password" className="bg-secondary border-primary/20"/>
                </div>
                <Button size="sm" variant="link" className=" px-0 pl-1">
                    <Link href="/forgot-password">Forgot Password?</Link>
                </Button>
                <div className="pb-3">
                    <Button className="w-full">Login</Button>
                </div>
            </form>
        </CardWrapper>
    )
}