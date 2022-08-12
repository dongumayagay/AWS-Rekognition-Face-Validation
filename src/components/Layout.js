import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Layout({ children }) {
    return (
        <div className=" min-h-full flex flex-col justify-between">
            <Navbar></Navbar>
            {children}
            <Footer></Footer>
        </div>
    );
}
