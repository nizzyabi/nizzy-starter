import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Palette, RocketIcon } from 'lucide-react'
import { Button } from './ui/button'
import Link from 'next/link'

export function AlertDemo() {
  return (
    <div className="w-full max-w-6xl px-6 py-4">
      <Alert className="flex flex-col sm:flex-row gap-4 justify-between px-6 rounded-xl border-0 ring ring-primary/20 ring-inset text-secondary bg-primary/15 text-black dark:text-white cursor-default">
        <div>
          <AlertTitle className="flex gap-1">
            <RocketIcon className="h-4 w-4" />
            Heads up!
          </AlertTitle>
          <AlertDescription>
            This is a demo. You can find the github repository{' '}
            <a
              className="text-primary transition duration-300"
              href="https://github.com/NizarAbiZaher/nizzy-starter"
              target="_blank"
            >
              here
            </a>
            .
          </AlertDescription>
        </div>
        <Link href="/customize" className="mx-auto sm:mx-0">
          <Button className="gap-2 text-foreground" variant="link">
            <Palette className="w-5 h-5" />
            Customize
          </Button>
        </Link>
      </Alert>
    </div>
  )
}
