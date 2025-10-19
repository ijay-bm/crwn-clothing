import { Link } from "react-router";
import Button from "~/components/button";
import SigninForm from "~/components/sign-in-form";
import { useAuth } from "~/hooks/useAuth";
import { useAuthStore } from "~/store/auth";

import GoogleSvg from "../assets/svgs/google.svg";

export default function SignIn() {
  const { socialLogin } = useAuth();

  const { loading } = useAuthStore();

  return (
    <div className="mx-auto flex max-w-[380px] flex-1 flex-col gap-2.5">
      <h1 className="mb-2 text-center text-3xl">Sign In</h1>

      <SigninForm />

      <Button
        className="flex w-full items-center justify-center bg-transparent
          text-neutral-800"
        onClick={async () => {
          const response = await socialLogin();
          console.log(response);
        }}
        color="blue"
        disabled={loading}
      >
        Login With Google <GoogleSvg height="30" />
      </Button>

      <hr className="my-5 border-neutral-200" />

      <Link
        className="block w-full cursor-pointer px-3.5 py-2.5 text-center
          text-blue-600"
        to="/sign-up"
        onClick={loading ? e => e.preventDefault() : undefined}
      >
        Create An Account
      </Link>
    </div>
  );
}
