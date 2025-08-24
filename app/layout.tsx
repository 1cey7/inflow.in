import "./globals.css"
import Link from "next/link"
import { auth, signOut } from "@/lib/auth"
import { Brand } from "@/components/brand"

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await auth()
  const github = process.env.GITHUB_URL ?? "https://github.com/your-github"
  return (
    <html lang="en">
      <body>
        <div className="container py-6">
          <header className="flex items-center justify-between mb-6">
            <Brand />
            <nav className="flex items-center gap-3 text-sm">
              {session ? (
                <>
                  <Link href="/dashboard">Dashboard</Link>
                  <Link href="/tasks">Tasks</Link>
                  <Link href="/timer">Timer</Link>
                  <Link href="/exams">Exams</Link>
                  <form action={async () => { 'use server'; await signOut(); }}>
                    <button className="btn" type="submit">Sign out</button>
                  </form>
                </>
              ) : (
                <>
                  <Link className="btn" href="/login">Login</Link>
                  <Link className="btn" href="/register">Register</Link>
                </>
              )}
            </nav>
          </header>
          {children}
          <footer className="mt-12 text-center text-xs text-neutral-500">
            © {new Date().getFullYear()} inflow · <a className="underline" href={github} target="_blank">GitHub</a>
          </footer>
        </div>
      </body>
    </html>
  )
}
