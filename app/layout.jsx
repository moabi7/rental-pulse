import '@/assets/styles/globals.css';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import AuthProvider from '@/components/AuthProvider';

export const metadata = {
    title: 'PropertyPulse | Find The Perfect Rental',
    description: 'Find your dream rental property',
    keywords: 'rental, find rentals, find properties'
};

const MainLayout = ({children}) => {999
  return (
    <AuthProvider>
      <html lang='en'>
          <body>
              <NavBar/>
                <main>{children}</main>
              <Footer/>
          </body>
      </html>
    </AuthProvider>
  )
};

export default MainLayout;