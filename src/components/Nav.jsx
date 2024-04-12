import {useState} from "react";
export {Nav};
function Nav(){
    const [currentPage, setcurrentPage] = useState('leaveList');
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
                    <a
                        href="/account/leaveList"
                        className={`block mt-4 lg:inline-block lg:mt-0 ${currentPage === 'leaveList' ? 'text-white' : 'text-teal-200'} hover:text-white font-semibold mr-4`}
                        onClick={() => setcurrentPage("leaveList")}
                    >
                        Leave List
                    </a>
                    <a
                        href="/account/requestList"
                        className={`block mt-4 lg:inline-block lg:mt-0 ${currentPage === 'requestList' ? 'text-white' : 'text-teal-200'} hover:text-white font-semibold mr-4`}
                        onClick={() => setcurrentPage("requestList")}
                    >
                        Leave Request
                    </a>
                </div>
                <div>
                    <a
                        href="#"
                        className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0"
                    >
                        Logout
                    </a>
                </div>
            </div>
        </nav>
    )
}