import Link from 'next/link';

const links = [
  ['Home', '/'], ['About', '/about'], ['Schemes', '/schemes'], ['Become Agent', '/become-agent'], ['Citizen Login', '/login'], ['Contact', '/contact']
];

export default function NavBar() {
  return (
    <nav className="bg-govtBlue text-white">
      <div className="max-w-6xl mx-auto flex flex-wrap gap-4 p-4 items-center justify-between">
        <div>
          <p className="font-bold text-xl">SEVA SETU KENDRA</p>
          <p className="text-xs">Connecting Citizens with Government Opportunities</p>
        </div>
        <div className="flex gap-4 text-sm">
          {links.map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}
        </div>
      </div>
    </nav>
  );
}
