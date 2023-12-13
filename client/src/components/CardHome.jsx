import useFetch from "../hooks/useFetch";

function CardHome() {
    const { data: news, loading } = useFetch({ url: "http://localhost:3000" })

    return (
        <>
            {loading && <p>Loading...</p>}
            <div className="gap-96">
                {news.map((item, index) => (
                    <div key={index + 1} className="card card-side bg-base-100 shadow-xl mb-5 dark:bg-white-800" style={{ height: 250, width: 1000, borderRadius: 10 }}>
                        <figure className="w-[450px] overflow-hidden">
                            <img src={item.urlToImage} className="transition-transform transform scale-100 hover:scale-110 duration-700" />
                        </figure>
                        <div className="card-body p-4">
                            <h2 className="card-title text-xl font-semibold mb-2">{item.name}</h2>
                            <p className="text-gray-700">{item.author}</p>
                            <p className="text-gray-700">{item.content}</p>
                            <p className="text-gray-700">{item.description}</p>
                            <p className="text-gray-700">Rp. {item.publishedAt}</p>
                            <div className="flex flex-wrap">
                                {/* <p className="text-gray-700">{item.Type.name}</p> */}
                                {/* <div className="card-actions flex justify-end">
                                   <Link to={`/detailsLodging/${item.id}`}> <button className="btn bg-[#021431] text-white w-50 btn-primary">See Detail</button></Link>
                                </div> */}
                            </div>
                        </div>
                    </div>
                ))
                }
            </div>
        </>
    )
}

export default CardHome