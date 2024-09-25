import { BrowserRouter, Routes, Route } from "react-router-dom";
import Body from "./components/Body";
import Questions from "./components/Questions";
import { useEffect, useState } from "react";

import Results from "./components/Results";

function decodeHtml(html) {
  const txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
}

function App() {
  const [questions, setQuestions] = useState([]);
  const [category, setCategory] = useState("");
  const [number, setNumber] = useState(5);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchQn = async (number, category) => {
    setLoading(true);
    const categoryParam = category === "Mixed" ? "" : `&category=${category}`;
    if (!category) return;

    const res = await fetch(
      `https://opentdb.com/api.php?amount=${number}${categoryParam}&type=multiple`
    );

    if (!res.ok) return;

    const data = await res.json();
    setLoading(false);
    console.log(data?.results);

    const decodedQuestions = data.results.map((qn) => ({
      ...qn,
      question: decodeHtml(qn.question),
      correct_answer: decodeHtml(qn.correct_answer),
      incorrect_answers: qn.incorrect_answers.map((ans) => decodeHtml(ans)),
    }));

    setQuestions(decodedQuestions);
  };

  useEffect(() => {
    fetchQn(number, category);
  }, [category, number]);

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Body
                questions={questions}
                setQuestions={setQuestions}
                setNumber={setNumber}
                number={number}
                category={category}
                setCategory={setCategory}
                fetchQn={fetchQn}
              />
            }
          />
          <Route
            path="/questions/:number"
            element={
              <Questions
                questions={questions}
                fetchQn={fetchQn}
                number={number}
                category={category}
                selectedAnswers={selectedAnswers}
                setSelectedAnswers={setSelectedAnswers}
                loading={loading}
              />
            }
          />
          <Route
            path="/results"
            element={
              <Results
                setSelectedAnswers={setSelectedAnswers}
                selectedAnswers={selectedAnswers}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
