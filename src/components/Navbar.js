import Link from "next/link";

export default () => (
    <nav className="bg-black text-white">
        <main className="container flex gap-x-4 py-4 font-medium">
            <Link href={"/"}>Home</Link>
            <Link href={"/account"}>Account</Link>
            <Link href={"/liveliness"}>Liveliness</Link>
            <Link href={"/about"}> About</Link>
        </main>
    </nav>
);
