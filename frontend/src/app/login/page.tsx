export default function LoginPage() {
  return (
    <section className="max-w-md rounded bg-white p-6 shadow">
      <h2 className="text-2xl font-bold text-govBlue">Citizen Login</h2>
      <form className="mt-4 space-y-3">
        <input className="w-full rounded border p-2" placeholder="Email" />
        <input className="w-full rounded border p-2" placeholder="Password" type="password" />
        <button className="w-full rounded bg-govBlue p-2 text-white">Login</button>
      </form>
    </section>
  );
}
