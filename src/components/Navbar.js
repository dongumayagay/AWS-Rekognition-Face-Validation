import Link from "next/link";

export default function Navbar() {
    return (
        <nav className="bg-black text-white">
            <main className="container flex gap-x-4 py-4 font-medium">
                <Link href={"/"}>Home</Link>
                <Link href={"/about"}> About</Link>
            </main>
        </nav>
    );
}
