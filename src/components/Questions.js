import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "./Loader";

function Questions({
  questions,

  setSelectedAnswers,
  selectedAnswers,
  loading,
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentQuestion = questions[currentIndex] || {};
  const { correct_answer, incorrect_answers, question } = currentQuestion;
  const allanswers = correct_answer
    ? [...incorrect_answers, correct_answer].sort()
    : [];
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const [ending, setEnding] = useState(false);
  const [results, setResults] = useState(0);
  const [timeLeft, setTimeLeft] = useState(15);
  const { number } = useParams();
  const navigate = useNavigate();

  const audioRef = useRef(new Audio("/alert.mp3"));
  const [audioPlayed, setAudioPlayed] = useState(false);

  useEffect(() => {
    if (timeLeft > 0 && timeLeft < 7 && !audioPlayed) {
      audioRef.current.play();
      setAudioPlayed(true);
    }
    if (timeLeft === 0) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      handleNextQuestion();
    }

    const timer = setTimeout(() => {
      setTimeLeft((timeLeft) => (timeLeft > 0 ? timeLeft - 1 : 0));
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  }, [timeLeft, audioPlayed]);
  useEffect(() => {
    setTimeLeft(15);
    setAudioPlayed(false);
  }, [currentIndex]);
  function handleAnswerClick(index) {
    const newSelectedAnswer = allanswers[index];
    if (selectedAnswer === null) {
      setSelectedAnswer(index);
      setSelectedAnswers((prev) => {
        const updatedAnswers = [...prev];
        updatedAnswers[currentIndex] = {
          question,
          selected: newSelectedAnswer,
          correct: correct_answer,
        };
        return updatedAnswers;
      });
      if (allanswers[index] === correct_answer) {
        setResults((results) => results + 1);
      }
    }
  }

  function handleNextQuestion() {
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((currentIndex) => currentIndex + 1);
      setSelectedAnswer(null);
      setTimeLeft(10);
    } else {
      setEnding(true);
    }
  }
  const final = number / 2;

  return (
    <div className="questions">
      {ending ? (
        <>
          <h1 className="results">
            Your results:{results}/{number}
          </h1>
          {results > final ? (
            <h2 className="suggestion">That's my boy!!!Elite</h2>
          ) : (
            <h2 className="suggestion">Common you can improve your score</h2>
          )}
          <button
            className="see"
            onClick={() => navigate("/results", { state: { selectedAnswers } })}
          >
            See results
          </button>
          <button className="again" onClick={() => navigate("/")}>
            Take the quiz again
          </button>
        </>
      ) : (
        <>
          {loading ? (
            <Loader />
          ) : (
            <>
              <div className="timer">
                <h2>TimeLeft :{timeLeft}</h2>
              </div>
              <h1 className="apiqn">
                Q. {currentIndex + 1}) {question}
              </h1>
              <ul>
                {allanswers.map((el, i) => (
                  <li
                    key={i}
                    className={selectedAnswer === i ? "click" : ""}
                    onClick={() => handleAnswerClick(i)}
                  >
                    {el}
                  </li>
                ))}
              </ul>

              <button
                onClick={handleNextQuestion}
                className={selectedAnswer === null ? "current" : "next"}
                disabled={selectedAnswer === null ? true : false}
              >
                Next Question
              </button>
            </>
          )}
        </>
      )}
    </div>
  );
}

export default Questions;
