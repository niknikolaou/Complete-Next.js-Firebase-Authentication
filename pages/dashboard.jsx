import ProtectedRoute from "../components/ProtectedRoute";
import { useAuth } from "@/context/AuthContext";


const DashboardPage = () => {
  const { user } = useAuth();

    return (
        <ProtectedRoute>

      <div className="flex py-2 container mx-auto">
        <div className="text-gray-600 px-12 py-24 mt-24 overflow-y-hidden mx-auto">
          <h1>Hello {user.email}</h1>
          
          <h2 className="text-2xl font-semibold">You are logged in, this is dashboard page!</h2>
        </div>
      </div>
    
        </ProtectedRoute>
    );
  };
  
  export default DashboardPage;