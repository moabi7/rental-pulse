import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import AuthProvider from '@/components/AuthProvider';
import { ToastContainer } from 'react-toastify';
import { GlobalProvider } from '@/context/GlobalContext';
import '@/assets/styles/globals.css';
import'react-toastify/dist/ReactToastify.css';
import 'photoswipe/dist/photoswipe.css'

export const metadata = {
    title: 'PropertyPulse | Find The Perfect Rental',
    description: 'Find your dream rental property',
    keywords: 'rental, find rentals, find properties'
};

const MainLayout = ({children}) => {999
  return (
    <GlobalProvider>
      <AuthProvider>
        <html lang='en'>
            <body>
                <NavBar/>
                  <main>{children}</main>
                <Footer/>
                <ToastContainer />
            </body>
        </html>
      </AuthProvider>
    </GlobalProvider>
  )
};

export default MainLayout;