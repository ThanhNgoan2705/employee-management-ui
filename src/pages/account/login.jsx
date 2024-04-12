"use client";
import { useEffect, useState } from "react";
import { toast, ToastContainer, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation'
import { Layout } from "@/components/account";

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
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
            password: password
            // email:email
        };
        try {
            const response = await fetch("http://127.0.0.1:8080/users/login", {
                method: "POST",
                headers: { 'content-type': 'application/json' },
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
                        sessionStorage.setItem('username', resq.data.username);// Lưu giá trị từ biến state `username`

                        // Store JSON Data
                        let dataConvertString = JSON.stringify(resq.data);// convert string to object 
                        sessionStorage.setItem('userInfo', dataConvertString);

                        let name = sessionStorage.getItem('username');
                        console.log(name); // In ra giá trị username đã lưu trữ trong phiên làm việc
                        console.log("thành công");
                        router.push('/account/leaveList');
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

        if (username === '' || username === null) {
            result = false;
            console.log('Please Enter Username');
        }
        if (username.length >= 8) {
            result = false;
            console.log('Please Enter a Username with exactly 8 characters');
        } if (!/^[a-zA-Z0-9]+$/.test(username)) {
            result = false;
            console.log('Please Enter a Username with only alphanumeric characters');
        }
        if (password === '' || password === null) {
            result = false;
            console.log('Please Enter Password');
        }
        if (password.length >= 8) {
            result = false;
            console.log('Please Enter a password with exactly 8 characters');
        }


        // if (email === '' || email === null) {
        //     toast.warning('Please enter Email');
        //     return false;
        // } if (!/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email)) {
        //     toast.warning('Please enter a valid email');
        //     return false;
        // }
        return result;
    };


    return (
        <>
            <Layout>
                <main className="flex min-h-screen flex-col items-center justify-between p-24">
                    <form className="flex flex-col items-center justify-between w-full max-w-md p-8 bg-white rounded-xl shadow-lg dark:bg-zinc-800/30">
                        <h1 className="mb-8 text-3xl font-semibold text-center">Login</h1>
                        <input
                            name="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            type="name"
                            placeholder="Username"
                            className="w-full p-4 mb-4 border border-gray-300 rounded-lg dark:border-neutral-800"

                        // value={email}
                        // onChange={(e) => setEmail(e.target.value)}
                        // type="email"
                        // placeholder="Email"
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