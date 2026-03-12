export default function SchemesPage() {
  const filters = ['State', 'Category', 'Income', 'Gender', 'Age', 'Department'];
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-govBlue">Government Schemes Directory</h2>
      <div className="grid gap-3 rounded-lg bg-white p-4 shadow md:grid-cols-3">
        <input className="rounded border p-2" placeholder="Search schemes" />
        {filters.map((f) => (
          <select key={f} className="rounded border p-2">
            <option>{f}</option>
          </select>
        ))}
      </div>
      <div className="rounded-lg bg-white p-4 shadow">
        <p className="text-sm">Connect this page to <code>/api/schemes</code> to load searchable government schemes in real time.</p>
      </div>
    </div>
  );
}
