export default function AdminDashboardPage() {
  const cards = ['Total Schemes', 'Total Agents', 'Total Citizens', 'Applications'];
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-govBlue">Admin Panel</h2>
      <div className="grid gap-4 md:grid-cols-4">
        {cards.map((card) => (
          <div key={card} className="rounded bg-white p-4 shadow">
            <p className="text-sm text-slate-500">{card}</p>
            <p className="text-2xl font-bold">--</p>
          </div>
        ))}
      </div>
    </div>
  );
}
