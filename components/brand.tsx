import Image from "next/image"
import Link from "next/link"

export function Brand({ className = "" }: { className?: string }) {
  return (
    <Link href="/" className={"flex items-center gap-2 " + className}>
      <Image src="/logo.jpg" alt="inflow logo" width={28} height={28} className="rounded-md border border-neutral-200 dark:border-neutral-800"/>
      <span className="text-lg font-semibold">inflow</span>
    </Link>
  )
}
