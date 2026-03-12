import './globals.css';
import Navbar from '../components/Navbar';

export const metadata = {
  title: 'SEVA SETU KENDRA',
  description: 'Connecting Citizens with Government Opportunities'
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main className="mx-auto min-h-screen max-w-6xl px-4 py-6">{children}</main>
      </body>
    </html>
  );
}
