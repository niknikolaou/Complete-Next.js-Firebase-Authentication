import { LayoutProvider } from '../layout/context/layoutcontext';
import { AuthContextProvider } from '@/context/AuthContext'
import Navbar from '@/components/navbar'
import { ThirdwebProvider } from "@thirdweb-dev/react";
import Layout from '../layout/layout';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import '../styles/layout/layout.scss';


export default function App({  Component,  pageProps: { session, ...pageProps},}) {
  if (Component.getLayout) {
    return  <AuthContextProvider>
    <ThirdwebProvider activeChain="ethereum">
    
    <LayoutProvider>{Component.getLayout(<Component {...pageProps} />)}</LayoutProvider>;
    
    </ThirdwebProvider>
    </AuthContextProvider>

} else {
    return (
      <AuthContextProvider>
    <ThirdwebProvider activeChain="ethereum">

        <LayoutProvider>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </LayoutProvider>

      </ThirdwebProvider>
    </AuthContextProvider>
    );
}
}

/* return (
    
    <AuthContextProvider>
      <ThirdwebProvider activeChain="ethereum">
    <Navbar>

      <Component {...pageProps} />
    </Navbar>
    </ThirdwebProvider>
    </AuthContextProvider>


  )
}*/
