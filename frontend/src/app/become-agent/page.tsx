export default function BecomeAgentPage() {
  return (
    <section className="rounded bg-white p-6 shadow">
      <h2 className="text-2xl font-bold text-govBlue">Become a Seva Setu Agent</h2>
      <form className="mt-4 grid gap-3 md:grid-cols-2">
        {['Full Name', 'Mobile Number', 'Email', 'Aadhar Number', 'PAN Number', 'State', 'District', 'Address', 'Education', 'Experience'].map((field) => (
          <input key={field} placeholder={field} className="rounded border p-2" />
        ))}
        <button className="rounded bg-govBlue px-4 py-2 text-white md:col-span-2">Submit Registration</button>
      </form>
    </section>
  );
}
