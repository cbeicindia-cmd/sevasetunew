import './globals.css';
import NavBar from '../components/NavBar';

export const metadata = { title: 'SEVA SETU KENDRA' };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <NavBar />
        <main className="max-w-6xl mx-auto p-4">{children}</main>
      </body>
    </html>
  );
}
