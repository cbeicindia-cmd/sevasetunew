export default function BecomeAgentPage() {
  const fields = ['Full Name', 'Mobile Number', 'Email', 'Aadhar Number', 'PAN Number', 'State', 'District', 'Address', 'Education', 'Experience'];
  return (
    <div className="rounded bg-white p-6 shadow">
      <h2 className="mb-4 text-2xl font-bold">Become a Seva Setu Agent</h2>
      <form className="grid gap-3 md:grid-cols-2">
        {fields.map((f) => <input key={f} placeholder={f} className="rounded border p-2" />)}
        <input type="file" className="rounded border p-2 md:col-span-2" />
        <button className="rounded bg-govtGreen px-4 py-2 text-white md:col-span-2">Submit Registration</button>
      </form>
    </div>
  );
}
