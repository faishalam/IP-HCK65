import Axios from "axios";
import { setArticles, setMyarticles, setMyarticlesById } from "./articlesSlice";
import { toast } from "react-toastify";

export const fetchArticles = () => {
    return async(dispatch) => {
        try {            
            const response = await Axios.get("http://34.87.125.58", {
                headers : {
                    Authorization : `Bearer ${localStorage.getItem("access_token")}`
                }
            })
            
            if (response.data !== null) {
                dispatch(setArticles(response.data.articles))
            }
        } catch (error) {
            console.log(error)
        }
    }
}

export const fetchMyArticles = () => {
    return async(dispatch) => {
        try {        
                
            const response = await Axios.get("http://34.87.125.58/myarticles", {
                headers : {
                    Authorization : `Bearer ${localStorage.getItem("access_token")}`
                }
            })
            
            if (response.data !== null) {
                dispatch(setMyarticles(response.data))
            }
        } catch (error) {
            console.log(error)
        }
    }
}

export const handleOnDelete = (id) => {
    console.log(id, 'haha')
    return async (dispatch) => {
        try {
            const {data} = await Axios.delete(`http://34.87.125.58/articles/${id}`, {
                headers : {
                    Authorization : `Bearer ${localStorage.getItem("access_token")}`
                }
            })

            toast.success('Delete Success!', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });

            dispatch(fetchMyArticles())
        } catch (error) {
            console.log(error)
        }
    }
}

export const fetchArticleById = (id) => {
    console.log(id, 'euy')
    
    return async (dispatch) => {
        try {
            const response = await Axios.get(`http://34.87.125.58//myarticles/${id}`, {
                headers : {
                    Authorization : `Bearer ${localStorage.getItem("access_token")}`
                }
            })

            console.log(response.data,'haha')

            if (response.data !== null) {
                dispatch(setMyarticlesById(response.data))
            }


        } catch (error) {
            console.log(error)
        }
    }
}