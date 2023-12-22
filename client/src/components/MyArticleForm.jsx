import { useEffect } from "react";
import ModalAdd from "./ModalAdd";
import ModalEdit from "./ModalEdit";
import { Link } from "react-router-dom";
import { IoMdAddCircleOutline } from "react-icons/io";
import { MdDeleteForever } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { fetchArticleById, fetchMyArticles, handleOnDelete } from "../features/articles/asycnAction";


function MyArticleForm() {
    const dispatch = useDispatch()
    const articles = useSelector((state) => state.myarticles.myarticles)

    useEffect(() => {
        dispatch(fetchMyArticles())
    }, [])

    return (
        <>
            <div className="p-4 mx-20">
                <div className="flex flex-wrap">
                    <IoMdAddCircleOutline
                        size={30}
                        className="hover:text-green-700 fill-current text-green-600"
                        onClick={() => document.getElementById('my_modal_1').showModal()}
                    />
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

                    <tbody>
                        {articles.map((item) => (
                            <tr key={item.id} className="bg-white border-b">
                                <td className="px-6 py-4">
                                    <div className="flex items-center justify-center">
                                        <img className="w-[200px] rounded-lg" src={item.urlToImage} alt="" />
                                    </div>
                                </td>
                                <td className="px-6 py-4">{item.author}</td>
                                <td className="px-6 py-4">{item.title}</td>
                                <td className="px-6 py-4">{item.description}</td>
                                <td className="px-6 py-4">
                                    <a href={item.url} className="text-blue-500 underline" target="_blank" rel="noopener noreferrer">
                                        Read now!
                                    </a>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center justify-center gap-3">
                                        <MdDeleteForever size={25} className="fill-current text-red-500 hover:text-red-700" onClick={() => dispatch(handleOnDelete(item.id))} />
                                        <Link to={`/myarticles/${item.id}`} onClick={() => document.getElementById('modal_edit').showModal()}>
                                            <FaEdit size={25} />
                                        </Link>
                                        <ModalEdit onClick={() => dispatch(fetchArticleById(item.id))}/>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}


export default MyArticleForm