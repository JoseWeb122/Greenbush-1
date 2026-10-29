import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl px-5 py-32 text-center">
      <p className="eyebrow text-terracotta">404</p>
      <h1 className="mt-4 text-5xl text-evergreen">This path wandered off the prairie.</h1>
      <p className="mt-4 text-charcoal/70">The page you’re looking for doesn’t exist or has moved.</p>
      <div className="mt-8 flex justify-center gap-3"><Link href="/" className="btn btn-primary">Go home</Link><Link href="/shop" className="btn btn-outline">Visit the shop</Link></div>
    </div>
  );
}
