import Link from "next/link";

export default function Navbar() {
    return (
        <nav>
            <main>
                <Link href={"/"}>Home</Link>
                <Link href={"/about"}> About</Link>
            </main>
        </nav>
    );
}
