import Head from "next/head";
import Image from "next/image";

export default function Home() {
    return (
        <>
            <Head>
                <title>Home | Person Verifier </title>
            </Head>
            <main className="py-8">
                <div className="container">
                    <h1 className="text-2xl">Homepage</h1>
                </div>
            </main>
        </>
    );
}
