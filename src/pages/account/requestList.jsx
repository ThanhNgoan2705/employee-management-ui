import {Layout} from "@/components/account";
import {useEffect, useState} from "react";
import {Nav} from "@/components/Nav.jsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft, faArrowRight, faEye, faTrash} from "@fortawesome/free-solid-svg-icons";
import Datepicker from "react-tailwindcss-datepicker";

export default function LeaveList() {
    const [leaveRequestList, setLeaveList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);
    let leaveDaysLeft;
    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => response.json())
            .then(data => {
                setLeaveList(data);
                leaveDaysLeft = data.length;
            });
    }, []);


    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = leaveList.slice(indexOfFirstItem, indexOfLastItem);

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(leaveList.length / itemsPerPage); i++) {
        pageNumbers.push(i);
    }
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const openPopup = () => setIsPopupOpen(true);
    const closePopup = () => setIsPopupOpen(false);
    return (
        <Layout>
            <Nav/>
            <div className="flex bg-blue-50">
                <h1 className="text-2xl font-semibold text-center">Request List</h1>
            </div>
            <div className="flex my-10 h-screen bg-blue-50 dark:bg-zinc-800">
                <div className="container mx-auto">
                    <div className="flex max-w-full border-2">
                        <table className="table-auto w-full justify-center items-center text-center">
                            <thead>
                            <tr>
                                <th className='w-1.5'>employee name</th>
                                <th className='w-1.5'>from</th>
                                <th className='w-1.5'>to</th>
                                <th className='w-1.5'>status</th>
                                <th className='w-1/6'>action</th>
                            </tr>
                            </thead>
                            <tbody>
                            {currentItems.map((leave, index) => (
                                <tr key={index}>
                                    <td className="border px-4 py-2">{leave.name}</td>
                                    <td className="border px-4 py-2">{leave.username}</td>
                                    <td className="border px-4 py-2">{leave.email}</td>
                                    <td className="border px-4 py-2">{leave.phone}</td>
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