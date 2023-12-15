import { useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
import ModalAdd from "./ModalAdd";
import Axios from "axios";
import ModalEdit from "./ModalEdit";
import { Link, useParams } from "react-router-dom";
import { IoMdAddCircleOutline } from "react-icons/io";
import { MdDeleteForever } from "react-icons/md";
import { FaEdit } from "react-icons/fa";



function MyArticleForm() {
    const [articles, setArticles] = useState([])
    // const {id} = useParams()
    // console.log(id)

    const fetchArticles = async () => {
        try {
            const response = await Axios.get("http://localhost:3000/myarticles", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("access_token")}`
                }
            })

            setArticles(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchArticles()

    }, [])


    const handleOnDelete = async (id) => {
        await Axios.delete(`http://localhost:3000/articles/${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("access_token")}`
            }
        })
        fetchArticles()
    }

    return (
        <>
            <div className="p-4 mx-20">
                <div className="flex flex-wrap ">
                    <IoMdAddCircleOutline size={30} className="hover:text-green-700 fill-current text-green-600" onClick={() => document.getElementById('my_modal_1').showModal()} />
                    <ModalAdd />
                </div>
                <table className="w-full text-sm text-center rtl:text-right black-black-500 dark:text-black-400 mt-2">
                    <thead className="text-xs text-black-700 uppercase bg-gray-50 dark:bg-black-800">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Image
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Author
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Title
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Description
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Source
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Action
                            </th>


                        </tr>
                    </thead>




                    {articles.map((item) => {
                        // console.log(articles, 'ini')
                        return (

                            <tbody key={item.id}>
                                <tr className="bg-white border-b">
                                    <div className="flex">
                                        <td className="px-0 py-2 flex flex-row justify-center items-center ml-8"> <img className="w-[200px] rounded-lg" src={item.urlToImage} alt="" /> </td>
                                    </div >
                                    <td className="px-6 py-4" >{item.author}</td>
                                    <td className="px-6 py-4">{item.title}</td>
                                    <td className="px-6 py-4">{item.description}</td>
                                    <td className="px-6 py-4">
                                        <a href={item.url} className="text-blue-500 underline" target="_blank" rel="noopener noreferrer">
                                            Read now!
                                        </a>
                                    </td>
                                    <div className="items-center gap-3 flex flex-wrap">
                                        <div className="justify-center items-center items-center gap-3">
                                            <MdDeleteForever size={25} className="fill-current text-red-500 hover:text-red-700" onClick={() => handleOnDelete(item.id)} />
                                            <Link to={`/myarticles/`} onClick={() => document.getElementById('modal_edit').showModal()}><FaEdit size={25} /></Link>
                                            <ModalEdit />
                                        </div>
                                    </div>
                                </tr>
                            </tbody>
                        )
                    })}

                </table>
            </div>
        </>
    )
}


export default MyArticleForm