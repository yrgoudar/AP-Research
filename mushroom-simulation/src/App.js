import React, { useState, useEffect } from "react";
import BFISurvey from "./bfiSurvey.js"; // Adjust path if necessary
import Simulation from "./simulation.js";
import PostTaskSurvey from "./endingSurvey.js";
import { getAuth, signInAnonymously } from "firebase/auth";
import { addSurveyResponse, addID } from "./functions.js"; // Import Firestore utility

const App = () => {
  const [isSurveyComplete, setIsSurveyComplete] = useState(false);
  const [assignedGroup, setAssignedGroup] = useState(null);
  const [isSimulationComplete, setIsSimulationComplete] = useState(false);
  const [isPostTaskSurveyComplete, setIsPostTaskSurveyComplete] = useState(false);
  const [participantData, setParticipantData] = useState({});

  useEffect(() => {
    // Anonymous sign-in during component initialization
    const auth = getAuth();
    signInAnonymously(auth)
      .then(() => {
        console.log("Signed in anonymously");
      })
      .catch((error) => {
        console.error("Error signing in anonymously:", error);
      });
  }, []); // Run once when the app initializes

  // Randomize group assignment for all three factors
  const assignGroup = () => {
    const explanation = Math.random() < 0.5; // True = XAI, False = Plain Interface
    const peerInfluence = Math.random() < 0.5; // True = Peer Influence Present, False = Absent
    const personalityFeedback = Math.random() < 0.5; // True = Feedback Present, False = Absent

    return {
      explanation,
      peerInfluence,
      personalityFeedback,
      
    };
  };


  // Handle survey completion
  const handleSurveyCompletion = (surveyData) => {
    console.log("Survey completed. Data:", surveyData);

    // Assign randomized group
    const group = assignGroup();
    setAssignedGroup(group);

    // Log the assigned group
    console.log("Assigned group:", group);
    setParticipantData((prev) => ({ ...prev, surveyData, group }));
    // Mark the survey as complete
    setIsSurveyComplete(true);
  };

  const handleSimulationCompletion = (simulationData) => {
    console.log("Simulation completed. Data:", simulationData);
    setParticipantData((prev) => ({ ...prev, simulationData }));
    setIsSimulationComplete(true);
  };

  const handleEndingSurveyCompletion = async (accuracy, attentionCheck, studentID) => {
    const finalData = {
      ...participantData,
      postSurveyData: {
        accuracy,
        attentionCheck,
      },
    };
    //console.log("Post-Task Survey completed. Data:", postSurveyData);
    // Save to Firestore
    await addSurveyResponse(finalData)
    if(studentID){
      await addID({ studentID: studentID.trim() });
    }
    setIsPostTaskSurveyComplete(true); // Mark the post-task survey as complete
  }

  return (
    <div>
      <h1>AP Research Experiment</h1>
      {!isSurveyComplete && (
        <BFISurvey onComplete={handleSurveyCompletion} />
      )}
      {isSurveyComplete && !isSimulationComplete && (
        <Simulation group={assignedGroup} onComplete={handleSimulationCompletion} />
      )}
      {isSurveyComplete && isSimulationComplete && !isPostTaskSurveyComplete && (
        <PostTaskSurvey onComplete={handleEndingSurveyCompletion} />
      )}
      {isSurveyComplete && isSimulationComplete && isPostTaskSurveyComplete && (
        <div>
          <h2>Thank you for participating in the experiment!</h2>
          <p>Your responses have been recorded.</p>
        </div>
      )}
    </div>
  );
};

export default App;
