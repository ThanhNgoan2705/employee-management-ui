"use client";
import {useEffect, useState} from "react";
import {toast, ToastContainer, Zoom} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useRouter} from 'next/navigation';
import {Layout} from "@/components/account";

export default function Login() {
    // const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState("");
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
            // email: username,
            email: email,
            password: password
        };
        try {
            const response = await fetch("http://127.0.0.1:8080/users/login", {
                method: "POST",
                headers: {'content-type': 'application/json'},
                body: JSON.stringify(loginDTO)
            });

            console.log(response);
            if (response.ok) {// có dữ liệu trả về
                if (response.status === 400) {
                    //
                } else if (response.status === 401) {
                    //
                } else if (response.status === 200) {
                    //
                    const resq = await response.json();
                    if (resq.status === 1) {
                        sessionStorage.setItem('email', resq.data.email);// Lưu giá trị từ biến state `username`

                        // Store JSON Data
                        let dataConvertString = JSON.stringify(resq.data);// convert string to object
                        sessionStorage.setItem('userInfo', dataConvertString);

                        let name = sessionStorage.getItem('email');
                        console.log(name); // In ra giá trị email đã lưu trữ trong phiên làm việc
                        console.log("thành công");
                        router.push('/');
                    } else {
                        toast.error(resq.message); // Hiển thị thông báo lỗi từ API trong giao diện
                    }
                }
            }
        } catch (err) {
            toast.error('Failed: ' + err.message); // Hiển thị thông báo lỗi trong giao diện
        }
    };


    const validate = () => {
        let result = true;
        // if (username === '' || username === null) {
        //     result = false;
        //     console.log('Please Enter Username');
        // }
        if (password === '' || password === null) {
            result = false;
            console.log('Please Enter Password');
        }
        if (email === '' || email === null) {
            toast.warning('Please enter Email');
            return false;
        }
        if (!/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email)) {
            toast.warning('Please enter a valid email');
            return false;
        }
        return result;
    };
    return (
        <>
            <Layout>
                <div className="flex items-center justify-center h-screen bg-gray-100 dark:bg-zinc-800">
                    <form
                        className="flex flex-col items-center justify-between w-full max-w-md p-8 bg-white rounded-xl shadow-lg dark:bg-zinc-800/30">
                        <h1 className="mb-8 text-3xl font-semibold text-center">Login</h1>
                        <input
                            // value={username}
                            // onChange={(e) => setUsername(e.target.value)}
                            // type="name"
                            // placeholder="Username"
                            className="w-full p-4 mb-4 border border-gray-300 rounded-lg dark:border-neutral-800"

                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            type="email"
                            placeholder="Email"
                        />
                        <input
                            value={password}
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
                    >
                    </ToastContainer>
                </div>
            </Layout>
        </>
    );
}