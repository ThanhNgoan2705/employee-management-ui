"use client";
import { useEffect, useState } from "react";
import { toast, ToastContainer, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation'
import { Layout } from "@/components/account";

export default function Login() {
    const [username, setUsername] = useState('');
    const [pass, setPassword] = useState('');
    // const [email, setEmail] = useState("");
    const router = useRouter();

    // const handleButtonClick = () => {
    //     router.push('/');
    //   };

    // Login bình thường
    const ProceedLogin = async (e) => {
        e.preventDefault();
        if (!validate()) {
            return;

        }
        const loginDTO = {
            username: username,
            pass: pass
            // email:email
        };
        // Log the username and password
        console.log('Username:', username);
        console.log('Password:', pass);
        try {
            const response = await fetch("http://localhost:8081/api/login", {
                method: "POST",
                headers: {'content-type': 'application/json'},
                body: JSON.stringify(loginDTO)
            });
            console.log("response" + response.status);
            console.log("response" + response);
            const userId = await response.json();
            if (response.status === 200) {
                if (userId !== null) {
                    sessionStorage.setItem('userId', userId);
                    const response = await fetch(`http://localhost:8081/api/employees/${userId}`, {
                        method: "GET",
                        headers: {'content-type': 'application/json'}
                    });
                    const userInfo = await response.json();
                    console.log(userInfo);
                }
                router.push('/account/leaveList');
            } else {
                toast.error('Failed: ' + response.status); // Hiển thị thông báo lỗi trong giao diện
            }
        } catch (err) {
            toast.error('Failed: ' + err.message); // Hiển thị thông báo lỗi trong giao diện
        }
    };


    const validate = () => {
        let result = true;

        if (username === '' || username === null) {
            result = false;
            console.log('Please Enter Username');
        } else if (!/^[a-zA-Z0-9]+$/.test(username)) {
            result = false;
            console.log('Please Enter a Username with only alphanumeric characters');
        }
        if (pass === '' || pass === null) {
            result = false;
            console.log('Please Enter Password');
        }
        if (pass.length <8) {
            result = false;
            console.log('Password must be at least 8 characters long');
            alert('Password must be at least 8 characters long');
        }
        return result;
    };
    return (
        <>
            <Layout>
                <main className="flex min-h-screen flex-col items-center justify-between p-24">
                    <form id="yourFormId"
                          className="flex flex-col items-center justify-between w-full max-w-md p-8 bg-white rounded-xl shadow-lg dark:bg-zinc-800/30">
                        <h1 className="mb-8 text-3xl font-semibold text-center">Login</h1>
                        <input
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            type="name"
                            placeholder="Username"
                            className="w-full p-4 mb-4 border border-gray-300 rounded-lg dark:border-neutral-800"
                        />
                        <input
                            value={pass}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-4 mb-4 border border-gray-300 rounded-lg dark:border-neutral-800"
                            type="password"
                            placeholder="Password"
                        />
                        <button
                            type="submit"
                            className="w-full p-4 mb-4 text-white bg-gradient-to-r from-sky-500 to-blue-500 rounded-lg"
                            onClick={ProceedLogin}
                        >
                            Login
                        </button>
                        <p className="text-sm opacity-50">
                            {/* eslint-disable-next-line react/no-unescaped-entities */}
                            Don't have an account?{" "}
                            <a href="#" className="text-blue-500">
                                Sign up
                            </a>
                        </p>
                    </form>
                    <ToastContainer
                        className="toast-container"
                        toastClassName="toast"
                        bodyClassName="toast-body"
                        progressClassName="toast-progress"
                        theme='colored'
                        transition={Zoom}
                        autoClose={5}
                        hideProgressBar={true}
                    ></ToastContainer>
                </main>
            </Layout>
        </>
    );
}