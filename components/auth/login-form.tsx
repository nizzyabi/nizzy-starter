import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CardWrapper } from "@/components/auth/card-wrapper"

export const LoginForm = () => {
    return (
        <CardWrapper
            headerTitle="Login"
            backButtonLabel="Don't have an account?"
            backButtonHref="/register"
            showSocial
        >
            <form className="space-y-3 w-full">
                <div className="space-y-2">
                    <Label className="pl-1">Email</Label>
                    <Input placeholder="Email" className="bg-secondary border-primary/20"/>
                </div>
            </form>
        </CardWrapper>
    )
}