export default function AdminDashboard() {
  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-bold text-govBlue">Admin Panel</h2>
      <div className="grid gap-3 md:grid-cols-4">
        {['Total Schemes', 'Total Agents', 'Total Citizens', 'Applications'].map((item) => (
          <div key={item} className="rounded bg-white p-4 shadow">{item}</div>
        ))}
      </div>
      <div className="rounded bg-white p-4 shadow">
        <p>Manage schemes, users, approvals, application tracking, and AI update logs.</p>
      </div>
    </section>
  );
}
