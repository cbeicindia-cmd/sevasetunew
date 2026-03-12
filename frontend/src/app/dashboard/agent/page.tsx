export default function AgentDashboard() {
  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-bold text-govBlue">Agent Dashboard</h2>
      <ul className="grid gap-3 md:grid-cols-2">
        <li className="rounded bg-white p-4 shadow">View all government schemes</li>
        <li className="rounded bg-white p-4 shadow">Submit citizen applications</li>
        <li className="rounded bg-white p-4 shadow">Upload document metadata</li>
        <li className="rounded bg-white p-4 shadow">Track application status</li>
      </ul>
    </section>
  );
}
