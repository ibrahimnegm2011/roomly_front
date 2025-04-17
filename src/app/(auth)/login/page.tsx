import LoginPage from './LoginPage'

export const metadata = {
  title: 'Login',
  description: 'Secure login page',
}

export default async function LoginPageWrapper() {
  return <LoginPage />
}