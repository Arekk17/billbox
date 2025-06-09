import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  doc,
  getDoc,
} from "firebase/firestore";
import { db, storage } from "@/lib/firebase/firebase";
import { ReceiptFormData } from "../validations/recipt";
import { getDownloadURL } from "firebase/storage";
import { uploadBytes } from "firebase/storage";
import { ref } from "firebase/storage";
export const getReceipts = async (userId: string) => {
  try {
    const receiptsRef = collection(db, "receipts");
    const q = query(receiptsRef, where("userId", "==", userId));
    const querySnapshot = await getDocs(q);

    const receipts = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return {
      success: true,
      data: receipts,
    };
  } catch (error) {
    console.error("Error getting receipts:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Wystąpił błąd",
    };
  }
};
export const getReceiptById = async (id: string) => {
  try {
    const receiptRef = doc(db, "receipts", id);
    const receiptSnap = await getDoc(receiptRef);

    if (!receiptSnap.exists()) {
      return {
        success: false,
        error: "Rachunek nie istnieje",
      };
    }

    return {
      success: true,
      data: { id: receiptSnap.id, ...receiptSnap.data() },
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Wystąpił błąd",
    };
  }
};

export const addReceipt = async (
  receipt: ReceiptFormData,
  userId: string
): Promise<{
  success: boolean;
  data?: ReceiptFormData;
  error?: string;
}> => {
  try {
    let imageUrl: string | null = null;

    if (receipt.image instanceof FileList && receipt.image.length > 0) {
      const file = receipt.image[0];
      const storageRef = ref(storage, `receipts/${Date.now()}_${file.name}`);
      const snapshot = await uploadBytes(storageRef, file);
      imageUrl = await getDownloadURL(snapshot.ref);
    }

    const receiptData = {
      ...receipt,
      image: imageUrl,
      userId: userId,
    };

    const receiptsRef = collection(db, "receipts");
    const docRef = await addDoc(receiptsRef, receiptData);
    const updatedReceipt = { ...receiptData, id: docRef.id };

    return {
      success: true,
      data: updatedReceipt,
    };
  } catch (error) {
    console.error("Error create receipts: ", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Wystąpił błąd",
    };
  }
};
