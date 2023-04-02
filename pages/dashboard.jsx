import ProtectedRoute from "../components/ProtectedRoute";
import { useAuth } from "@/context/AuthContext";
import {firebase_app} from "../firebase/config";
import  addData  from "../firebase/firestore/addData";


const DashboardPage = () => {
  const { user } = useAuth();

  const addWallet = async () => {
    const data = {
      name: 'John snow',
      house: 'Stark'
    }
    const { result, error } = await addData('wallets', user.uid, data)

    if (error) {
      return console.log(error)
    }
  };

    return (
        <ProtectedRoute>

      <div className="flex py-2 container mx-auto">
        <div className="text-gray-600 px-12 py-24 mt-24 overflow-y-hidden mx-auto">
          <h1>Hello {user.email}</h1>
          
          <h2 className="text-2xl font-semibold">You are logged in, this is dashboard page!</h2>
          <button onClick={addWallet}>Add Data</button>
        </div>
      </div>
    
        </ProtectedRoute>
    );
  };
  
  export default DashboardPage;