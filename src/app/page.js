"use client";
import Image from "next/image";
import Link from "next/link";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowRightToBracket} from "@fortawesome/free-solid-svg-icons";
export default function Home() {

    return (
        <main className="flex flex-col items-center justify-between p-24">
            <h1 className="text-3xl mb-4 p-3 font-semibold text-center">Welcome to Employee Leave Management</h1>
            <Image
                src="/leave_emp.png"
                alt="leave_emp"
                width={700}
                height={600}
            />
            <Link href={'/auth/login'}>
                <btn className="w-full px-8 py-4 mt-14 text-white bg-gradient-to-r from-sky-500 to-blue-500 rounded-lg">
                    Login to Continue <FontAwesomeIcon icon={faArrowRightToBracket} />
                </btn>
            </Link>
            {/*<LeaveRequestForm/>*/}
            {/*<ExitRequestForm/>*/}
            {/*<Login/>*/}
        </main>
    );
}
