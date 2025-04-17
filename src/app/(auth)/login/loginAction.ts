import { login } from "@/lib/auth";
import { redirect } from "next/navigation";

interface LoginFormState {
  errors?: Record<string, string[]>
  success?: boolean
}

export async function loginAction(_: LoginFormState, formData: FormData): Promise<LoginFormState> {
  try {
    await login({
      email: formData.get('email') as string,
      password: formData.get('password') as string,
    })

    return { success: true }
  } catch (errors: any) {
    return { errors }
  }
}