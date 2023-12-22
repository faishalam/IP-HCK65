import { Link } from "react-router-dom"

const categories = [
    { 
      name: 'Finance', 
      imageUrl: 'https://images.unsplash.com/photo-1579621970795-87facc2f976d?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      description: 'Stay updated on the latest financial news and trends.'
    },
    { 
      name: 'Technology', 
      imageUrl: 'https://images.unsplash.com/photo-1496171367470-9ed9a91ea931?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      description: 'Explore the world of cutting-edge technology and innovations.'
    },
    { 
      name: 'Entertainment', 
      imageUrl: 'https://images.unsplash.com/photo-1582711004928-04981eb0a40c?q=80&w=3371&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      description: 'Discover the latest happenings in the world of entertainment.'
    }
  ];
function CategoryCardHome() {



    return (
        <>
         <div className="flex justify-between items-center mt-[100px] gap-6" style={{ marginLeft: 180, marginRight: 180 }}>
         <h2 className="mb-2 text-3xl font-bold ml-20">Category</h2>
            </div>
        <div className="flex justify-around items-center mt-6 px-[200px]">
        {categories.map((item, index) => (
          <Link to={`http://localhost:3000/?q=${item.name}`} key={index}>
            
              <div
                className="relative w-[300px] h-[400px] bg-cover bg-center transition-transform transform scale-100 hover:scale- duration-700"                 
                style={{
                  borderRadius: "10px",
                  backgroundImage: `url("${item.imageUrl}" )`
                }}
              >
                <div className="flex flex-col justify-center items-start h-full mt-98 w-3/4 ml-3">
                  <h2 className="text-lg text-white relative z-10">{item.name}</h2>
                  <p className="text-sm font-light text-white z-10">{item.description}</p>
                  
                </div>
                <hr />
                <div className="absolute inset-0 bg-black opacity-50" style={{ borderRadius: "10px" }}></div>
              </div>
            
          </Link>
        ))}
      </div>    
      </>  
    )
}

export default CategoryCardHome