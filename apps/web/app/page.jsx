export default function HomePage() {
  return (
    <section className="space-y-6 py-8">
      <div className="rounded-lg bg-white p-8 shadow">
        <h2 className="text-3xl font-bold text-govtBlue">Welcome to SEVA SETU KENDRA</h2>
        <p className="mt-2 text-lg">Connecting Citizens with Government Opportunities</p>
        <p className="mt-4 text-slate-600">
          Access Central and State government schemes through verified service agents, with AI-powered updates and secure application tracking.
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-4">
        {['Citizen Panel', 'Agent Dashboard', 'Admin Panel', 'AI Scheme Monitoring'].map((item) => (
          <div key={item} className="rounded border bg-white p-4 shadow-sm">{item}</div>
        ))}
      </div>
    </section>
  );
}
