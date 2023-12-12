import AuthForm from '../components/AuthForm';
import { json, redirect } from 'react-router-dom';

function AuthenticationPage() {
  return <AuthForm />;
}

export default AuthenticationPage

export const action = async ({ request }) => {
  // This is how to get searchParams without hook 
  // (browser API for outside components)
  const searchParams = new URL(request.url).searchParams
  const mode = searchParams.get('mode') || 'login'

  if (mode !== 'login' && mode !== 'signup') {
    throw json({ message: 'Invalid mode.' }, { status: 422 })
  }
  const data = await request.formData()
  const authData = {
    email: data.get('email'),
    password: data.get('password'),
  }

  const response = await fetch('http://localhost:8080' + (mode === 'login' ? '/login' : '/signup'), {
    method: 'POST',
    body: JSON.stringify(authData),
    headers: {
      'Content-Type': 'application/json',
    },
  })

  // Don't throw but return data to the form to have some useful feedback for the user
  if (response.status === 422 || response.status === 401) {
    return response
  }

  if (!response.ok) {
    throw json({ message: 'Could not authenticate user.' }, { status: 500 })
  }

  const resData = await response.json()
  const token = resData.token

  localStorage.setItem('token', token)
  const expiration = new Date()
  expiration.setHours(expiration.getHours() + 1)
  localStorage.setItem('expiration', expiration.toISOString())

  return redirect('/')

}
