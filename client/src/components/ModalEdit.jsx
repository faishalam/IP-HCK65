import React, { useEffect, useState } from "react";
import Axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";


function ModalEdit() {
    const navigate = useNavigate();
    const { id } = useParams();

    const [articles, setArticles] = useState({
        title: "",
        description: "",
        url: "",
        urlToImage: "",
        content: "",
    });

    

    const [myArticles, setMyArticles] = useState([]);

    const fetchArticles = async () => {
        try {
            const response = await Axios.get(`http://34.87.125.58/myarticles/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                },
            });

            setMyArticles(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchArticles();
    }, []);

    

    const handleOnAdd = async (event) => {
        event.preventDefault();
        try {
            const { data } = await Axios.put( `http://34.87.125.58/articles/${id}`, articles, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                    },
                }
            );
            setMyArticles(data);

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

            navigate('/myarticles');
        } catch (error) {
            console.log(error);
        }
    };

    const handleOnChange = (event) => {
        setArticles({
            ...articles,
            [event.target.name]: event.target.value,
        });
    }
    
    
    return (
        <>
            <dialog id="modal_edit" className="modal">                
                <div className="modal-box">
                    <div className="flex flex-wrap justify-center items-center my-10 gap-6 p-4">
                        <form className="bg-white" onSubmit={handleOnAdd}>
                            <h1 className="text-gray-800 font-bold text-xl mb-4">Add / Edit Lodging!</h1>
                            <div className="flex items-center border-2 py-2 px-3 rounded-xl mb-4 w-96">
                            <label className="mr-2 text-gray-800 font-semibold">title:</label>
                                <input
                                    className="pl-2 outline-none border-none"
                                    type="text"
                                    name="title"
                                    id="title"
                                    placeholder="title"
                                    defaultValue={myArticles.title}
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
                                    defaultValue={myArticles.description}
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
                                    defaultValue={myArticles.url}
                                    onChange={handleOnChange}
                                />
                            </div>

                            <div className="flex items-center border-2 py-2 px-3 rounded-xl mb-4 w-96">
                            <label className="mr-2 text-gray-800 font-semibold">Image Url</label>
                                <input
                                    className="pl-2 outline-none border-none"
                                    type="text"
                                    name="urlToImage"
                                    id="urlToImage"
                                    placeholder="urlToImage"
                                    defaultValue={myArticles.urlToImage}
                                    onChange={handleOnChange}
                                />
                            </div>

                            <div className="flex items-center border-2 py-2 px-3 rounded-xl mb-4 w-96">
                            <label className="mr-2 text-gray-800 font-semibold">Price:</label>
                                <input
                                    className="pl-2 outline-none border-none"
                                    type="text"
                                    name="content"
                                    id="content"
                                    placeholder="content"
                                    defaultValue={myArticles.content}
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

export default ModalEdit