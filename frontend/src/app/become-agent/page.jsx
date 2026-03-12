export default function BecomeAgentPage() {
  const fields = ['Full Name', 'Mobile Number', 'Email', 'Aadhar Number', 'PAN Number', 'State', 'District', 'Address', 'Education', 'Experience'];
  return (
    <div className="space-y-4 rounded-lg bg-white p-6 shadow">
      <h2 className="text-2xl font-bold text-govBlue">Become a Seva Setu Agent</h2>
      <p className="text-sm">Mobile OTP verification is mandatory before registration submission.</p>
      <div className="grid gap-3 md:grid-cols-2">
        {fields.map((field) => (
          <input key={field} className="rounded border p-2" placeholder={field} />
        ))}
      </div>
      <button className="rounded bg-govBlue px-4 py-2 text-white">Submit Registration</button>
    </div>
  );
}
