import axios from '@/lib/axios'
import { cookies } from 'next/headers'
import { router } from "next/client";

export async function getCurrentUser() {
  const cookieHeader = (await cookies())
    .getAll()
    .map(c => `${c.name}=${c.value}`)
    .join('; ')

  try {
    const response = await axios.get('/api/user', {
      headers: {
        Cookie: cookieHeader,
      },
    })

    return response.data
  } catch (error: any) {
    if (error.response.status !== 409) throw error

    await router.push('/verify-email')
  }
}
