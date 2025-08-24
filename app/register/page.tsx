'use client'
import { useState } from "react"
import Link from "next/link"

export default function RegisterPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [msg, setMsg] = useState('')

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const res = await fetch('/api/register', { method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({ email, password, name }) })
    if (res.ok) setMsg('Account created! You can now login.')
    else setMsg('Failed to register. Maybe user exists?')
  }

  return (
    <main className="container max-w-md">
      <form onSubmit={onSubmit} className="card space-y-3">
        <h1 className="text-xl font-semibold">Create account</h1>
        <label className="block"><span className="label">Name</span><input className="input mt-1" value={name} onChange={(e)=>setName(e.target.value)}/></label>
        <label className="block"><span className="label">Email</span><input className="input mt-1" type="email" value={email} onChange={(e)=>setEmail(e.target.value)}/></label>
        <label className="block"><span className="label">Password</span><input className="input mt-1" type="password" value={password} onChange={(e)=>setPassword(e.target.value)}/></label>
        <button className="btn" type="submit">Register</button>
        {msg && <p className="text-sm">{msg}</p>}
        <p className="text-sm">Already have an account? <Link className="underline" href="/login">Login</Link></p>
      </form>
    </main>
  )
}
