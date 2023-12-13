import Axios from "axios"
import { useEffect, useState } from "react"

function useFetch({url}) {
    let [data, setData] = useState([])
    let [loading, setLoading] = useState(true)

    const fetchNews = async() => {
        setLoading(true)
        try {
            const response = await Axios.get("http://localhost:3000");
         
            setData(response.data.articles);
        } catch (error) {
            console.log(error.na)
        }
        setLoading(false)
    }

    useEffect(() => {
        fetchNews()
    },[])

    console.log(data)

    return {data, loading}
}

export default useFetch