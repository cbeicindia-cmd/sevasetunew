import './globals.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export const metadata = {
  title: 'SEVA SETU KENDRA',
  description: 'Connecting Citizens with Government Opportunities'
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main className="mx-auto max-w-7xl p-4">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
