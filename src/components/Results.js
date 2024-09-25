import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function Results() {
  const { state } = useLocation();
  const { selectedAnswers } = state;
  const navigate = useNavigate();
  const [currentPosition, setCurrentPosition] = useState(0);
  const currentResult = selectedAnswers[currentPosition];
  const { question, correct, selected } = currentResult;

  function handleNext() {
    if (currentPosition < selectedAnswers.length - 1) {
      setCurrentPosition((prev) => prev + 1);
    }
  }

  function handlePrevious() {
    if (currentPosition > 0) {
      setCurrentPosition((prev) => prev - 1);
    }
  }

  return (
    <div className="results-container">
      <h1 className="results-title">Review Your Answers</h1>
      <div className="result-card">
        <p className="question-text">
          <strong>Question:</strong> {question}
        </p>
        <ul className="answer-list">
          <li
            className={`answer-item ${
              selected === correct ? "correct" : "incorrect"
            }`}
          >
            <strong>Your Answer:</strong> {selected}{" "}
            {selected === correct ? "✅" : "❌"}
          </li>

          {selected !== correct && (
            <li className="answer-item correct">
              <strong>Correct Answer:</strong> {correct} ✅
            </li>
          )}
        </ul>
      </div>
      <div className="navigation-buttons">
        <button
          onClick={handlePrevious}
          disabled={currentPosition === 0}
          className="nav-btn prev-btn"
        >
          Previous
        </button>
        <button
          onClick={handleNext}
          disabled={currentPosition === selectedAnswers.length - 1}
          className="nav-btn next-btn"
        >
          Next
        </button>
        <button onClick={() => navigate("/")} className="nav-btn again-btn">
          Take the quiz again
        </button>
      </div>
    </div>
  );
}

export default Results;
