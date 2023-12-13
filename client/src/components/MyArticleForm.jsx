import { useEffect } from "react";
import useFetch from "../hooks/useFetch";
import ModalAdd from "./ModalAdd";

function MyArticleForm() {
    const { data: news, loading } = useFetch({ url: "http://localhost:3000" })

    const handleOnEdit = (lodgingId) => {
        setEditLodgingId(lodgingId);
        document.getElementById('my_modal_edit').showModal();
      };


    const handleOnDelete = async (lodgingId) => {
        console.log(lodgingId)
        await Axios.delete(`https://javashal.tech/lodgings/${lodgingId}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("access_token")}`
            }
        })

        // fetchLodgingsCms()
    }

    return (
        <div className="p-4 sm:ml-64 ">
            <div className="flex flex-wrap ">
                <button size={30} className="hover:text-green-700 fill-current text-green-600" onClick={() => document.getElementById('my_modal_1').showModal()}> add </button>
                <ModalAdd />
            </div>
            <table className="w-full text-sm text-center rtl:text-right black-black-500 dark:text-black-400 mt-2">
                <thead className="text-xs text-black-700 uppercase bg-gray-50 dark:bg-black-800">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Image
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Lodging Name
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Facility
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Room Capacity
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Location
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Price
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Category
                        </th>
                        <th scope="col" className="px-6 py-3">
                            User
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Action
                        </th>
                    </tr>
                </thead>
{/* 
                {lodgings.map((item) => {
                    return ( */}
                        {/* // <tbody key={item.id}>
                        //     <tr className="bg-white border-b">
                        //         <div className="flex">
                        //             <td className="px-0 py-2 flex flex-row justify-center items-center ml-8"> <img className="w-[200px] rounded-lg" src={item.imgUrl} alt="" /> </td>
                        //         </div >
                        //         <td className="px-6 py-4" >{item.name}</td>
                        //         <td className="px-6 py-4">{item.facility}</td>
                        //         <td className="px-6 py-4">{item.roomCapacity}</td>
                        //         <td className="px-6 py-4">{item.location}</td>
                        //         <td className="px-6 py-4">Rp. {item.price}</td>
                        //         <td className="px-6 py-4">{item.Type.name}</td>
                        //         <td className="px-6 py-4">{item.User.username}</td>
                        //         <td className="items-center gap-3">
                        //             <div className="flex flex-wrap justify-around">

                        //                 <Link to={`/lodgings/${item.id}`}><CiEdit size={20} className="mt-0.5" onClick={() => document.getElementById('my_modal_edit').showModal()} /></Link>

                        //                 <Link to={`/lodgings/image/${item.id}`} ><FaVestPatches size={15} className="mt-1 hover:text-green-700 " /></Link>

                        //                 <MdOutlineDeleteForever size={25} className="fill-current text-red-500 hover:text-red-700" onClick={() => handleOnDelete(item.id)} />
                        //             </div>
                        //         </td>
                        //     </tr>
                        // </tbody> */}
                    {/* )
                })} */}


            </table>
        </div>
    )
}

export default MyArticleForm