import Link from 'next/link';

export default function HomePage() {
  return (
    <section className="space-y-6">
      <div className="rounded-xl bg-govLight p-6">
        <h2 className="text-3xl font-bold text-govBlue">SEVA SETU KENDRA</h2>
        <p className="mt-2 text-lg">Connecting Citizens with Government Opportunities</p>
        <p className="mt-3 text-sm">A unified AI-powered platform helping citizens access Central and State schemes through trusted registered agents.</p>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        <Link className="rounded-lg bg-white p-4 shadow" href="/schemes">Search Government Schemes</Link>
        <Link className="rounded-lg bg-white p-4 shadow" href="/become-agent">Become a Seva Setu Agent</Link>
        <Link className="rounded-lg bg-white p-4 shadow" href="/citizen">Citizen Dashboard</Link>
      </div>
    </section>
  );
}
