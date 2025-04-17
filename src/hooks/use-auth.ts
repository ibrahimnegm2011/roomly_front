'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { getCurrentUser, logout, User } from '@/lib/auth'

function checkEmailVerification(
  user: User | null,
  requireVerified: boolean,
  router: ReturnType<typeof useRouter>
) {
  if (requireVerified && user && !user.email_verified_at) {
    router.push('/verify-email')
  }
}

export function useAuth({ requireVerified = false }: { requireVerified?: boolean } = {}) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const stored = localStorage.getItem('auth:user')

    if (stored) {
      try {
        const parsed: User = JSON.parse(stored)
        setUser(parsed)
        checkEmailVerification(parsed, requireVerified, router)
        setLoading(false)
        return
      } catch {
        console.warn('Invalid auth:user in storage, falling back...')
      }
    }

    getCurrentUser()
      .then(fetchedUser => {
        if (fetchedUser) {
          setUser(fetchedUser)
          localStorage.setItem('auth:user', JSON.stringify(fetchedUser))
          checkEmailVerification(fetchedUser, requireVerified, router)
        } else {
          localStorage.removeItem('auth:user')
        }
      })
      .catch(() => localStorage.removeItem('auth:user'))
      .finally(() => setLoading(false))
  }, [requireVerified, router])

  return {
    user,
    loading,
    isVerified: !!user?.email_verified_at,
    setUser,
  }
}
