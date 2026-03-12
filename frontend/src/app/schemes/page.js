async function getSchemes() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/schemes`, { cache: 'no-store' });
  if (!res.ok) return [];
  return res.json();
}

export default async function Schemes() {
  const schemes = await getSchemes();
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">Government Schemes Directory</h2>
      <div className="grid gap-3">
        {schemes.slice(0, 20).map((s) => (
          <div className="card" key={s.scheme_id}>
            <h3 className="font-semibold">{s.scheme_name}</h3>
            <p className="text-sm">{s.state} • {s.department} • {s.category}</p>
            <a className="text-govtBlue text-sm" href={s.official_link}>Official Link</a>
          </div>
        ))}
      </div>
    </div>
  );
}
