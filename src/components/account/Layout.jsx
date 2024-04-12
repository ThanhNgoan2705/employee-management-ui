import { useEffect } from 'react';
import { useRouter } from 'next/router';
import {userService} from "@/services/user.service";
export { Layout };
import '/src/app/globals.css';
function Layout({ children }) {
    const router = useRouter();

    useEffect(() => {
        // redirect to home if already logged in
        if (userService.userValue) {
            router.push('/');
        }
    }, []);

    return (
        <main className="p-1 bg-blue-50" >
            {children}
        </main>
    );
}