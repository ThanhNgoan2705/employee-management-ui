"use client";
import { Layout } from "@/components/account";
import React, { useState, useEffect } from "react";
import Datepicker from "react-tailwindcss-datepicker";

export default function LeaveRequestForm() {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const openPopup = () => setIsPopupOpen(true);
    const closePopup = () => setIsPopupOpen(false);
    const [formData, setFormData] = useState({
        fullName: "",
        department: "",
        role: "",
    });
    const [requestId, setRequestId] = useState(1);
    useEffect(() => {
        // Mock API giả
        fetch("https://jsonplaceholder.typicode.com/users/1")
            .then((response) => response.json())
            .then((data) => {
                // Set data to form fields
                setFormData({
                    fullName: data.name,
                    department: data.company.name,
                    role: data.company.catchPhrase,
                });
            })
            .catch((error) => console.error("Error fetching data:", error));
    }, []);

    // Nhấn gửi đơn
    const handleSubmit = (event) => {
        event.preventDefault();
        // Lấy ngày bắt đầu và kết thúc
        const { startDate, endDate } = value;

        if (!startDate || !endDate) {
            // Hiển thị cảnh báo nếu ngày không được chọn
            alert("Vui lòng chọn ngày nghỉ trước khi gửi!");
            return;
        } else {
            const start = new Date(startDate);
            const end = new Date(endDate);
            const duration = Math.round((end - start) / (1000 * 60 * 60 * 24)) + 1; // Tính duration tại đây

            const requestData = {
                id: requestId,
                fullName: formData.fullName,
                department: formData.department,
                role: formData.role,
                leaveDuration: duration,
                reason: event.target.reason.value,
                message: message,
            };
            console.log(requestData);
            setRequestId(requestId + 1);

            closePopup();
            alert("Bạn đã gửi đơn đăng ký thành công");
            setValue({
                startDate: null,
                endDate: null,
            });
        }
    };

    const [value, setValue] = useState({
        startDate: null,
        endDate: null,
    });
    const handleValueChange = (newValue) => {
        console.log("newValue:", newValue);
        setValue(newValue);
    };

    // const closePopupWithConfirmation = () => {
    //     const isConfirmed = window.confirm("Bạn có chắc chắn muốn đóng không?");
    //     if (isConfirmed) {
    //         closePopup();
    //     }
    // };

    // Thêm phần message cho boss điền đồng ý hoặc từ chối đơn xin nghỉ
    const [message, setMessage] = useState("");
    const handleBossAction = (event) => {
        setMessage(event.target.value);
    };

    const handleApprove = () => {
        const requestData = {
            id: requestId,
            fullName: formData.fullName,
            department: formData.department,
            role: formData.role,
            // leaveDuration: duration,
            reason: value.reason,
            message: "Đơn đã được duyệt thành công.",
        };
        console.log(requestData);
        setRequestId(requestId + 1);
        closePopup();
        alert("Đơn đã được duyệt thành công.");
        setValue({
            startDate: null,
            endDate: null,
        });
    };

    const handleReject = () => {
        if (!message) {
            alert("Vui lòng điền lý do từ chối trước khi gửi!");
            return;
        } else {
            const requestData = {
                id: requestId,
                fullName: formData.fullName,
                department: formData.department,
                role: formData.role,
                leaveDuration: duration, // Thêm duration vào đây
                reason: value.reason,
                message: message,
            };
            console.log(requestData);
            setRequestId(requestId + 1);
            closePopup();
            alert("Đơn đã được từ chối.");
            setValue({
                startDate: null,
                endDate: null,
            });
        }
    };

    return (
        <>
        <Layout>
            <main className="flex min-h-screen flex-col items-center justify-between p-24"> */
                <div className="relative place-items-center">
                    {/* {!isPopupOpen && ( */}
                    <button onClick={openPopup} className="open-popup-btn" data-toggle="modal" data-target="#exampleModal">
                        Mở Chi tiết đơn nghỉ phép
                    </button>
                    {/* )} */}
                    {isPopupOpen && (
                        <div className="modal-bg fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
                            <div className="modal p-4 bg-white rounded-lg w-[500px]">
                                <div className="flex justify-end">
                                    <button onClick={closePopup} className="text-gray-500 hover:text-gray-700 focus:outline-none">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>
                                <h2 className="text-center text-4xl font-semibold "> Chi tiết đơn nghỉ phép </h2>
                                <form onSubmit={handleSubmit}>
                                    <div className="form-group flex justify-between m-4">
                                        <label htmlFor="fullName" className="my-auto">
                                            Họ tên:
                                        </label>
                                        <input
                                            type="text"
                                            id="fullName"
                                            name="fullName"
                                            value={formData.fullName}
                                            className="border-1 outline-none bg-gray-300 pl-2 h-10 rounded-lg w-64 pr-2"
                                            readOnly // Để trường này chỉ hiển thị dữ liệu, không cho phép sửa
                                        />
                                    </div>
                                    <div className="form-group flex justify-between m-4">
                                        <label htmlFor="department" className="my-auto">
                                            Phòng ban:
                                        </label>
                                        <input
                                            type="text"
                                            id="department"
                                            name="department"
                                            value={formData.department}
                                            className="border-1 outline-none bg-gray-300 pl-2 h-10 rounded-lg w-64 pr-2"
                                            readOnly // Để trường này chỉ hiển thị dữ liệu, không cho phép sửa
                                        />
                                    </div>
                                    <div className="form-group flex justify-between m-4">
                                        <label htmlFor="department" className="my-auto">
                                            Chức vụ:
                                        </label>
                                        <input
                                            type="text"
                                            id="role"
                                            name="role"
                                            value={formData.role}
                                            className="border-1 outline-none bg-gray-300 pl-2 h-10 rounded-lg w-64 pr-2"
                                            readOnly // Để trường này chỉ hiển thị dữ liệu, không cho phép sửa
                                        />
                                    </div>
                                    <div className="form-group flex justify-between m-4">
                                        <label htmlFor="leaveDates" className="my-auto">
                                            Thời gian nghỉ:
                                        </label>
                                        {/* <div className="border-x border-y bor rounded-lg border-x-gray-300 border-y-gray-300">
                                            <Datepicker
                                                value={value}
                                                onChange={handleValueChange}
                                                showShortcuts={true}
                                                dateFormat="dd/MM/yyyy"
                                                style={{ outline: "none", backgroundColor: "#d1d5db" }}
                                            />
                                        </div> */}
                                        <input
                                            type="text"
                                            id="leaveDates"
                                            name="leaveDates"
                                            value="01/04/2024 - 05/04/2024" // Giá trị cụ thể
                                            className="border-1 outline-none bg-gray-300 pl-2 h-10 rounded-lg w-64 pr-2"
                                            readOnly // Để trường này chỉ hiển thị dữ liệu, không cho phép sửa
                                        />
                                    </div>
                                    <div className="form-group flex justify-between m-4">
                                        <label htmlFor="reason" className="my-auto">
                                            Lý do xin nghỉ:
                                        </label>
                                        <textarea
                                            id="reason"
                                            name="reason"
                                            rows="4"
                                            value="Nghỉ phép hưởng lương" // Giá trị cụ thể
                                            className="border-1 outline-none bg-gray-300 pl-2 pt-2 h-16 rounded-lg w-64 pr-2"
                                            maxLength={100}
                                            readOnly // Để trường này chỉ hiển thị dữ liệu, không cho phép sửa
                                        ></textarea>
                                    </div>
                                    <div className="form-group flex justify-between m-4">
                                        <label htmlFor="message" className="my-auto">
                                            Lý do từ chối đơn nghỉ (boss)
                                        </label>
                                        <textarea
                                            id="message"
                                            name="message"
                                            rows="4"
                                            className="border-1 outline-none bg-gray-300 pl-2 pt-2 h-16 rounded-lg w-64 pr-2"
                                            maxLength={100}
                                            value={message}
                                            onChange={handleBossAction}
                                        ></textarea>
                                    </div>
                                    <div className="form-buttons flex justify-center gap-4">
                                        {/* <button
                                            type="button"
                                            onClick={closePopup}
                                            className="btn bg-gray-500 px-4 py-2 rounded-lg text-white"
                                        >
                                            Đóng
                                        </button> */}

                                        <button type="button" onClick={handleReject} className="btn bg-red-500 px-4 py-2 rounded-lg text-white">
                                            Từ chối
                                        </button>
                                        <button type="button" onClick={handleApprove} className="btn bg-blue-500 px-4 py-2 rounded-lg text-white">
                                            Chấp nhận
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}
                </div>
            </main>
            </Layout>
        </>
    );
}
