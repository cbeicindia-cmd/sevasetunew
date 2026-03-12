import Link from 'next/link';

const navItems = [
  ['/', 'Home'],
  ['/about', 'About'],
  ['/schemes', 'Schemes Directory'],
  ['/become-agent', 'Become an Agent'],
  ['/citizen-login', 'Citizen Login'],
  ['/contact', 'Contact']
];

export default function Navbar() {
  return (
    <header className="bg-govBlue text-white">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-4">
        <div>
          <h1 className="text-xl font-bold">SEVA SETU KENDRA</h1>
          <p className="text-xs">Connecting Citizens with Government Opportunities</p>
        </div>
        <nav className="flex gap-4 text-sm font-medium">
          {navItems.map(([href, label]) => (
            <Link key={href} href={href} className="hover:underline">
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
