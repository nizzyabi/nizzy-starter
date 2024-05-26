"use client";

import { CardWrapper } from "@/components/auth/card-wrapper";
import { newVerification } from "@/actions/new-verification";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-hot-toast";

export const NewVerificationForm = () => {
    const [error, setError] = useState<string | undefined>();
    const [success, setSuccess] = useState<string | undefined>();
    const [hasErrorToastShown, setHasErrorToastShown] = useState<boolean>(false);

    const searchParams = useSearchParams();
    const token = searchParams.get("token");
    const router = useRouter();

    const onSubmit = useCallback(() => {
        if (!token) {
            toast.error("No token provided");
            return;
        }
        newVerification(token).then((data) => {
            if (data?.error) {
                setTimeout(() => {
                    setError(data.error);
                }, 500);
            } else if (data?.success) {
                toast.success(data.success);
                setTimeout(() => {
                    router.push("/login");
                }, 100);
            }
        }).catch(() => {
            const errorMessage = "Something went wrong";
            setError(errorMessage);
        });
    }, [token, router]);

    useEffect(() => {
        onSubmit();
    }, [onSubmit]);

    useEffect(() => {
        if (error && !hasErrorToastShown) {
            const timer = setTimeout(() => {
                toast.error(error);
                setHasErrorToastShown(true);
            }, 100);
            return () => clearTimeout(timer); // Cleanup the timeout if component unmounts
        }
    }, [error, hasErrorToastShown]);

    return (
        <CardWrapper
            headerTitle="Verify your email"
            backButtonLabel="Back to Login"
            backButtonHref="/login"
        >
            <div className="flex items-center w-full justify-center">
                {!success && !error && (
                    <p>Verifying...</p>
                )}
            </div>
        </CardWrapper>
    );
};
