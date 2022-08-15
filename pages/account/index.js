import Link from "next/link";
import { Auth } from "aws-amplify";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Hub } from "aws-amplify";

export default function Account() {
    let [user, setUser] = useState(null);

    async function updateUSer() {
        try {
            const currentUser = await Auth.currentAuthenticatedUser();
            setUser(currentUser);
        } catch (error) {
            setUser(false);
            console.error({ error });
        }
        console.log({ user });
    }

    useEffect(() => {
        Hub.listen("auth", updateUSer);
        updateUSer();
    }, []);

    if (user === null) return <p className="text-center">Loading...</p>;
    else if (user === false) return <NotLoggedIn></NotLoggedIn>;
    else if (user !== null && user !== false) return <LoggedIn></LoggedIn>;
}

function NotLoggedIn() {
    return (
        <main className="mx-auto flex flex-col gap-y-2 text-center font-medium">
            <h1 className="text-lg">You're not logged-in</h1>
            <nav className="flex items-center gap-x-2 ">
                <Link href={"/account/login"}>
                    <button className="bg-black text-white rounded px-4 py-2">
                        Login
                    </button>
                </Link>
                <p>or</p>
                <Link href={"/account/register"}>
                    <button className="bg-black text-white rounded px-4 py-2">
                        Register
                    </button>
                </Link>
            </nav>
            <p>to continue</p>
        </main>
    );
}

function LoggedIn() {
    const router = useRouter();
    async function onClickHandler() {
        await Auth.signOut()
            .then(() => {
                console.log("logged out");
                router.push("/account");
            })
            .catch((error) => console.log("error logging out", error));
    }
    return (
        <main className="container grid place-items-center">
            <button
                className="bg-black text-white rounded py-2 px-4"
                onClick={onClickHandler}
            >
                Logout
            </button>
        </main>
    );
}
