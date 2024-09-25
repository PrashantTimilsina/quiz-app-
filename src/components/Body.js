import { useNavigate } from "react-router-dom";
function Body({ number, setNumber, category, setCategory, fetchQn }) {
  const navigate = useNavigate();
  function handleGoToQuiz() {
    navigate(`questions/${number}`);
  }
  return (
    <div className="main">
      <h2 className="title">
        WELCOME TO THE <span>QUIZ</span>
      </h2>
      <div className="first-section">
        <label htmlFor="options">
          Choose a category:
          <select
            id="options"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {category ? "" : <option value="">---Select an option---</option>}
            <option value="Mixed">Mixed</option>
            <option value="9">General Knowledge</option>
            <option value="11">Movies</option>
            <option value="18">Computer</option>
            <option value="19">Maths</option>
            <option value="21">Sports</option>
            <option value="22">Geography</option>
            <option value="23">History</option>
          </select>
        </label>
      </div>
      <div className="second-section">
        <label htmlFor="questions">
          No. of Questions:
          <select
            id="questions"
            value={number}
            onChange={(e) => setNumber(Number(e.target.value))}
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
            <option value="20">20</option>
          </select>
        </label>
      </div>
      <button
        onClick={handleGoToQuiz}
        className={category ? "goto" : ""}
        disabled={!category}
      >
        Go to Quiz
      </button>
    </div>
  );
}

export default Body;
