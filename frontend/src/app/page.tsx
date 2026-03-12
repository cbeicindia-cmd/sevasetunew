import Link from 'next/link';

export default function HomePage() {
  return (
    <section className="space-y-6">
      <div className="rounded-lg bg-white p-8 shadow">
        <h2 className="text-3xl font-bold text-govBlue">SEVA SETU KENDRA</h2>
        <p className="mt-2 text-lg">Connecting Citizens with Government Opportunities</p>
        <p className="mt-4 text-slate-700">
          Discover and apply for Central and State schemes with support from verified Seva Setu Agents.
        </p>
        <div className="mt-6 flex gap-3">
          <Link href="/schemes" className="rounded bg-govBlue px-4 py-2 text-white">Browse Schemes</Link>
          <Link href="/become-agent" className="rounded border border-govBlue px-4 py-2 text-govBlue">Become an Agent</Link>
        </div>
      </div>
    </section>
  );
}
