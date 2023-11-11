import Link from "next/link";

export function Header() {
  return (
    <header className="h-14 px-6 border-b">
      <nav className="flex h-full items-center justify-between">
        <Link
          href="/"
          className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-tr from-orange-500 to-red-500"
        >
          Tanstack Table - SSR
        </Link>
      </nav>
    </header>
  );
}
