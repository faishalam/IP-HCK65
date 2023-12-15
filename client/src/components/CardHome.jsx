import { useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
import Axios from "axios"

function CardHome() {
    // const [news, setNews] = useState([])
    // let [loading, setLoading] = useState(true)
    // const [articles, setArticles] = useState([])

    // const fetchArticles = async() => {
    //     setLoading(true)
    //     try {
    //         const response = await Axios.get("http://localhost:3000", {
    //             headers : {
    //                 Authorization : `Bearer ${localStorage.getItem("access_token")}`
    //             }
    //         })

    //         setNews(response.data.articles)

    //         console.log(response, '<<<<<')
    //     } catch (error) {
    //         console.log(error)
    //     }
    //     setLoading(false)
    // }

    // useEffect(() => {
    //     fetchArticles()
    // }, [])

    // const fetchArticlesDatabase = async () => {
    //     try {
    //         const response = await Axios.get("http://localhost:3000/myarticles", {
    //             headers: {
    //                 Authorization: `Bearer ${localStorage.getItem("access_token")}`
    //             }
    //         })

    //         setArticles(response.data)
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }

    // useEffect(() => {
    //     fetchArticlesDatabase()

    // }, [])
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [articles, setArticles] = useState([]);
    const [loadingArticles, setLoadingArticles] = useState(true);
  
    const fetchArticles = async () => {
        setLoading(true);
        try {
            const response = await Axios.get("http://localhost:3000", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                },
            });
    
            const responseDatabase = await Axios.get("http://localhost:3000/myarticles", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                },
            });
    
            // Menggabungkan data dari kedua sumber
            const combinedData = [...response.data.articles, ...responseDatabase.data];
    
            setNews(combinedData);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };
    
    useEffect(() => {
        fetchArticles();
    }, []);
    console.log(news, 'dapet')
  

    return (
        <>
            <div className="mb-[50px] ml-[100px] flex flex-col items-start">
                <h2 className="mb-2 my-32 text-start text-3xl font-bold ml-[130px]">Latest articles</h2>
                <span className="ml-[130px] text-neutral-500 mt-4">Don't miss daily news!</span>
                <hr className="w-1/2 mx-auto" /> {/* Menggunakan mx-auto untuk mengatur garis di tengah */}
            </div>
            <div className="container mx-auto">

                {/* Section: Design Block */}
                <section className="mb-32 text-center md:text-left">

                    {loading ? (
                        <div className="flex items-center justify-center h-64"> {/* Menyusun loading di tengah */}
                            <span className="loading loading-bars loading-lg"></span>
                        </div>
                    ) : ( 
                        <div className="gap-6 flex flex-wrap justify-center items-center">
                            {news.map((item, index) => (
                                <div key={index + 1} className="mb-1 flex flex-wrap border-b border-gray-300 mx-[120px]">
                                    <div className="mb-6 ml-[20px] w-full shrink-0 grow-0 basis-auto px-3 md:mb-0 md:w-3/12 relative">
                                        <div className="relative mb-6 overflow-hidden rounded-lg bg-cover bg-no-repeat shadow-lg dark:shadow-black/20"
                                            data-te-ripple-init data-te-ripple-color="light">
                                            <img
                                                src={item.urlToImage}
                                                className="w-full object-cover object-bottom"
                                                alt={item.name}
                                            />
                                            <a href="">
                                                <div
                                                    className="absolute top-0 right-0 bottom-0 left-0 h-full w-full overflow-hidden bg-fixed opacity-0 transition duration-300 ease-in-out hover:opacity-100 bg-[hsla(0,0%,98.4%,.15)]">
                                                </div>
                                            </a>
                                        </div>
                                    </div>

                                    <div className="mb-6 mr-auto w-full shrink-0 grow-0 basis-auto px-3 md:mb-0 md:w-9/12 xl:w-7/12">
                                        <h5 className="mb-3 text-lg font-bold">{item.name}</h5>
                                        <div className="mb-3 flex items-center justify-center text-sm font-medium text-danger dark:text-danger-500 md:justify-start">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="mr-2 h-5 w-5">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M12.75 3.03v.568c0 .334.148.65.405.864l1.068.89c.442.369.535 1.01.216 1.49l-.51.766a2.25 2.25 0 01-1.161.886l-.143.048a1.107 1.107 0 00-.57 1.664c.369.555.169 1.307-.427 1.605L9 13.125l.423 1.059a.956.956 0 01-1.652.928l-.679-.906a1.125 1.125 0 00-1.906.172L4.5 15.75l-.612.153M12.75 3.031a9 9 0 00-8.862 12.872M12.75 3.031a9 9 0 016.69 14.036m0 0l-.177-.529A2.25 2.25 0 0017.128 15H16.5l-.324-.324a1.453 1.453 0 00-2.328.377l-.036.073a1.586 1.586 0 01-.982.816l-.99.282c-.55.157-.894.702-.8 1.267l.073.438c.08.474.49.821.97.821.846 0 1.598.542 1.865 1.345l.215.643m5.276-3.67a9.012 9.012 0 01-5.276 3.67m0 0a9 9 0 01-10.275-4.835M15.75 9c0 .896-.393 1.7-1.016 2.25" />
                                            </svg>
                                            {item.category}
                                            <span className="ml-2">{item.title}</span>
                                        </div>
                                        <p className="mb-6 text-neutral-500 dark:text-neutral-300">
                                            <small>Published <u>{item.publishedAt}</u> by <a href="#!">{item.author}</a></small>
                                        </p>

                                        <p className="text-neutral-500 dark:text-neutral-300">
                                            {item.description}
                                        </p>
                                    </div>
                                    <button onClick={() => window.location.href = item.url}>Read More</button>
                                </div>
                            ))}
                        </div>
                    )}
                </section>
            </div>

        </>
    )
}

export default CardHome