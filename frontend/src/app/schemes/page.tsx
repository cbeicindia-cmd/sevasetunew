import { apiGet } from '@/lib/api';

export default async function SchemesPage() {
  const schemes = await apiGet('/schemes');

  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-bold text-govBlue">Government Schemes Directory</h2>
      <div className="grid gap-4 md:grid-cols-2">
        {schemes.slice(0, 20).map((scheme: any) => (
          <article key={scheme.id} className="rounded bg-white p-4 shadow">
            <h3 className="font-semibold">{scheme.schemeName}</h3>
            <p className="text-sm text-slate-600">{scheme.state} • {scheme.category}</p>
            <p className="mt-2 text-sm">{scheme.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
