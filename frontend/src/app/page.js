export default function Home() {
  return (
    <section className="space-y-6">
      <div className="card border-l-4 border-govtGold">
        <h1 className="text-3xl font-bold text-govtBlue">SEVA SETU KENDRA</h1>
        <p className="mt-2">Connecting Citizens with Government Opportunities</p>
      </div>
      <div className="grid md:grid-cols-3 gap-4">
        {['Search 1000+ schemes', 'Apply via verified agents', 'Track application status'].map((f) => (
          <div className="card" key={f}>{f}</div>
        ))}
      </div>
    </section>
  );
}
