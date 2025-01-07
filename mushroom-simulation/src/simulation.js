import React, { useState, useEffect } from "react";
import { shuffle } from "./functions.js"

const mushrooms = [
  {
    id: 1,
    image: "/images/mushroom1.png",
    explanationImage: "/images/explanation1.png", 
    aiProbabilities: { edible: 16.17, poisonous: 83.83 },
    actual: "poisonous"
  },
  {
    id: 2,
    image: "/images/mushroom2.png",
    explanationImage: "/images/explanation2.png",
    aiProbabilities: { edible: 2.57, poisonous: 97.43 },
    actual: "poisonous"
  },
  {
    id: 3,
    image: "/images/mushroom3.png",
    explanationImage: "/images/explanation3.png",
    aiProbabilities: { edible: 4.55, poisonous: 95.45 },
    actual: "edible"
  },
  {
    id: 4,
    image: "/images/mushroom4.png",
    explanationImage: "/images/explanation4.png",
    aiProbabilities: { edible: 33.44, poisonous: 66.56 },
    actual: "poisonous"
  },
  {
    id: 5,
    image: "/images/mushroom5.png",
    explanationImage: "/images/explanation5.png",
    aiProbabilities: { edible: 56.07, poisonous: 43.93 },
    actual: "edible"
  },
  {
    id: 6,
    image: "/images/mushroom6.png",
    explanationImage: "/images/explanation6.png",
    aiProbabilities: { edible: 40.49, poisonous: 59.51 },
    actual: "poisonous"
  },
  {
    id: 7,
    image: "/images/mushroom7.png",
    explanationImage: "/images/explanation7.png",
    aiProbabilities: { edible: 82.41, poisonous: 17.59 },
    actual: "edible"
  },
  {
    id: 8,
    image: "/images/mushroom8.png",
    explanationImage: "/images/explanation8.png",
    aiProbabilities: { edible: 55.8, poisonous: 44.2 },
    actual: "poisonous"
  },
  {
    id: 9,
    image: "/images/mushroom9.png",
    explanationImage: "/images/explanation9.png",
    aiProbabilities: { edible: 28.51, poisonous: 71.49 },
    actual: "edible"
  },
  {
    id: 10,
    image: "/images/mushroom10.png",
    explanationImage: "/images/explanation10.png",
    aiProbabilities: { edible: 34.86, poisonous: 65.14 },
    actual: "poisonous"
  },
  {
    id: 11,
    image: "/images/mushroom11.png",
    explanationImage: "/images/explanation11.png",
    aiProbabilities: { edible: 49.54, poisonous: 50.46 },
    actual: "edible"
  },
  {
    id: 12,
    image: "/images/mushroom12.png",
    explanationImage: "/images/explanation12.png",
    aiProbabilities: { edible: 6.92, poisonous: 93.08 },
    actual: "poisonous"
  },
  {
    id: 13,
    image: "/images/mushroom13.png",
    explanationImage: "/images/explanation13.png",
    aiProbabilities: { edible: 12.43, poisonous: 87.57 },
    actual: "edible"
  },
  {
    id: 14,
    image: "/images/mushroom14.png",
    explanationImage: "/images/explanation14.png",
    aiProbabilities: { edible: 21.17, poisonous: 78.83 },
    actual: "poisonous"
  },
  {
    id: 15,
    image: "/images/mushroom15.png",
    explanationImage: "/images/explanation15.png",
    aiProbabilities: { edible: 85.46, poisonous: 14.54 },
    actual: "edible"
  },
  
];

shuffle(mushrooms)

const Instructions = ({ onContinue }) => {
    return (
      <div>
        <h2>Instructions Part 2</h2>
        <p>
          Welcome to the mushroom picking simulation. On each screen, you will be presented a picture of a mushroom.
          You will have to decide whether it is edible or poisonous. You will also have to decide
          whether you would take home the mushroom to cook and eat if this was a real-life scenario.
          On the screen, you will recieve recommendations from an actual AI model trained to classify mushrooms as well as any
          other relevant information. This doesn't neccesarily mean that the AI model is always correct.
          Please read everything on the screen carefully before making your decisions.
        </p>
        <button
          onClick={onContinue}
          style={{
            padding: "10px 20px",
            cursor: "pointer",
            marginTop: "20px",
          }}
        >
          Continue
        </button>
      </div>
    );
  };

