import { useDispatch, useSelector } from "react-redux"
import { fetchArticles } from "../features/articles/asycnAction";
import { useEffect, useState } from "react";
import InfiniteScroll from 'react-infinite-scroll-component';


function CardHome() {
    const [loading, setLoading] = useState(true)
    const dispatch = useDispatch()
    const articles = useSelector((state) => state.articles.articles);
    const [visibleArticles, setVisibleArticles] = useState([]);
    const perPage = 10;

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                await dispatch(fetchArticles());
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [dispatch]);

    useEffect(() => {
        if (articles.length > 0) {
            setVisibleArticles(articles.slice(0, perPage));
        }
    }, [articles]);


    const fetchMoreData = () => {
        setTimeout(() => {
            const startIndex = visibleArticles.length;
            const endIndex = startIndex + perPage;

            setVisibleArticles([...visibleArticles, ...articles.slice(startIndex, endIndex)]);
        }, 1000);
    };


    return (
        <>
        
            <InfiniteScroll
                dataLength={visibleArticles.length}
                next={fetchMoreData}
                hasMore={visibleArticles.length < articles.length}
                loader={<h4 style={{ textAlign: 'center' }}>Loading...</h4>}
            >
                <div className="flex flex-wrap px-[320px] mt-10 p-2">
                    <div className="w-1/2">
                        <h2 className="mb-2 text-3xl font-bold">Latest articles</h2>
                        <span className="text-neutral-500 mt-2">Don't miss daily news!</span>
                        <hr className="w-1/4 my-4 border-t-2 border-neutral-500 md:w-1/2 md:ml-0" />
                    </div>

                    <div className="w-1/2 mt-2">
                        <form>
                            <label
                                htmlFor="default-search"
                                className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
                            >
                                Search
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                    <svg
                                        className="w-4 h-4 text-gray-500 dark:text-gray-400"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 20 20"
                                    >
                                        <path
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                                        />
                                    </svg>
                                </div>
                                <input
                                    type="search"
                                    id="default-search"
                                    className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-[50px] bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Search news.."
                                    required=""
                                />
                                <button
                                    type="submit"
                                    className="text-black absolute end-2.5 bottom-2.5 bg-black bg-opacity-10 hover:bg-opacity-20 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-[50px] text-sm px-4 py-2"
                                >
                                    Search
                                </button>
                            </div>
                        </form>

                    </div>
                </div>


                <div className="container mx-auto">
                    <section className="mb-16 text-center md:text-left">
                        <div className="gap-6 flex flex-wrap justify-center items-start">
                            {loading && <span className="loading loading-spinner loading-lgitems-center justify-center mt-10"></span>}
                            {visibleArticles.map((item, index) => (
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
            </InfiniteScroll>
        </>

    )
}

export default CardHome