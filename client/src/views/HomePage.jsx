import CardHome from "../components/CardHome";
import CategoryCardHome from "../components/CategoryCardHome";
import Hero from "../components/Hero";
import Navbar from "../components/Navbar";

function HomaPage() {
    return (
        <>
            <Navbar />
            <Hero />
            <CategoryCardHome />
            <CardHome />
        </>
    )
}

export default HomaPage