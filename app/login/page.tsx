'use client'
import { signIn } from "next-auth/react"
import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const res = await signIn('credentials', { redirect: false, email, password })
    if (res?.error) setError(res.error)
    else router.push('/dashboard')
  }

  return (
    <main className="container max-w-md">
      <form onSubmit={onSubmit} className="card space-y-3">
        <h1 className="text-xl font-semibold">Login</h1>
        {error && <p className="text-sm text-red-600">{error}</p>}
        <label className="block">
          <span className="label">Email</span>
          <input className="input mt-1" type="email" value={email} onChange={(e)=>setEmail(e.target.value)} />
        </label>
        <label className="block">
          <span className="label">Password</span>
          <input className="input mt-1" type="password" value={password} onChange={(e)=>setPassword(e.target.value)} />
        </label>
        <button className="btn" type="submit">Sign in</button>
        <p className="text-sm">No account? <Link className="underline" href="/register">Register</Link></p>
      </form>
    </main>
  )
}
