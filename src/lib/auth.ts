'use client'

// lib/auth.ts
import axios from '@/lib/axios'
import { redirect } from 'next/navigation'

export interface User {
  id: number
  name: string
  email: string
  email_verified_at: string | null
  image: string | null
}


// ✅ Get the currently authenticated user
export async function getCurrentUser(): Promise<User | null> {
  try {
    const response = await axios.get('/api/user')
    return response.data
  } catch (error: any) {
    if (error.response?.status === 401) return null
    throw error
  }
}

// ✅ Require auth in server components/pages
export async function requireAuth(): Promise<User> {
  const user = await getCurrentUser()

  if (!user) redirect('/login')

  return user
}

// ✅ Redirect to target if already logged in
export async function redirectIfAuthenticated(path = '/') {
  const user = await getCurrentUser()
  if (user) redirect(path)
}

// ✅ Require email verification or redirect
export async function requireVerifiedEmail(): Promise<User> {
  const user = await requireAuth()
  if (!user.email_verified_at) redirect('/verify-email')
  return user
}

// ✅ Redirect from /verify-email if verified
export async function redirectIfEmailAlreadyVerified(path = '/') {
  const user = await getCurrentUser()
  if (user?.email_verified_at) redirect(path)
}

// ✅ Register new user
export async function register(data: {
  name: string
  email: string
  password: string
  password_confirmation: string
}) {
  await axios.get('/sanctum/csrf-cookie')

  try {
    await axios.post('/register', data)
  } catch (error: any) {
    if (error.response?.status === 422) {
      throw error.response.data.errors
    }
    throw error
  }
}

// ✅ Login user
export async function login({ email, password, }: {
  email: string
  password: string
}) {
  await axios.get('/sanctum/csrf-cookie')

  try {
    await axios.post('/login', { email, password })
  } catch (error: any) {
    if (error.response?.status === 422) {
      throw error.response.data.errors
    }
    throw error
  }
}

// ✅ Forgot password
export async function forgotPassword(email: string) {
  await axios.get('/sanctum/csrf-cookie')

  try {
    const response = await axios.post('/forgot-password', { email })
    return response.data.status
  } catch (error: any) {
    if (error.response?.status === 422) {
      throw error.response.data.errors
    }
    throw error
  }
}

// ✅ Reset password
export async function resetPassword(data: {
  email: string
  token: string
  password: string
  password_confirmation: string
}) {
  await axios.get('/sanctum/csrf-cookie')

  try {
    const response = await axios.post('/reset-password', data)
    return response.data.status
  } catch (error: any) {
    if (error.response?.status === 422) {
      throw error.response.data.errors
    }
    throw error
  }
}

// ✅ Resend verification email
export async function resendEmailVerification() {
  const response = await axios.post('/email/verification-notification')
  return response.data.status
}

// ✅ Logout user
export async function logout() {
  try {
    await axios.post('/logout')
  } catch (error: any) {
    if (error.response?.status !== 401) throw error
  }

  if (typeof window !== 'undefined') {
    localStorage.removeItem('auth:user')

    window.location.href = '/login'
  }
}