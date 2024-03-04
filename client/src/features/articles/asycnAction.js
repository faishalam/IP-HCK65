import Axios from "axios";
import { setArticles, setMyarticles, setMyarticlesById } from "./articlesSlice";
import { toast } from "react-toastify";
import { heroService } from "../../services/hero";


export const fetchArticles = (params = {}) => {
    return async(dispatch) => {
        try {            
            const response = await heroService.get("/", {
                params: {
                    q: params.q || ''
                },
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('access_token'),
                },
            })

            if (response.data !== null) {
                dispatch(setArticles(response.data.articles))
                dispatch(setCurrentPage(currentPage))
                dispatch(setHasMore(response.data.hasMore))
            }
        } catch (error) {
            console.log(error)
        }
    }
}

export const fetchMyArticles = () => {
    return async(dispatch) => {
        try {        
                
            const response = await heroService.get("/myarticles", {
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
    return async (dispatch) => {
        try {
            const {data} = await heroService.delete(`/articles/${id}`, {
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
    return async (dispatch) => {
        try {
            const response = await heroService.get(`/myarticles/${id}`, {
                headers : {
                    Authorization : `Bearer ${localStorage.getItem("access_token")}`
                }
            })

            if (response.data !== null) {
                dispatch(setMyarticlesById(response.data))
            }
        } catch (error) {
            console.log(error)
        }
    }
}