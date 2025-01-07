import React, { useState } from "react";
import { shuffle } from "./functions.js";

const bfiQuestions = [
  { id: 1, text: "I see myself as someone who is talkative", trait: "Extraversion", reverseScoring: false },
  { id: 2, text: "I see myself as someone who generates a lot of enthusiasm", trait: "Extraversion", reverseScoring: false },
  { id: 3, text: "I see myself as someone who is full of energy", trait: "Extraversion", reverseScoring: false },
  { id: 4, text: "I see myself as someone who is outgoing, sociable", trait: "Extraversion", reverseScoring: false },
  { id: 5, text: "I see myself as someone who is helpful and unselfish with others", trait: "Agreeableness", reverseScoring: false },
  { id: 6, text: "I see myself as someone who has a forgiving nature", trait: "Agreeableness", reverseScoring: false },
  { id: 7, text: "I see myself as someone who is generally trusting", trait: "Agreeableness", reverseScoring: false },
  { id: 8, text: "I see myself as someone who is considerate and kind to almost everyone", trait: "Agreeableness", reverseScoring: false },
  { id: 9, text: "I see myself as someone who does a thorough job", trait: "Conscientiousness", reverseScoring: false },
  { id: 10, text: "I see myself as someone who can be somewhat careless", trait: "Conscientiousness", reverseScoring: true },
  { id: 11, text: "I see myself as someone who is a reliable worker", trait: "Conscientiousness", reverseScoring: false },
  { id: 12, text: "I see myself as someone who tends to be disorganized", trait: "Conscientiousness", reverseScoring: true },
  { id: 13, text: "I see myself as someone who is depressed, blue", trait: "Neuroticism", reverseScoring: false },
  { id: 14, text: "I see myself as someone who can be tense", trait: "Neuroticism", reverseScoring: false },
  { id: 15, text: "I see myself as someone who worries a lot", trait: "Neuroticism", reverseScoring: false },
  { id: 16, text: "I see myself as someone who can be moody", trait: "Neuroticism", reverseScoring: false },
  { id: 17, text: "I see myself as someone who is original, comes up with new ideas", trait: "Openness", reverseScoring: false },
  { id: 18, text: "I see myself as someone who is curious about many different things", trait: "Openness", reverseScoring: false },
  { id: 19, text: "I see myself as someone who has an active imagination", trait: "Openness", reverseScoring: false },
  { id: 20, text: "I see myself as someone who values artistic, aesthetic experiences", trait: "Openness", reverseScoring: false }

];
shuffle(bfiQuestions)

const Instructions = ({ onContinue }) => {
    return (
      <div>
        <h2>Instructions</h2>
        <p>
          Thank you for participating in my AP Research experiment. To start things off, please 
          fill out the personality questionnaire on the following screen truthfully. All data will remain anonymous.
          After completing the questionnaire, you will be taken to another screen with further questions.
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

const BFISurvey = ({onComplete}) => {
    const [responses, setResponses] = useState({});
    const [showInstructions, setShowInstructions] = useState(true);
  
    const handleChange = (id, value) => {
      setResponses((prev) => ({ ...prev, [id]: value }));
    };
  
    const calculatePersonality = () => {
      const traitScores = {
        Extraversion: 0,
        Agreeableness: 0,
        Conscientiousness: 0,
        Neuroticism: 0,
        Openness: 0,
      };
  
      Object.keys(responses).forEach((id) => {
        const trait = bfiQuestions[parseInt(id, 10) - 1].trait;
        if(bfiQuestions[parseInt(id, 10) - 1].reverseScoring){
            traitScores[trait] += parseInt(6-responses[id], 10);
        } else traitScores[trait] += parseInt(responses[id], 10);
        
      });
  
      return traitScores;
    };
  
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent page reload
        const traitScores = calculatePersonality();
        const dominantTrait = Object.keys(traitScores).reduce((a, b) => traitScores[a] > traitScores[b] ? a : b
        );
        const unansweredQuestions = bfiQuestions.filter((q) => !responses[q.id]);
        if (unansweredQuestions.length > 0) {
            alert("Please answer all questions before submitting.");
            return;
        }
      
        console.log("Submitting responses...");
        console.log("Responses:", responses);
        console.log("Trait Scores:", traitScores);
        console.log("Dominant Trait:", dominantTrait);
      
        try {
          alert(`Personality test submitted successfully!`);
        } catch (error) {
          console.error("Error during submission:", error);
        }
        onComplete({traitScores }); // Pass data to parent
      };

      const scaleLabels = [
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
        <form onSubmit={handleSubmit}>
          {bfiQuestions.map((question) => (
            <div key={question.id} style={{ marginBottom: "20px" }}>
              <p>{question.text}</p>
              <div style={{ display: "flex", justifyContent: "center", gap: "180px" }}>
                {scaleLabels.map((label, index) => (
                  <label key={`q${question.id}-option${index}`} style={{ textAlign: "center" }}>
                    <div>{label}</div>
                    <input
                      type="radio"
                      name={`question-${question.id}`}
                      value={index + 1}
                      checked={responses[question.id] === index + 1}
                      onChange={() => handleChange(question.id, index + 1)}
                    />
                  </label>
                ))}
              </div>
            </div>
          ))}
          <button
            type="submit"
            style={{
              padding: "10px 20px",
              cursor: "pointer",
              marginTop: "20px",
            }}
          >
            Submit
          </button>
        </form>
      );
};
  
  export default BFISurvey;