import Link from "next/link";
import { useRouter } from "next/router";
import { Auth } from "aws-amplify";

export default function Login() {
    const router = useRouter();
    async function submitHandler(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const { email, password } = Object.fromEntries(formData);
        console.log({ email }, { password });
        try {
            const username = email;
            const user = await Auth.signIn(username, password);
            console.log(user);
            router.push("/account");
        } catch (error) {
            console.log("error signing up:", error);
        }
    }
    return (
        <form
            onSubmit={submitHandler}
            className="mx-auto rounded bg-white flex flex-col flex-1 w-full sm:flex-initial sm:w-[448px] justify-center px-4 py-8 border gap-4 shadow-2xl  "
        >
            <h1 className="text-2xl text-center">Login</h1>
            <input
                className="rounded border px-4 py-2"
                type="email"
                name="email"
                placeholder="Email"
                required
            ></input>
            <input
                className="rounded border px-4 py-2"
                type="password"
                name="password"
                placeholder="Password"
                required
            ></input>
            <button className="bg-black text-white rounded px-4 py-2">
                Login
            </button>
            <p className="text-center">
                <Link href={"/account/register"}>
                    Don't have have and account? Create one
                </Link>
            </p>
        </form>
    );
}
