// Trang gọi cái này phải có : "use client";
import React, {useState, useEffect} from "react";
import Datepicker from "react-tailwindcss-datepicker";
import {Layout} from "@/components/account";
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

        if (!value.startDate || !value.endDate) {
            // Hiển thị cảnh báo nếu ngày không được chọn
            alert("Vui lòng chọn ngày nghỉ trước khi gửi!");
            return;
        } else {
            const start = new Date(value.startDate);
            const end = new Date(value.endDate);
            const duration = Math.round((end - start) / (1000 * 60 * 60 * 24)) + 1;

            const requestData = {
                id: requestId,
                fullName: formData.fullName,
                department: formData.department,
                role: formData.role,
                // leaveDates: value, // thời gian ngày bd đến kt
                leaveDuration: duration,
                reason: event.target.reason.value,
            };
            console.log(requestData);
            setRequestId(requestId + 1);
            // Gửi dữ liệu
            // fetch('URL của API', {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json'
            //     },
            //     body: JSON.stringify(requestData)
            // })
            // .then(response => {
            //     if (response.ok) {
            //         console.log('Dữ liệu đã được gửi thành công!');
            //         // Thực hiện các hành động khác (ví dụ: hiển thị thông báo)
            //     } else {
            //         console.error('Đã xảy ra lỗi khi gửi dữ liệu.');
            //         // Xử lý lỗi nếu cần
            //     }
            // })
            // .catch(error => console.error('Lỗi:', error));
            closePopup();
            alert("Bạn đã gửi đơn đăng ký thành công")
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
    const closePopupWithConfirmation = () => {
        const isConfirmed = window.confirm("Bạn có chắc chắn muốn đóng không?");
        if (isConfirmed) {
            closePopup();
        }
    };
    return (
        <Layout>
            <div className="flex bg-blue-50">
                <div className="relative place-items-center">
                    {!isPopupOpen && (
                        <button onClick={openPopup} className="open-popup-btn">Mở Đơn Xin Nghỉ</button>
                    )}
                    {isPopupOpen && (
                        <div className="popup min-w-full bg-white rounded-lg w-[500px]">
                            <div className="popup-inner p-4 rounded-lg">
                                <h2 className="text-center text-4xl font-semibold "> Đơn xin nghỉ phép </h2>
                                <form onSubmit={handleSubmit}>
                                    <div className="form-group flex justify-between m-4">
                                        <label htmlFor="fullName" className="my-auto">Họ tên:</label>
                                        <input
                                            type="text"
                                            id="fullName"
                                            name="fullName"
                                            value={formData.fullName}
                                            className="border-1 outline-none bg-gray-300 pl-2 h-10 rounded-lg w-64 pr-2"
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
                                        />
                                    </div>
                                    <div className="form-group flex justify-between m-4">
                                        <label htmlFor="department" className="my-auto">Chức vụ:</label>
                                        <input
                                            type="text"
                                            id="role"
                                            name="role"
                                            value={formData.role}
                                            className="border-1 outline-none bg-gray-300 pl-2 h-10 rounded-lg w-64 pr-2"
                                        />
                                    </div>
                                    <div className="form-group flex justify-between m-4">
                                        <label htmlFor="leaveDates" className="my-auto">Chọn ngày nghỉ:</label>
                                        <div
                                            className="border-x border-y bor rounded-lg border-x-gray-300 border-y-gray-300">
                                            <Datepicker
                                                value={value}
                                                onChange={handleValueChange}
                                                showShortcuts={true}
                                                dateFormat="dd/MM/yyyy"
                                                style={{outline: "none", backgroundColor: "#d1d5db"}}
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group flex justify-between m-4">
                                        <label htmlFor="reason" className="my-auto">Lý do xin nghỉ:</label>
                                        <textarea
                                            id="reason"
                                            name="reason"
                                            rows="4"
                                            className="border-1 outline-none bg-gray-300 pl-2 pt-2 h-16 rounded-lg w-64 pr-2"
                                            maxLength={100}
                                        ></textarea>
                                    </div>
                                    <div className="form-buttons flex justify-center gap-4">
                                        <button type="button" onClick={closePopupWithConfirmation}
                                                className="btn bg-red-500 px-4 py-2 rounded-lg text-white"> Hủy
                                        </button>
                                        <button type="submit"
                                                className="btn bg-blue-500 px-4 py-2 rounded-lg text-white"> Gửi
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </Layout>
    );
}
