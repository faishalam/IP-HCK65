import Axios from "axios"
import { useDispatch, useSelector } from "react-redux"
import { fetchArticles } from "../features/articles/asycnAction";
import { useEffect, useState } from "react";

function CardHome() {
    const dispatch = useDispatch()
    const articles = useSelector((state) => state.articles.articles)

    useEffect(() => {
        dispatch(fetchArticles())
    }, [])

    return (
        <>
            <div className="mb-5 ml-10 flex flex-col items-start w-full md:ml-[320px] md:w-1/2 mt-20">
                <h2 className="mb-2 text-3xl font-bold">Latest articles</h2>
                <span className="text-neutral-500 mt-2">Don't miss daily news!</span>
                <hr className="w-1/4 my-4 border-t-2 border-neutral-500 md:w-1/2 md:ml-0" />
            </div>
            <div className="container mx-auto">
                <section className="mb-16 text-center md:text-left">
                    {/* <div className="flex items-center justify-center h-64">
                        <span className="loading loading-bars loading-lg"></span>
                    </div> */}
                    <div className="gap-6 flex flex-wrap justify-center items-start">
                        {articles.map((item, index) => (
                            <div key={index + 1} className="mb-6 border-b border-gray-300 mx-2 w-full md:w-[500px] h-[400px] overflow-hidden">
                                <div className="relative mb-6 overflow-hidden rounded-lg bg-cover bg-no-repeat shadow-lg dark:shadow-black/20" style={{ height: '200px' }}>
                                    <img
                                        src={item.urlToImage}
                                        className="w-full h-full object-cover object-bottom"
                                        alt={item.name}
                                    />
                                    <a href={item.url} className="absolute top-0 right-0 bottom-0 left-0 h-full w-full overflow-hidden bg-fixed opacity-0 transition duration-300 ease-in-out hover:opacity-100 bg-[hsla(0,0%,98.4%,.15)]"></a>
                                </div>
                                <div className="flex flex-col justify-between h-full">
                                    <div className="mb-7 text-left">
                                        <h5 className="text-lg font-bold">{item.name}</h5>
                                        <div className="flex items-center text-sm font-medium text-danger dark:text-danger-500 md:justify-start">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="mr-2 h-5 w-5">

                                            </svg>
                                            {item.category}
                                            <span className="ml-2">{item.title}</span>
                                        </div>
                                        <p className="text-neutral-500 dark:text-neutral-300 ml-9">
                                            <small>Published <u>{item.publishedAt}</u> by <a href="#">{item.author}</a></small>
                                        </p>
                                    </div>
                                    <p className="flex-1 text-neutral-500 dark:text-neutral-300 overflow-hidden">
                                        {item.description}
                                    </p>
                                    <div className="flex items-center">
                                        <hr className="flex-1 border-t border-gray-300 my-3" />
                                        <button className="mt-3">Read More</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>




        </>

    )
}

export default CardHome