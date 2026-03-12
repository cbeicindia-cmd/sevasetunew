'use client';
import { useEffect, useState } from 'react';

const api = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

export default function SchemesPage() {
  const [schemes, setSchemes] = useState([]);
  const [q, setQ] = useState('');

  useEffect(() => {
    fetch(`${api}/api/schemes?q=${encodeURIComponent(q)}`)
      .then((res) => res.json())
      .then(setSchemes)
      .catch(() => setSchemes([]));
  }, [q]);

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-govtBlue">Government Schemes Directory</h2>
      <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search by name or keyword" className="w-full rounded border bg-white p-2" />
      <div className="grid gap-3">
        {schemes.map((scheme) => (
          <div key={scheme.id} className="rounded bg-white p-4 shadow">
            <h3 className="font-semibold">{scheme.scheme_name}</h3>
            <p className="text-sm">{scheme.description}</p>
            <p className="text-xs text-slate-500">{scheme.state} • {scheme.department} • {scheme.category}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
