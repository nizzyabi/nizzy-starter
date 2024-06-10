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
        This is a demo. You can find the github repository <a className="underline" href='https://github.com/NizarAbiZaher/nizzy-starter' target="_blank">here</a>
      </AlertDescription>
    </Alert>
  )
}