import Link from "next/link";

export default function Home() {
  return <div className="flex items-center justify-center h-screen w-screen text-3xl flex-col gap-4">
    <Link href="/websdk">Navigate to WebSDK</Link>
    <Link href="/evmkit">Navigate to EVMKit</Link>
  </div>
}
