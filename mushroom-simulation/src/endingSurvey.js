import React, { useState } from "react";
import { shuffle } from "./functions.js";

const endingQuestions = [
    {
      id: 1,
      text: "What did a percentage of 77.5% displayed for one of the mushroom species edibility mean?",
      options: [
        "That the AI is accurate in 77.5% of all recommendations",
        "That the AI is 77.5% confident that it is a edible mushroom",
        "That 77.5% of users trust the decision of the AI",
        "That the AI was able to recognize and classify 77.5% of the image components"
      ],
      correctAnswer: "That the AI is 77.5% confident that it is a edible mushroom",
    },
    {
      id: 2,
      text: "If the AI makes a mistake in the identification of mushrooms, it is probably NOT due to...",
      options: [
        "very little available data",
        "poor image quality",
        "a lot of characteristics overlapping with other species",
        "a poor internet connection"
      ],
      correctAnswer: "a poor internet connection",
    },
    {
      id: 3,
      text: "When the AI classified a mushroom image into a certain category, this was achieved through...",
      options: [
        "the recognition of certain patterns in the image via a previosuly learned model based on an image database",
        "direct comparisons of each image from an image database with the original image",
        "comparing the original image with a 3D model of a typical mushroom from each category, digitally recreated by a designer",
        "an abstract model carefully self programmed by a team of programmers, which specifically scans individual image components"
      ],
      correctAnswer: "the recognition of certain patterns in the image via a previosuly learned model based on an image database",
    },
    {
      id: 4,
      text: "Sometimes, it is difficult, even for specialists, to understand how exactly a mushroom image is assigned to a specific edibility criteria. What is the reason for this?",
      options: [
        "Because most specialists are not sufficiently trained to be able to understand the AI that is presented here",
        "Because there is no possibility to display important information the way the AI is constructed",
        "The decision depends on a difficult-to-manage amount of data and partly complex models",
        "The decision usually depends on many random influences that are not identifiable"
      ],
      correctAnswer: "The decision depends on a difficult-to-manage amount of data and partly complex models",
    },
    {
      id: 5,
      text: "The information displayed was based on an AI model. This question tests your attention. Please simply select 'With a probability of 87%'",
      options: [
        "With a probability of less than 30%",
        "The AI is 100% certain",
        "No reasonable statemnt of probability can be given",
        "With a probability of 87%"
      ],
      correctAnswer: "With a probability of 87%",
    }
  ];
  shuffle(endingQuestions);
  

const PostTaskSurvey = ({onComplete}) => {
    const [responses, setResponses] = useState({});
    const [studentID, setStudentID] = useState("");
    const [isFlorczak, setIsFlorczak] = useState(null);
  
    const handleOptionChange = (questionId, value) => {
      setResponses((prev) => ({ ...prev, [questionId]: value }));
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      console.log("Post-Task Survey Responses:", responses);
      console.log("Student ID:", studentID);

      const unansweredQuestions = endingQuestions.filter((q) => !responses[q.id]);
      if (unansweredQuestions.length > 0 || isFlorczak == null) {
        alert("Please answer all questions before submitting.");
        return;
      }
  
      if (isFlorczak === true) {
        const trimmedID = studentID.trim();
        if (!trimmedID || isNaN(trimmedID)) {
          alert("Please enter a valid numeric ID.");
          return;
        }
      }

      let correctAns=0;
      let attentionCheck=false;
      endingQuestions.forEach((q) => {
        if (responses[q.id] === q.correctAnswer) {
          if (q.id === 5) {
            attentionCheck = true; // Attention check question
          } else {
            correctAns += 1; // Other questions
          }
        }
      });
      const accuracy = correctAns / (endingQuestions.length - 1);
      console.log(accuracy)
      console.log(attentionCheck)
      
      try {
        alert(`Survey submitted successfully!`);
        onComplete(accuracy, attentionCheck, studentID.trim())
      } catch (error) {
        console.error("Error during submission:", error);
      }
    };
  
    return (
        <form onSubmit={handleSubmit}>
          {endingQuestions.map((q) => (
            <div key={q.id} style={{ marginBottom: "20px" }}>
              <p>{q.text}</p>
              {q.options.map((option, index) => (
                <div key={index}>
                  <label>
                    <input
                      type="radio"
                      name={`question-${q.id}`}
                      value={option}
                      onChange={() => handleOptionChange(q.id, option)}
                    />
                    {option}
                  </label>
                </div>
              ))}
            </div>
          ))}

          {/* Senior Question */}
          <div style={{ marginTop: "20px" }}>
            <label>Are you in Mr.Florczak's class?</label>
            <label>
              <input
                type="radio"
                name="senior"
                value="yes"
                onChange={() => setIsFlorczak(true)}
              />
              Yes
            </label>
            <label>
              <input
                type="radio"
                name="senior"
                value="no"
                onChange={() => setIsFlorczak(false)}
              />
              No
            </label>
          </div>

          {/* Student ID Field - Only visible if senior */}
          {isFlorczak === true && (
            <div style={{ marginTop: "20px" }}>
              <label>
                Enter your ID number for extra credit (the survey is still anonymous, IDs are stored in a different database and aren't associated
                with responses):
                <input
                  type="text"
                  value={studentID}
                  onChange={(e) => setStudentID(e.target.value)}
                  style={{ marginLeft: "10px" }}
                />
              </label>
            </div>
          )}

          <button type="submit" style={{ padding: "10px 20px", cursor: "pointer" }}>
            Submit
          </button>
        </form>
      );
}    
export default PostTaskSurvey;