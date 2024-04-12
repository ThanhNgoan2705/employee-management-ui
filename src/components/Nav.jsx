import {useEffect, useState} from "react";
import "./assets/formStyle.css";
import Datepicker from "react-tailwindcss-datepicker";

export {Nav};

function Nav() {
    const [currentPage, setcurrentPage] = useState('leaveList');
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    const handleStartDateChange = (newStartDate) => {
        setStartDate(newStartDate);
    };

    const handleEndDateChange = (newEndDate) => {
        setEndDate(newEndDate);
    };

    const openPopup = () => setIsPopupOpen(true);
    const closePopup = () => setIsPopupOpen(false);
    const [formData, setFormData] = useState({
        fullName: "",
        position: "",
        reason: "",
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
                    position: data.company.name,
                    reason: data.company.catchPhrase,
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
        <nav className="flex items-center justify-between flex-wrap bg-teal-500 p-6">
            <div className="flex items-center flex-shrink-0 text-white mr-6">
                <span className="font-semibold text-xl tracking-tight">Employee Leave Management</span>
            </div>
            <div className="block lg:hidden">
                <button
                    id="nav"
                    className="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white"
                >
                    <svg
                        className="fill-current h-3 w-3"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <title>Menu</title>
                        <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M2 5h16v1H2V5zm0 5h16v1H2v-1zm16 4H2v1h16v-1z"
                        />
                    </svg>
                </button>
            </div>
            <div
                id="nav-content"
                className="w-full block flex-grow lg:flex lg:items-center lg:w-auto"
            >
                <div className="text-sm lg:flex-grow">
                    <a
                        href="/"
                        className={`block mt-4 lg:inline-block lg:mt-0 ${currentPage === 'home' ? 'text-white' : 'text-teal-200'} hover:text-white font-semibold  mr-4`}
                        onClick={() => setcurrentPage("home")}
                    >
                        Home
                    </a>
                    {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
                    <a
                        href="/account/leaveList"
                        className={`block mt-4 lg:inline-block lg:mt-0 ${currentPage === 'leaveList' ? 'text-white' : 'text-teal-200'} hover:text-white font-semibold mr-4`}
                        onClick={() => setcurrentPage("leaveList")}
                    >
                        Leave List
                    </a>
                    {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
                    <a
                        href="/account/requestList"
                        className={`block mt-4 lg:inline-block lg:mt-0 ${currentPage === 'requestList' ? 'text-white' : 'text-teal-200'} hover:text-white font-semibold mr-4`}
                        onClick={() => setcurrentPage("requestList")}
                    >
                        Leave Request
                    </a>
                </div>
                <div>
                    <button
                        className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0"
                        onClick={openPopup}
                    >
                        Register Leave
                    </button>
                </div>
                {isPopupOpen && (
                    <div className="popup">
                        <div className="popup-inner p-4 rounded-lg flex bg-blue-50">
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
                                    <label htmlFor="department" className="my-auto">Chức vụ:</label>
                                    <input
                                        type="text"
                                        id="role"
                                        name="role"
                                        value={formData.position}
                                        className="border-1 outline-none bg-gray-300 pl-2 h-10 rounded-lg w-64 pr-2"
                                    />
                                </div>
                                <div className="form-group flex justify-between m-4">
                                    <label htmlFor="startDate" className="my-auto">From:</label>
                                    <div
                                        className="border-x border-y bor rounded-lg border-x-gray-300 border-y-gray-300">
                                        <Datepicker
                                            value={startDate}
                                            onChange={handleStartDateChange}
                                            showShortcuts={true}
                                            dateFormat="dd/MM/yyyy"
                                            classNames="w-full p-2 text-black "
                                            style={{outline: "none"}}
                                        />
                                    </div>
                                </div>
                                <label htmlFor="endDate" className="my-auto">To:</label>
                                <div className="border-x border-y bor rounded-lg border-x-gray-300 border-y-gray-300">
                                    <Datepicker value={endDate} onChange={handleEndDateChange}
                                                showShortcuts={true} dateFormat="dd/MM/yyyy"
                                                classNames="w-full p-2 text-black " style={{outline: "none"}}/>
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
        </nav>
    )
}