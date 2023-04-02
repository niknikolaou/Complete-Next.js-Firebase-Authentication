import '@/styles/globals.css'
import { AuthContextProvider } from '@/context/AuthContext'
import Navbar from '@/components/navbar'
import { ThirdwebProvider } from "@thirdweb-dev/react";


export default function App({ 
  Component, 
  pageProps: { session, ...pageProps},
}) {
  return (
    
    <AuthContextProvider>
      <ThirdwebProvider activeChain="ethereum">
    <Navbar>

      <Component {...pageProps} />
    </Navbar>
    </ThirdwebProvider>
    </AuthContextProvider>


  )
}
