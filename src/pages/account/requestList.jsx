import { Layout } from "@/components/account";
import { useEffect, useState } from "react";
import { Nav } from "@/components/Nav.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight, faEye, faTrash } from "@fortawesome/free-solid-svg-icons";
import Link from 'next/link';

export default function RequestList() {
    const [requestList, setRequestList] = useState([]);
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
        fetch(`http://localhost:8081/api/leave-applications/get-by-handle-by/${userId}`)
            .then((response) => {
                console.log(response);
                return response.json()
            })
            .then((data) => {
                console.log(data + "data");
                setRequestList(data);
                console.log(" requestList after set" + requestList);
            })
            .catch((error) => console.error("Error fetching data:", error));
    }, []);
    const formatDate = (date) => {
        const d = new Date(date);
        return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
    }

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = requestList.slice(indexOfFirstItem, indexOfLastItem);
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(requestList.length / itemsPerPage); i++) {
        pageNumbers.push(i);
    }
    // man hinh chi tiet don xin nghi
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const openPopup = (idLeave) => {
        console.log("idLeave" + idLeave);
        setIsPopupOpen(true);
        getDetailByItineraryId(idLeave);
    }
    const closePopup = () => setIsPopupOpen(false);
    const [fullName, setFullName] = useState('');
    const [position, setPosition] = useState('');
    const [dateStart, setDateStart] = useState('');
    const [dateEnd, setDateEnd] = useState('');
    const [reason, setReason] = useState('');
    const [reasonBoss, setReasonBoss] = useState('');
    const [status, setStatus] = useState();
    let [itinerarieData,setItinerarieData ]=useState({}); 
    const [statusChanged, setStatusChanged] = useState(false);

    //  hien thi danh sach
    useEffect(() => {
        getDetailByItineraryId(userId); // id form xin nghi

    }, [userId]);
    const getDetailByItineraryId = async (idLeave) => {
        try {
            const response = await fetch(`http://localhost:8081/api/leave-applications/${idLeave}`);
            let employeeData = {};
            if (response.ok) {
                itinerarieData = await response.json();
                employeeData = itinerarieData.employee;
                console.log("hfhhf"+itinerarieData);
                setFullName(employeeData.fullName); // Assign the value to name state variables
                setPosition(employeeData.position); // Assign the value to content state variable
                setDateStart(itinerarieData.from); // Assign the value to dateStart state variable
                setDateEnd(itinerarieData.to); // Assign the value to dateEnd state variable
                setReason(itinerarieData.reason);
                setReasonBoss(itinerarieData.reason_reject);
                setStatus(itenerarieData.status);
            } else {
                console.log('Failed to fetch itinerary data');
            }
        } catch (error) {
            console.log('Error:', error);
        }
    };
    useEffect(()=>{
        if(statusChanged){
            window.location.reload()
        }

    }),[statusChanged]

    
    const handleReject = async (idLeave, reasonBoss) => {
       
    console.log(idLeave);
        try {
            const response = await fetch(`http://localhost:8081/api/leave-applications/approve/${idLeave}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    reasonReject: reasonBoss,
                    status: 0,
                }),
            });
    
            if (response.ok) {
                setStatusChanged(true);
                const data = await response.json();
                console.log(data);
    
                closePopup();
                alert("Đơn đã được từ chối.");
                if (data.status === 0) {
                    toast.success(data.message);
                } else {
                    toast.error(data.message);
                }
            }
        } catch (error) {
            console.log('Error:', error);
        }
    };
    
    const handleApprove = async (idleave, reasonBoss) => {
        try {
            const response = await fetch(`http://localhost:8081/api/leave-applications/approve/${idleave}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    status: 1,
                    reasonReject: reasonBoss
                })
            });
    
            if (response.ok) {
                setStatusChanged(true);
                const data = await response.json();
                console.log(data);
                alert("Đơn đã được duyệt thành công.");
                closePopup();
            } else {
                console.log('Approval failed');
                alert("Đã xảy ra lỗi khi duyệt đơn. Vui lòng thử lại sau.");
            }
        } catch (error) {
            console.log('Error:', error);
            alert("Đã xảy ra lỗi khi duyệt đơn. Vui lòng thử lại sau.");
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
                                    <td className="border px-4 py-2"> {leave.from}</td>
                                    <td className="border px-4 py-2">{leave.to}</td>
                                    <td className="border px-4 py-2 ">
                                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${leave.status === 1 ? 'bg-green-100 text-green-800' : leave.status === 2 ? 'bg-gray-400 text-black-800' : 'bg-red-300 text-red-800'}`}>
                                                {leave.status === 1 ? 'Approved' : leave.status === 2 ? 'Pending' : 'Rejected'}
                                            </span>
                                    </td>
                                    <td className="border px-4 py-2">
                                        <div className="flex items-center justify-between">
                                            <button  onClick={() => {
                                                openPopup(leave.id);
                                            }}
                                                     className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                                     data-toggle="modal" data-target="#exampleModal">
                                                <FontAwesomeIcon icon={faEye} />
                                            </button>
                                            {/*  man hinh chi tiet don xin nghi*/}
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
                                                        <form >
                                                            <div className="form-group flex justify-between m-4">
                                                                <label htmlFor="fullName" className="my-auto">
                                                                    Họ tên:
                                                                </label>
                                                                <input
                                                                    type="text"
                                                                    id="fullName"
                                                                    name="fullName"
                                                                    value={fullName}
                                                                    className="border-1 outline-none bg-gray-300 pl-2 h-10 rounded-lg w-64 pr-2"
                                                                    readOnly
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
                                                                    value={position}
                                                                    className="border-1 outline-none bg-gray-300 pl-2 h-10 rounded-lg w-64 pr-2"
                                                                    readOnly
                                                                />
                                                            </div>
                                                            <div className="form-group flex justify-between m-4">
                                                                <label htmlFor="leaveDates" className="my-auto">
                                                                    Ngày bắt đầu: </label>

                                                                <input
                                                                    type="date"

                                                                    style={{ outline: "none" }}
                                                                    value={dateStart}
                                                                    className="border-1 outline-none bg-gray-300 pl-2 h-10 rounded-lg w-64 pr-2"
                                                                    readOnly

                                                                />

                                                            </div>
                                                            <div className="form-group flex justify-between m-4">
                                                                <label htmlFor="leaveDates" className="my-auto">Ngày kết thúc: </label>

                                                                <input
                                                                    type="date"
                                                                    value={dateEnd}
                                                                    className="border-1 outline-none bg-gray-300 pl-2 h-10 rounded-lg w-64 pr-2"
                                                                    readOnly
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
                                                                    value={reason} // Giá trị cụ thể
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
                                                                    value={reasonBoss}
                                                                    // onChange={handleBossAction}
                                                                ></textarea>
                                                            </div>
                                                            <div className="form-buttons flex justify-center gap-4">


                                                                    <button type="button" onClick={() => handleReject(leave.id, reasonBoss)} className="btn bg-red-500 px-4 py-2 rounded-lg text-white">
                                                                        Từ chối
                                                                    </button>
                                                                    <button type="button" onClick={() => handleApprove(leave.id, reasonBoss)} className="btn bg-blue-500 px-4 py-2 rounded-lg text-white">
                                                                        Chấp nhận
                                                                    </button>
                                                                </div>
                                                        </form>
                                                    </div>
                                                </div>
                                            )}
                                            {/*  */}
                                            <button
                                                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                                                <FontAwesomeIcon icon={faTrash} />
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
                            <FontAwesomeIcon icon={faArrowLeft} />
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
                            <FontAwesomeIcon icon={faArrowRight} />
                        </button>
                    </div>
                </div>
            </div>

        </Layout>
    )
        ;
}