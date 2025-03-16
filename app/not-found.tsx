import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-xl mb-8">Page not found</p>
      <Link href="/" className="px-6 py-3 bg-black hover:bg-zinc-800 rounded-lg transition-colors">
        Back to Home
      </Link>
    </div>
  );
} 