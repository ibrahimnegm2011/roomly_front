import Link from "next/link";
import GoogleSigninButton from "../GoogleSigninButton";
import SigninForm from "../SigninForm";
import Image from "next/image";

export default function LoginForm() {
  return (
    <>
      <div className="justify-items-center lg:hidden">
        <Image
          className=""
          src={"/images/logo/logo-big.png"}
          alt="Logo"
          width={352}
          height={64}
        />
      </div>
      <div>
        <SigninForm />
      </div>

      <div className="mt-6 text-center">
        <p>
          Don’t have any account?{" "}
          <Link href="/src/app/(app)/auth/sign-up" className="text-primary">
            Sign Up
          </Link>
        </p>
      </div>
    </>
  );
}
