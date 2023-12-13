import { useEffect, useState } from "react"
import Axios from "axios"

function ModalAdd() {
    const [articles, setArticles] = useState({
        author : '',
        title : '',
        description : '',
        url : '',
        urlToImage : '',
        content : ''
    })

    const handleOnAdd = async() => {
        event.preventDefault()
        try {
            const {data} = await Axios.post("http://localhost:3000/", )
        } catch (error) {
            
        }
    }
    

    return (
        <>
            <dialog id="my_modal_1" className="modal">
                <div className="modal-box">
                    <div className="flex flex-wrap justify-center items-center my-10 gap-6 p-4">
                        <form className="bg-white" >
                            <h1 className="text-gray-800 font-bold text-xl mb-4">Add / Edit Lodging!</h1>
                            <div className="flex items-center border-2 py-2 px-3 rounded-xl mb-4">
                            <label className="mr-2 text-gray-800 font-semibold">Name:</label>
                                <input
                                    className="pl-2 outline-none border-none"
                                    type="text"
                                    name="name"
                                    id="name"
                                    placeholder="Name"
                                    // value={lodging.name}
                                    // onChange={handleOnChange}
                                />
                            </div>

                            <div className="flex items-center border-2 py-2 px-3 rounded-xl mb-4 w-96">
                            <label className="mr-2 text-gray-800 font-semibold">Facility:</label>
                                <input
                                    className="pl-2 outline-none border-none"
                                    type="text"
                                    name="facility"
                                    id="facility"
                                    placeholder="Facility"
                                    // value={lodging.facility}
                                    // onChange={handleOnChange}
                                />
                            </div>
                            
                            <div className="flex items-center border-2 py-2 px-3 rounded-xl mb-4 w-96">
                            <label className="mr-2 text-gray-800 font-semibold">Room Capacity:</label>
                                <input
                                    className="pl-2 outline-none border-none"
                                    type="number"
                                    name="roomCapacity"
                                    id="roomCapacity"
                                    placeholder="Room Capacity"
                                    // value={lodging.roomCapacity}
                                    // onChange={handleOnChange}
                                />
                            </div>

                            <div className="flex items-center border-2 py-2 px-3 rounded-xl mb-4 w-96">
                            <label className="mr-2 text-gray-800 font-semibold">Image Url:</label>
                                <input
                                    className="pl-2 outline-none border-none"
                                    type="text"
                                    name="imgUrl"
                                    id="imgUrl"
                                    placeholder="ImgUrl"
                                    // value={lodging.imgUrl}
                                    // onChange={handleOnChange}
                                />
                            </div>

                            <div className="flex items-center border-2 py-2 px-3 rounded-xl mb-4 w-96">
                            <label className="mr-2 text-gray-800 font-semibold">Location:</label>
                                <input
                                    className="pl-2 outline-none border-none"
                                    type="text"
                                    name="location"
                                    id="location"
                                    placeholder="Location"
                                    // value={lodging.location}
                                    // onChange={handleOnChange}
                                />
                            </div>

                            <div className="flex items-center border-2 py-2 px-3 rounded-xl mb-4 w-96">
                            <label className="mr-2 text-gray-800 font-semibold">Price:</label>
                                <input
                                    className="pl-2 outline-none border-none"
                                    type="number"
                                    name="price"
                                    id="price"
                                    placeholder="Price"
                                    // value={lodging.price}
                                    // onChange={handleOnChange}
                                />
                            </div>
{/* 
                            <div className="flex items-center border-2 py-2 px-3 rounded-xl mb-4 w-96">
                            <label className="mr-2 text-gray-800 font-semibold">Category:</label>
                                <select
                                    className="pl-2 outline-none border-none"
                                    name="typeId"
                                    id="typeId"
                                    // value={lodging.typeId}
                                    // onChange={handleOnChange}
                                >
                                    <option selected>Select</option>
                                    {typeList.map((item) => (
                                        <option key={item.id} value={item.id}>{item.name}</option>
                                    ))}

                                </select>
                            </div> */}


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