import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"
import { RocketIcon } from "lucide-react"
 
export function AlertDemo() {
  return (
    <Alert className="text-secondary bg-primary">
      <RocketIcon className="h-4 w-4 text-white dark:text-black" />
      <AlertTitle>Heads up!</AlertTitle>
      <AlertDescription>
        This is a demo.
      </AlertDescription>
    </Alert>
  )
}