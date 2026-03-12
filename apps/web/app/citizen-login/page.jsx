export default function CitizenLoginPage() {
  return (
    <div className="max-w-md rounded bg-white p-6 shadow">
      <h2 className="mb-4 text-xl font-semibold">Citizen Login</h2>
      <form className="space-y-3">
        <input className="w-full rounded border p-2" placeholder="Email" />
        <input className="w-full rounded border p-2" placeholder="Password" type="password" />
        <button className="rounded bg-govtBlue px-4 py-2 text-white">Login</button>
      </form>
    </div>
  );
}