const Simulation = ({ group, onComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [responses, setResponses] = useState([]);
  const [classification, setClassification] = useState(null);
  const [takeHome, setTakeHome] = useState(null);
  const [trust, setTrust] = useState(null);
  const [understand, setUnderstand] = useState(null);
  const [showInstructions, setShowInstructions] = useState(true);
  const [startTime, setStartTime] = useState(null); // Tracks the start time


  useEffect(() => {
    // Log the assigned group to the console
    console.log("Assigned Group:", group);
  
    // Set the start time when the component renders
    setStartTime(Date.now());
  
    // Cleanup function in case the component unmounts
    return () => {
      setStartTime(null); // Clear the timer when the component unmounts
    };
  }, [group]); // Depend on 'group' so it updates if the group changes

  const currentMushroom = mushrooms[currentIndex];

  const handleNext = () => {
    if (classification === null || takeHome === null || trust == null || understand == null) {
      alert("Please answer all questions before proceeding.");
      return;
    }
    const currentTime = Date.now();
    const timeSpent = (currentTime - startTime) / 1000;

    // Record response
    const currentResponse = {
        classification,
        takeHome,
        trust,
        understand,
        timeSpent,
        actual: currentMushroom.actual
    };

    // If it's the last mushroom, add the current response and call onComplete
    if (currentIndex === mushrooms.length - 1) {
        const finalResponses = [...responses, currentResponse]; // Include the last response
        console.log("Simulation complete", finalResponses);
        onComplete(finalResponses); // Pass all responses to the parent component
        return;
    }

    // Otherwise, update state and proceed to the next mushroom
    setResponses((prev) => [...prev, currentResponse]);
    setClassification(null);
    setTakeHome(null);
    setTrust(null);
    setUnderstand(null);
    setStartTime(Date.now());
    setCurrentIndex(currentIndex + 1);
    
  };

  const getDynamicElements = () => {
    const elements = [];

    

    // Add peer influence statement if applicable
    if (group.peerInfluence) {
      elements.push(
        <p key="peer-influence">
           A majority of your peers decided to {' '}
          {currentMushroom.aiProbabilities.edible > 50 ? "take this mushroom home" : "not take this mushroom home"}.
        </p>
      );
    }

    // Add personality feedback statement if applicable
    if (group.personalityFeedback) {
      elements.push(
        <p key="personality-feedback">
          Based on your personality test, you should look carefully before making
          your decision.
        </p>
      );
    }

    return elements;
  };
  const confidenceLabels = [
    "Strongly Disagree",
    "Disagree",
    "Neutral",
    "Agree",
    "Strongly Agree",
  ];
  if (showInstructions) {
    return <Instructions onContinue={() => setShowInstructions(false)} />;
  }

  return (
    <div>
      <h2>
        Mushroom {currentIndex + 1} of {mushrooms.length}
      </h2>
  
      {/* Image Section */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "20px",
          margin: "20px 0",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <img
            src={currentMushroom.image}
            alt="Mushroom"
            style={{
              maxWidth: "100%",
              height: "auto",
            }}
          />
          <p>Mushroom Image</p>
        </div>
        {group.explanation && (
          <div style={{ textAlign: "center" }}>
            <img
              src={currentMushroom.explanationImage}
              alt="Explanation"
              style={{
                maxWidth: "100%",
                height: "auto",
              }}
            />
            <p>A visualization of where the AI is focusing its attention </p>
          </div>
        )}
      </div>
  
      {/* AI Recommendation */}
      <p>
        AI Recommendation: Edible: {currentMushroom.aiProbabilities.edible}%,
        Poisonous: {currentMushroom.aiProbabilities.poisonous}%.
      </p>
  
      {/* Dynamic Elements */}
      {getDynamicElements()}
  
      {/* Classification Buttons */}
      <div>
        <h3>How would you classify this mushroom?</h3>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-start",
            gap: "20px", // Add spacing between buttons
          }}
        >
          <button
            onClick={() => setClassification("edible")}
            disabled={classification === "edible"}
            style={{
              padding: "10px 20px",
              cursor: "pointer",
            }}
          >
            Edible
          </button>
          <button
            onClick={() => setClassification("poisonous")}
            disabled={classification === "poisonous"}
            style={{
              padding: "10px 20px",
              cursor: "pointer",
            }}
          >
            Poisonous
          </button>
        </div>
      </div>
  
      {/* Take Home Decision Buttons */}
      <div>
        <h3>Would you take this mushroom home?</h3>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-start",
            gap: "20px", // Add spacing between buttons
          }}
        >
          <button
            onClick={() => setTakeHome(true)}
            disabled={takeHome === true}
            style={{
              padding: "10px 20px",
              cursor: "pointer",
            }}
          >
            Take Home
          </button>
          <button
            onClick={() => setTakeHome(false)}
            disabled={takeHome === false}
            style={{
              padding: "10px 20px",
              cursor: "pointer",
            }}
          >
            Leave
          </button>
        </div>
      </div>
  
      {/* Trust in AI */}
      <div>
        <h3>I trust this mushroom identification by the AI:</h3>
        <div style={{ display: "flex", justifyContent: "center", gap: "180px" }}>
          {confidenceLabels.map((label, index) => (
            <label key={`trust-${index}`} style={{ textAlign: "center" }}>
              <div>{label}</div>
              <input
                type="radio"
                name="confidence"
                value={index + 1}
                checked={trust === index + 1}
                onChange={() => setTrust(index + 1)}
              />
            </label>
          ))}
        </div>
      </div>
  
      {/* Understanding of AI */}
      <div>
        <h3>I understand how the AI arrives at this mushroom classification:</h3>
        <div style={{ display: "flex", justifyContent: "center", gap: "180px" }}>
          {confidenceLabels.map((label, index) => (
            <label key={`understand-${index}`} style={{ textAlign: "center" }}>
              <div>{label}</div>
              <input
                type="radio"
                name="trust"
                value={index + 1}
                checked={understand === index + 1}
                onChange={() => setUnderstand(index + 1)}
              />
            </label>
          ))}
        </div>
      </div>
  
      {/* Next Button */}
      <button
        onClick={handleNext}
        style={{
          padding: "10px 20px",
          cursor: "pointer",
          marginTop: "20px",
        }}
      >
        Next
      </button>
    </div>
  );
  
  
};

export default Simulation;
