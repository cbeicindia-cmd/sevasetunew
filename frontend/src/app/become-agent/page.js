export default function BecomeAgent() {
  return (
    <form className="card space-y-3" action="#">
      <h2 className="text-2xl font-semibold">Become a Seva Setu Agent</h2>
      <p>Register to help citizens apply for government schemes.</p>
      {['Full Name','Mobile Number','Email','Aadhar Number','PAN Number','State','District','Address','Education','Experience'].map((f)=> <input key={f} className="border p-2 rounded w-full" placeholder={f} />)}
      <input type="file" className="border p-2 rounded w-full" multiple />
      <button className="bg-govtBlue text-white px-4 py-2 rounded">Submit Application</button>
    </form>
  );
}
