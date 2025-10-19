import { Link } from "react-router";
import SignUpForm from "~/components/sign-up-form";
import { useAuthStore } from "~/store/auth";

export default function SignUp() {
  const { loading } = useAuthStore();

  return (
    <div className="mx-auto flex max-w-[380px] flex-1 flex-col gap-2.5">
      <h1 className="mb-2 text-center text-3xl">Sign Up</h1>

      <SignUpForm />

      <hr className="my-5 border-neutral-200" />

      <Link
        className="block w-full cursor-pointer px-3.5 py-2.5 text-center
          text-blue-600"
        to="/sign-in"
        onClick={loading ? e => e.preventDefault() : undefined}
      >
        Sign In Instead
      </Link>
    </div>
  );
}
