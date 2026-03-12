import Link from 'next/link';

const links = [
  ['Home', '/'],
  ['About', '/about'],
  ['Schemes Directory', '/schemes'],
  ['Become an Agent', '/become-agent'],
  ['Citizen Login', '/citizen-login'],
  ['Contact', '/contact']
];

export default function Navbar() {
  return (
    <nav className="bg-govtBlue text-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between p-4">
        <div>
          <h1 className="text-xl font-bold">SEVA SETU KENDRA</h1>
          <p className="text-xs">Connecting Citizens with Government Opportunities</p>
        </div>
        <div className="flex gap-4 text-sm">
          {links.map(([label, href]) => (
            <Link key={href} href={href} className="hover:text-saffron">
              {label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
