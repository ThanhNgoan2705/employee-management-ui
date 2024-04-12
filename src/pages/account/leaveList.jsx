import { Layout } from "@/components/account";
import { useEffect, useState } from "react";
import { Nav } from "@/components/Nav.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight, faEye, faTrash } from "@fortawesome/free-solid-svg-icons";
import Link from 'next/link';

export default function LeaveList() {
    const [leaveList, setLeaveList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);
    const [userInfo, setUserInfo] = useState({});
    let userId = 0;
    if (typeof window !== 'undefined') {

        userId = sessionStorage.getItem('userId');
    }
    useEffect(() => {
        fetch(`http://localhost:8081/api/employees/${userId}`).then((response) => response.json()).then((data) => {
            setUserInfo(data);
            console.log(data);
        }).catch((error) => console.error("Error fetching data:", error));
    }, []);

    useEffect(() => {
        fetch(`http://localhost:8081/api/leave-applications/get-by-employee-id/${userId}`)
            .then((response) => {
                console.log(response);
                return response.json()
            })
            .then((data) => {
                console.log(data + "data");
                setLeaveList(data);
                console.log(" leaveList after set" + leaveList);
            })
            .catch((error) => console.error("Error fetching data:", error));
    }, []);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = leaveList.slice(indexOfFirstItem, indexOfLastItem);

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(leaveList.length / itemsPerPage); i++) {
        pageNumbers.push(i);
    }
// man hinh chi tiet don xin nghi
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const openPopup = () => setIsPopupOpen(true);
    const closePopup = () => setIsPopupOpen(false);
    const [formData, setFormData] = useState({
        fullName: "",
        position: "",
        from: "",
    });
    const [requestId, setRequestId] = useState(1);
// Nhấn gửi đơn
    const handleSubmit = (event) => {
        event.preventDefault();
        // Lấy ngày bắt đầu và kết thúc
        const {startDate, endDate} = value;

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
        <Layout>
            <Nav />
            <div className="flex bg-blue-50">
                <h1 className="text-2xl font-semibold text-center">Leave List</h1>
            </div>
            <div className="flex my-10 h-screen bg-blue-50 dark:bg-zinc-800">
                <div className="container mx-auto">
                    <div className="flex max-w-full border-2">
                        <table className="table-auto w-full justify-center items-center text-center">
                            <thead>
                                <tr>
                                    <th className='w-1.5'>id</th>
                                    <th className='w-1.5'>from</th>
                                    <th className='w-1.5'>to</th>
                                    <th className='w-1.5'>status</th>
                                    <th className='w-1/6'>action</th>
                                </tr>
                            </thead>
                            <tbody>
                            {currentItems.map((leave, index) => (
                                <tr key={index}>
                                    <td className="border px-4 py-2">{leave.id}</td>
                                    <td className="border px-4 py-2">{leave.from}</td>
                                    <td className="border px-4 py-2">{leave.to}</td>
                                    <td className="border px-4 py-2 ">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${leave.status === 1? 'bg-green-100 text-green-800' : leave.status === 2? 'bg-gray-400 text-black-800' : 'bg-red-300 text-red-800'}`}>
                                            {leave.status === 1 ? 'Approved' : leave===2? 'Rejected': 'Pending'}
                                    </span>
                                </td>
                                <td className="border px-4 py-2">
                                <div className="flex items-center justify-between">
                                <button
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                <FontAwesomeIcon icon={faEye}/>
                        </button>
                        <button
                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                            <FontAwesomeIcon icon={faTrash}/>
                        </button>
                    </div>
                </td>
            </tr>
            ))}
        </tbody>
</table>
</div>
    <div className="flex items-center justify-center  mt-4">
        <button
            className="px-4 py-2 mx-2"
            onClick={() => setCurrentPage(currentPage > 1 ? currentPage - 1 : currentPage)}
            disabled={currentPage === 1}
        >
            <FontAwesomeIcon icon={faArrowLeft}/>
        </button>
        {pageNumbers.map((number) => (
            <button
                key={number}
                className={`px-4 py-2 mx-2 ${currentPage === number ? 'bg-blue-500 text-white' : ''}`}
                onClick={() => setCurrentPage(number)}
            >
                {number}
            </button>
        ))}
        <button
            className="px-4 py-2 mx-2"
            onClick={() => setCurrentPage(currentPage < pageNumbers.length ? currentPage + 1 : currentPage)}
            disabled={currentPage === pageNumbers.length}
        >
            <FontAwesomeIcon icon={faArrowRight}/>
        </button>
    </div>
</div>
</div>

        </Layout>
    );
}