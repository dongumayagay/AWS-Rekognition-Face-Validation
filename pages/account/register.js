import Link from "next/link";
import { Auth } from "aws-amplify";
import { useRouter } from "next/router";

export default function Register() {
    const router = useRouter();
    async function submitHandler(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const { email, password } = Object.fromEntries(formData);
        const username = email;
        try {
            await Auth.signUp({
                username,
                password,
                autoSignIn: { enabled: true },
            });
            const code = prompt("enter email confirmation code");
            await Auth.confirmSignUp(username, code);
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
            <h1 className="text-2xl text-center">Register</h1>
            <input
                className="rounded border px-4 py-2"
                type="email"
                name="email"
                placeholder="Email"
                required
                autoComplete="off"
            ></input>
            <input
                className="rounded border px-4 py-2"
                type="password"
                name="password"
                placeholder="Password"
                required
                autoComplete="off"
            ></input>
            <button className="bg-black text-white rounded px-4 py-2">
                Create Account
            </button>
            <p className="text-center">
                <Link href={"/account/login"}>
                    Already have an account? Login
                </Link>
            </p>
        </form>
    );
}
