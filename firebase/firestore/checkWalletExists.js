import firebase_app from "../config";
import { getFirestore, doc, getDoc } from "firebase/firestore"

const db = getFirestore(firebase_app)

export default async function  checkWalletExists (walletAddress) {
    const walletsCollection = collection(db, "wallets");
    const walletQuery = await getDocs(
      query(walletsCollection, where("wallet", "==", walletAddress))
    );
    return !walletQuery.empty;
  };