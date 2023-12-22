import { useEffect, useState } from "react"
import Axios from "axios"
import { useNavigate } from "react-router-dom"
import { MdDeleteForever } from "react-icons/md";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { fetchMyArticles } from "../features/articles/asycnAction";


function ModalAdd() {
    const dispatch = useDispatch()
    const myarticles = useSelector((state) => state.myarticles.myarticles)


    const navigate = useNavigate()
    const [articles, setArticles] = useState({ 
        title : '',
        description : '',
        url : '',
        urlToImage : '',
        content : ''
    })

    const handleOnAdd = async() => {
        event.preventDefault()
        try {
            const {data} = await Axios.post("http://localhost:3000/articles", articles, {
                headers : {
                    Authorization : `Bearer ${localStorage.getItem("access_token")}`
                }
            } )

            setArticles(data)

            document.getElementById('my_modal_1').close();

            dispatch(fetchMyArticles())

            navigate('/myarticles')

            toast.success('Add Articles Success!', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
        } catch (error) {
            console.log(error)
        }
    }

    const handleOnChange = () => {
        setArticles({
            ...articles,
            [event.target.name] : event.target.value
        })
    }

    console.log(articles)
    

    return (
        <>
            <dialog id="my_modal_1" className="modal">
                <div className="modal-box">
                    <div className="flex flex-wrap justify-center items-center my-10 gap-6 p-4">
                        <form className="bg-white" onSubmit={handleOnAdd}>
                            <h1 className="text-gray-800 font-bold text-xl mb-4">Add News!</h1>
                            <div className="flex items-center border-2 py-2 px-3 rounded-xl mb-4 w-96">
                            <label className="mr-2 text-gray-800 font-semibold">Title:</label>
                                <input
                                    className="pl-2 outline-none border-none"
                                    type="text"
                                    name="title"
                                    id="title"
                                    placeholder="title"
                                    defaultValue={articles.title}
                                    onChange={handleOnChange}
                                />
                            </div>
                            
                            <div className="flex items-center border-2 py-2 px-3 rounded-xl mb-4 w-96">
                            <label className="mr-2 text-gray-800 font-semibold">Description:</label>
                                <input
                                    className="pl-2 outline-none border-none"
                                    type="text"
                                    name="description"
                                    id="description"
                                    placeholder="Description"
                                    defaultValue={articles.description}
                                    onChange={handleOnChange}
                                />
                            </div>

                            <div className="flex items-center border-2 py-2 px-3 rounded-xl mb-4 w-96">
                            <label className="mr-2 text-gray-800 font-semibold">News Url:</label>
                                <input
                                    className="pl-2 outline-none border-none"
                                    type="text"
                                    name="url"
                                    id="url"
                                    placeholder="url"
                                    defaultValue={articles.url}
                                    onChange={handleOnChange}
                                />
                            </div>

                            <div className="flex items-center border-2 py-2 px-3 rounded-xl mb-4 w-96">
                            <label className="mr-2 text-gray-800 font-semibold">Image</label>
                            <div className="flex">
                                    <td className="px-0 py-2 flex flex-row justify-center items-center ml-8"> <img className="w-[200px] rounded-lg" src={articles.urlToImage} alt="" /> </td>
                                </div >
                                <input
                                    className="pl-2 outline-none border-none"
                                    type="text"
                                    name="urlToImage"
                                    id="urlToImage"
                                    placeholder="image"
                                    defaultValue={articles.urlToImage}
                                    onChange={handleOnChange}
                                />
                                
                            </div>

                            <div className="flex items-center border-2 py-2 px-3 rounded-xl mb-4 w-96">
                            <label className="mr-2 text-gray-800 font-semibold">content:</label>
                                <input
                                    className="pl-2 outline-none border-none"
                                    type="text"
                                    name="content"
                                    id="content"
                                    placeholder="content"
                                    defaultValue={articles.content}
                                    onChange={handleOnChange}
                                />
                            </div>
                            <button
                                type="submit"
                                className="block w-full bg-indigo-600 mt-4 py-2 rounded-xl text-white font-semibold mb-2"
                            >
                                Submit
                            </button>
                        </form>
                    </div>

                </div>
            </dialog>

            
        </>
    )
}

export default ModalAdd