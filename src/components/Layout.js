import Navbar from "./Navbar";
import Footer from "./Footer";

export default ({ children }) => (
    <div className="bg-neutral-200 min-h-full flex flex-col justify-between">
        <Navbar></Navbar>
        {children}
        <Footer></Footer>
    </div>
);
