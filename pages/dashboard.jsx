import ProtectedRoute from "../components/ProtectedRoute";
import { useAuth } from "@/context/AuthContext";
import  addData  from "../firebase/firestore/addData";
import  getData  from "../firebase/firestore/getData";
import { ConnectWallet, useAddress } from "@thirdweb-dev/react";



const DashboardPage = () => {
  const { user } = useAuth()
  const address = useAddress()
  
  const addWallet = async () => {
    
    if(!address) return console.log('No wallet connected')
    else
    {
    const data = {
      email: user.email,
      wallet: address,
    }
    const { result, error } = await addData('wallets', user.uid, data)

    if (error)
    {
      return console.log(error)
    }
    }
  };

  const getWallet = async () => {
    const { result, error } = await getData('wallets', user.uid)

    if (error) 
    {
      return console.log(error)
    }

    console.log(result.data())
    
  };

    return (
        <ProtectedRoute>

      <div className="flex py-2 container mx-auto">
        <div className="text-gray-600 px-12 py-24 mt-24 overflow-y-hidden mx-auto">
          <h1>Hello {user.email}</h1>
          <h2 className="text-2xl font-semibold">You are logged in, this is dashboard page!</h2>
          <div>
          <button  onClick={addWallet}  className="px-4 py-2 bg-blue-500 text-white font-bold rounded hover:bg-blue-700">
           Connect Account with Wallet
           </button>
           </div>
           <div>
           <button  onClick={getWallet}  className="px-4 py-2 bg-blue-500 text-white font-bold rounded hover:bg-blue-700">
           Get wallet
           </button>
           </div>
        </div>
        <div className="justify-center">
        
        <ConnectWallet theme="dark" btnTitle="Connect your Wallet"/>

        </div>
      </div>
    
        </ProtectedRoute>
    );
  };
  
  export default DashboardPage;