import Link from "next/link"
import Image from "next/image"

export default function HomePage() {
  return (
    <main className="container">
      <section className="card flex items-center gap-6">
        <Image src="/logo.jpg" alt="inflow logo" width={64} height={64} className="rounded-xl border border-neutral-200 dark:border-neutral-800"/>
        <div>
          <h1 className="text-3xl font-semibold">inflow — a calm study workspace</h1>
          <p className="mt-2 text-neutral-600 dark:text-neutral-400">Plan tasks, track focused time, and watch your exam countdown. Minimal, fast, student‑friendly.</p>
          <div className="mt-4 flex gap-3">
            <Link className="btn" href="/register">Get started</Link>
            <Link className="btn" href="/login">I already have an account</Link>
          </div>
        </div>
      </section>
    </main>
  )
}
