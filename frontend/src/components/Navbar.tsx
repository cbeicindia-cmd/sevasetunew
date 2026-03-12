import Link from 'next/link';

const links = [
  ['Home', '/'],
  ['About', '/about'],
  ['Schemes', '/schemes'],
  ['Become an Agent', '/become-agent'],
  ['Citizen Login', '/login'],
  ['Contact', '/contact']
];

export default function Navbar() {
  return (
    <header className="bg-govBlue text-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
        <div>
          <h1 className="text-lg font-bold">SEVA SETU KENDRA</h1>
          <p className="text-xs">Connecting Citizens with Government Opportunities</p>
        </div>
        <nav className="flex gap-4 text-sm">
          {links.map(([label, href]) => (
            <Link key={href} href={href} className="hover:text-govSaffron">
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
