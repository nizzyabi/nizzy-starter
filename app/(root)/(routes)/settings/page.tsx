'use client'

import { useCurrentUser } from "@/hooks/use-current-user"


const SettingsPage =  () => {
    const session = useCurrentUser()
    return (
        <div>
            {session?.name}
        </div>
    )
}

export default SettingsPage