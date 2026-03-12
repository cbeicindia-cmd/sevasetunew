export default function CitizenLoginPage() {
  return (
    <div className="max-w-md space-y-4 rounded-lg bg-white p-6 shadow">
      <h2 className="text-2xl font-bold text-govBlue">Citizen Login</h2>
      <input className="w-full rounded border p-2" placeholder="Email" />
      <input className="w-full rounded border p-2" placeholder="Password" type="password" />
      <button className="rounded bg-govBlue px-4 py-2 text-white">Login</button>
    </div>
  );
}
