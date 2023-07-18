import { db } from "../firebase-config";

import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

const empCollectionRef = collection(db, "employees");

class EmpDataService {
  addEmps = (newEmp) => {
    return addDoc(empCollectionRef, newEmp);
  };
  updateEmp = (id, updatedEmp) => {
    const empDoc = doc(db, "employees", id);
    return updateDoc(empDoc, updatedEmp);
  };
  deleteEmp = (id) => {
    const empDoc = doc(db, "employees", id);
    return deleteDoc(empDoc);
  };
  getAllEmps = () => {
    return getDocs(empCollectionRef);
  };
  getEmp = (id) => {
    const empDoc = doc(db, "employees", id);
    return getDoc(empDoc);
  };
}
export default new EmpDataService();