'use client'

import { useFormStatus } from 'react-dom'
import { loginAction } from './loginAction'
import Image from "next/image";
import Link from "next/link";
import InputGroup from "@/components/FormElements/InputGroup";
import { EmailIcon, PasswordIcon } from "@/assets/icons";
import { Checkbox } from "@/components/FormElements/checkbox";
import React, { useActionState, useEffect } from "react";
import { useAuth } from "@/hooks/use-auth";
import { redirect, useRouter } from "next/navigation";

interface LoginFormState {
  errors?: Record<string, string[]>,
  email?: string,
  password?: string,
  success?: boolean
}

const initialState: LoginFormState = {
  email: "ibrahimnegm2011@gmail.com",
  password: "Hema26590"
}

export default function LoginPage() {
  const router = useRouter()

  const [state, formAction] = useActionState<LoginFormState, FormData>(loginAction, initialState)

  useEffect(() => {
    if (state.success) {
      router.push('/')
    }
  }, [state.success, router])

  const { pending } = useFormStatus()


  const {user, loading} = useAuth()

  if(loading) return <div>Loading....</div>

  if(user) redirect('/')

  return (
    <>
      <div className="rounded-[10px] bg-white shadow-1 dark:bg-gray-dark dark:shadow-card">
        <div className="h-dvh flex flex-wrap items-center">
          <div className="w-full lg:w-1/2">
            <div className="w-full p-4 sm:p-12.5 lg:p-15">
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
                <form action={formAction}>
                  <InputGroup
                    type="email"
                    label="Email"
                    className="mb-4 [&_input]:py-[15px]"
                    placeholder="Enter your email"
                    name="email"
                    icon={<EmailIcon />}
                    defaultValue={state.email}
                  />
                  {state.errors?.email && (
                    <p className="text-sm text-red-600">{state.errors.email[0]}</p>
                  )}

                  <InputGroup
                    type="password"
                    label="Password"
                    className="mb-5 [&_input]:py-[15px]"
                    placeholder="Enter your password"
                    name="password"
                    icon={<PasswordIcon />}
                    defaultValue={state.password}
                  />
                  {state.errors?.password && (
                    <p className="text-sm text-red-600">{state.errors.password[0]}</p>
                  )}

                  <div className="mb-6 flex items-center justify-between gap-2 py-2 font-medium">
                    <Checkbox
                      label="Remember me"
                      name="remember"
                      withIcon="check"
                      minimal
                      radius="md"
                    />

                    <Link
                      href="/src/app/(app)/auth/forgot-password"
                      className="hover:text-primary dark:text-white dark:hover:text-primary"
                    >
                      Forgot Password?
                    </Link>
                  </div>

                  <div className="mb-4.5">
                    <button
                      type="submit"
                      className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-primary p-4 font-medium text-white transition hover:bg-opacity-90"
                    >
                      Login
                      {pending && (
                        <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-white border-t-transparent dark:border-primary dark:border-t-transparent" />
                      )}
                    </button>
                  </div>
                </form>
              </div>

              <div className="mt-6 text-center">
                <p>
                  Don’t have any account?{" "}
                  <Link href="/src/app/(app)/auth/sign-up" className="text-primary">
                    Sign Up
                  </Link>
                </p>
              </div>
            </div>
          </div>

          <div className="hidden w-full h-full p-7.5 lg:block lg:w-1/2 custom-gradient-1 content-center">
            <div className="bg-[url(/images/grids/grid-02.svg)] bg-cover bg-center overflow-hidden rounded-2xl px-12.5 pt-12.5 dark:!bg-dark-2 dark:bg-none justify-items-center">
                <Image
                  className="hidden dark:block"
                  src={"/images/logo/logo-big.png"}
                  alt="Logo"
                  width={352}
                  height={64}
                />
                <Image
                  className="dark:hidden"
                  src={"/images/logo/logo-big.png"}
                  alt="Logo"
                  width={352}
                  height={64}
                />
              <p className="mb-3 text-xl font-medium text-dark dark:text-white">
                Sign in to your account
              </p>

              <h1 className="mb-4 text-2xl font-bold text-dark dark:text-white sm:text-heading-3">
                Welcome Back!
              </h1>

              <p className="w-full max-w-[375px] font-medium text-dark-4 text-center dark:text-dark-6">
                Please sign in to your account by completing the necessary
                fields below
              </p>

            </div>
          </div>
        </div>
      </div>
    </>
  );
}


