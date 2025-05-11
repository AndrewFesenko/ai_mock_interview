import {ReactNode} from 'react'
import Link from "next/link";
import Image from "next/image";
import {isAuthenticated} from "@/lib/actions/auth.action";
import {redirect} from "next/navigation";
import {Button} from "@/components/ui/button";
import {signOut} from "@/lib/actions/auth.action";

const RootLayout = async ({ children }: { children : ReactNode}) => {
    const isUserAuthenticated = await isAuthenticated();

    if(!isUserAuthenticated) redirect('/sign-in');

    return (
        <div className="root-layout">
            <nav className="flex items-center justify-between">
                <Link href='/' className="flex items-center gap-2">
                    <Image src="/logo.svg" alt="Logo" width={38} height={32} />
                    <h2 className="text-primary-100">EchoHire</h2>
                </Link>

                <form action={signOut}>
                    <Button 
                        type="submit" 
                        variant="ghost" 
                        size="default"
                        className="text-light-100"
                    >
                        Sign Out
                    </Button>
                </form>
            </nav>

            {children}
        </div>
    )
}
export default RootLayout
