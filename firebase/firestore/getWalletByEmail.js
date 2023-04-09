import firebase_app from "../config";
import { getFirestore, doc, getDoc } from "firebase/firestore";

const db = getFirestore(firebase_app)

export default async function getWalletByEmail (email) {
    const walletsCollection = collection(db, "wallets");
  
    // Search for wallet with matching email
    const querySnapshot = await getDocs(
      query(walletsCollection, where("email", "==", email))
    );
  
    if (querySnapshot.empty) {
      // No matching documents found
      return null;
    } else {
      // Get the first matching document and return its wallet field
      const documentSnapshot = querySnapshot.docs[0];
      const data = documentSnapshot.data();
      return data.wallet;
    }
  };
  