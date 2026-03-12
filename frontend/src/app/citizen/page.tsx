export default function CitizenPanel() {
  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-bold text-govBlue">Citizen Panel</h2>
      <div className="grid gap-3 md:grid-cols-3">
        <div className="rounded bg-white p-4 shadow">Search Schemes</div>
        <div className="rounded bg-white p-4 shadow">Find Nearest Agent</div>
        <div className="rounded bg-white p-4 shadow">Track Application</div>
      </div>
    </section>
  );
}
