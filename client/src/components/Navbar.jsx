import { Link, useNavigate } from "react-router-dom"
import Axios from 'axios'
import { useEffect, useMemo, useState } from "react"

function Navbar() {
    const navigate = useNavigate()
    const [user, setUser] = useState({
        id: 0,
        email: '',
        role: ''
    })

    const handleOnLogout = () => {
        localStorage.removeItem("access_token")
        navigate('/login')
    }

    const fetchUser = async () => {
        const { data } = await Axios.get("http://localhost:3000/users/me", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("access_token")}`
            }
        })
        setUser(data)
    }

    useEffect(() => {
        if (localStorage.getItem("access_token")) {
            fetchUser()
        }
    }, [])





    const isLogin = useMemo(() => {
        return !!localStorage.getItem("access_token")
    })

    const handleOnUpgrade = async () => {
        const { data } = await Axios.get("http://localhost:3000/payment/midtrans/initiate", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("access_token")}`
            }
        })
        window.snap.pay(data.token, {
            onSuccess: async function () {
                const requestBody = {
                    orderId: data.orderId
                }
                await Axios.patch(
                    "http://localhost:3000/users/me/upgrade",
                    requestBody,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("access_token")}`
                        }
                    }
                )
            }
        })
    }

    console.log(user, '<<<')

    const isUser = user.role === 'user'
    const isAdmin = user.role === 'admin'


    return (
        <>
            <nav className="sticky top-0 z-10 block w-full max-w-full px-4 py-2 text-black-800 font-bold bg-white border rounded-none shadow-md h-max border-white/80 bg-opacity-80 backdrop-blur-2xl backdrop-saturate-200 lg:px-8 lg:py-4">
                <div className="flex items-center justify-between text-blue-gray-900">
                    <a
                        href="/"
                        className="mr-4 block cursor-pointer py-1.5 font-sans text-base font-medium leading-relaxed text-inherit antialiased"
                    >
                        FinFlare
                    </a>
                    <div className="flex items-center gap-4">
                       
                        <div className="flex items-center gap-x-1">
                            {isUser && (


                                <button
                                    className={`select-none rounded-lg bg-gradient-to-tr from-gray-900 to-gray-800 py-2 px-4 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none lg:inline-block`}
                                    type="button"
                                    onClick={handleOnUpgrade}
                                >
                                    <span>Upgrade</span>
                                </button>
                            )}


                            <button
                                className="hidden select-none rounded-lg bg-gradient-to-tr from-gray-900 to-gray-800 py-2 px-4 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none lg:inline-block"
                                type="button"
                                onClick={handleOnLogout}
                            >
                                <span>Logout</span>
                            </button>



                            <Link to={`/myarticles/${user.id}`}>
                                {isAdmin && (
                                    <button
                                        className="hidden select-none rounded-lg bg-gradient-to-tr from-gray-900 to-gray-800 py-2 px-4 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none lg:inline-block"
                                        type="button"
                                    >
                                        <span>Create</span>
                                    </button>

                                    
                                )}
                            </Link>
                        </div>

                        <button
                            className="relative ml-auto h-6 max-h-[40px] w-6 max-w-[40px] select-none rounded-lg text-center align-middle font-sans text-xs font-medium uppercase text-inherit transition-all hover:bg-transparent focus:bg-transparent active:bg-transparent disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none lg:hidden"
                            type="button"
                        >
                            <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-6 h-6"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                </svg>
                            </span>
                        </button>
                    </div>
                </div>
            </nav>

        </>

    )
}

export default Navbar