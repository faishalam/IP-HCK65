import CardHome from "../components/CardHome";
import CategoryCardHome from "../components/CategoryCardHome";
import Hero from "../components/Hero";
import Navbar from "../components/Navbar";

function HomaPage() {
    return (
        <>

            <Hero />
            <div className="flex justify-between items-center mt-20 gap-6" style={{ marginLeft: 180, marginRight: 180 }}>
                <p className="text-lg font-semibold">Category Option</p>
            </div>

            <CategoryCardHome />

            <CardHome/>
        </>
    )
}

export default HomaPage