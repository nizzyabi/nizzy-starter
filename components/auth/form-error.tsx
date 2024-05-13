import { FaExclamationTriangle } from "react-icons/fa";

// Error Message For Authentication
interface FormErrorProps {
    message?: string;
}

export const FormError = ({
    message,
}: FormErrorProps) => {
    if (!message) return null;
    return (
        <div className="bg-red-400/20 p-3 rounded flex items-center gap-x-2 text-sm text-destructive text-red-500 font-bold border border-red-500">
            <FaExclamationTriangle className="h-4 w-4 "/>
            <p>{message}</p>
        </div>
    )
}