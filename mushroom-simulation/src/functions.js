import { collection, addDoc, serverTimestamp, doc, setDoc, arrayUnion } from "firebase/firestore";
import { db } from "./firebase.js";


export function shuffle(array){
    let currentIndex = array.length;
    while(currentIndex!=0){
        let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
    }
}

// Function to add survey response
export const addSurveyResponse = async (data) => {
  try {
    await addDoc(collection(db, "surveyResponses"), {
      ...data,
      timestamp: serverTimestamp(), // Add a server timestamp
    });
    console.log("Response successfully added!");
  } catch (error) {
    console.error("Error adding Response: ", error);
  }
};

// Function to add ID
export const addID = async (studentID) => {
    try {
      const docRef = doc(db, "studentID", "NymkRGuYkqL8mgwOebHX"); // Use a fixed document ID "allIDs"
      await setDoc(
        docRef,
        {
          ids: arrayUnion(studentID), // Add studentID to an array
        },
        { merge: true } // Merge with existing data instead of overwriting
      );
      console.log("ID successfully added!");
    } catch (error) {
      console.error("Error adding ID: ", error);
    }
  };

