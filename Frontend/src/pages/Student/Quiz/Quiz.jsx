import axios from "axios";
import Lottie from "lottie-react";
import React, { useEffect, useState } from "react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { jsPDF } from "jspdf";
import robotAnimation from "../../../assets/robot-working.json";

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

const quizCategories = {
  Python: ["Variables", "Data Types", "Lists", "Loops", "Functions", "OOP", "Modules", "Error Handling"],
  Java: ["Variables", "OOP", "Inheritance", "Arrays", "Loops", "Exception Handling"],
  JavaScript: ["Variables", "Arrays", "Objects", "Functions", "Promises", "DOM", "ES6"],
  C: ["Pointers", "Loops", "Functions", "Arrays"],
  "C++": ["STL", "Classes", "Inheritance", "Pointers"],
  React: ["JSX", "Hooks", "State Management", "Routing"],
  HTML: ["Tags", "Forms", "Semantic HTML", "Canvas"],
  "Data Science": ["Pandas", "NumPy", "EDA", "Data Cleaning"],
  "Machine Learning": ["Supervised", "Unsupervised", "Overfitting", "Regression"],
  "Artificial Intelligence": ["Search", "Planning", "ML vs AI", "Expert Systems"],
  CyberSecurity: ["Encryption", "Networking", "Attacks", "Prevention"],
};

const QuizPage = () => {
  const [step, setStep] = useState(1);
  const [category, setCategory] = useState(null);
  const [availableSubtopics, setAvailableSubtopics] = useState([]);
  const [selectedSubtopics, setSelectedSubtopics] = useState([]);
  const [quiz, setQuiz] = useState([]);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(30);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [userAnswers, setUserAnswers] = useState([]);

  const fetchQuiz = async (prompt) => {
    setLoading(true);
    setError(false);
    try {
      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
        {
          contents: [
            {
              parts: [
                {
                  text: prompt,
                },
              ],
            },
          ],
        }
      );

      const raw = response.data.candidates?.[0]?.content?.parts?.[0]?.text || "";
      console.log("Gemini raw response:", raw);

      const parsed = extractJSON(raw);
      setQuiz(parsed);
      setStep(3);
    } catch (err) {
      console.error("Error generating quiz:", err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const extractJSON = (text) => {
    const start = text.indexOf("[");
    const end = text.lastIndexOf("]");
    if (start === -1 || end === -1) throw new Error("No JSON array boundaries");
    const json = text.substring(start, end + 1);
    return JSON.parse(json);
  };

  const handleCategorySelect = (cat) => {
    setCategory(cat);
    setAvailableSubtopics(quizCategories[cat]);
    setSelectedSubtopics([]);
    setStep(2);
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(14);
    doc.text(`${category} Quiz - Solutions`, 20, 20);

    let y = 30;
    quiz.forEach((q, i) => {
      doc.text(`${i + 1}. ${q.question}`, 10, y);
      y += 8;
      doc.text(`Correct Answer: ${q.answer}`, 12, y);
      y += 8;
      doc.text(`Explanation: ${q.explanation || "N/A"}`, 12, y);
      y += 12;

      if (y > 270) {
        doc.addPage();
        y = 20;
      }
    });

    doc.save(`${category}_quiz_solutions.pdf`);
  };

  const handleNext = () => {
    if (!quiz[current]) return;
    const correct = quiz[current].answer;
    if (selected === correct) setScore((prev) => prev + 1);

    if (current < quiz.length - 1) {
      setCurrent((prev) => prev + 1);
      setSelected(null);
      setTimer(30);
    } else {
      setStep(4);
    }
  };

  useEffect(() => {
    if (step === 3 && timer > 0 && quiz.length > 0) {
      const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
      return () => clearInterval(interval);
    }
    if (timer === 0 && step === 3) handleNext();
  }, [timer, step, quiz]);

  useEffect(() => {
    if (quiz.length > 0) {
      setUserAnswers(Array(quiz.length).fill(null));
    }
  }, [quiz]);

  const getPrompt = () => {
    return `
Generate exactly 10 multiple-choice questions on "${category}".
${
  selectedSubtopics.length
    ? `Only use these subtopics: ${selectedSubtopics.join(", ")}.`
    : ""
}

Each question must be a JSON object with:
{
  "question": "string",
  "options": ["A", "B", "C", "D"],
  "answer": "Correct option (must match one from options)",
  "explanation": "A brief explanation for the correct answer"
}

Return ONLY a JSON array of these 10 questions. 
DO NOT include any extra text, comments, or formatting.
`;
  };

  // Step 1: Choose Category
  if (step === 1) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4 space-y-6 bg-[#FAFAFA] dark:bg-[#0F172A]">
        <h2 className="text-2xl font-bold dark:text-green-400 text-[#1E1E7E]">
          🧠 Choose a Quiz Category
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {Object.keys(quizCategories).map((cat) => (
            <Button
              key={cat}
              onClick={() => handleCategorySelect(cat)}
              className="rounded-xl bg-[#1FAA59] hover:bg-[#16A34A] text-white"
            >
              {cat}
            </Button>
          ))}
        </div>
      </div>
    );
  }

  // Step 2: Choose Subtopics
  if (step === 2) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-[#FAFAFA] dark:bg-[#0F172A]">
        {loading ? (
          <div className="flex flex-col items-center justify-center min-h-screen space-y-3">
            <p className="text-2xl font-medium dark:text-white text-gray-800">
              🤖 Generating your quiz...
            </p>
            <Lottie
              animationData={robotAnimation}
              loop={true}
              className="w-89 h-89"
            />
          </div>
        ) : error ? (
          <div className="flex items-center justify-center min-h-screen">
            <p className="text-lg text-red-500 dark:text-red-300">
              ⚠️ Oops, something went wrong! Please try again.
            </p>
            <div className="flex gap-4 mt-4">
              <Button
                onClick={() => fetchQuiz(getPrompt())}
                variant="outline"
                className="text-blue-500 dark:text-blue-300"
              >
                🔄 Retry
              </Button>
              <Button
                variant="outline"
                onClick={() => setStep(1)}
                className="text-blue-500 dark:text-blue-300"
              >
                🔙 Back to Categories
              </Button>
            </div>
          </div>
        ) : (
          <>
            <h2 className="text-xl font-semibold mb-4 dark:text-green-400 text-[#1E1E7E]">
              🔍 Choose subtopics in {category}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
              {availableSubtopics.map((topic) => (
                <label
                  key={topic}
                  className="flex items-center gap-2 dark:text-white text-gray-800"
                >
                  <input
                    type="checkbox"
                    value={topic}
                    checked={selectedSubtopics.includes(topic)}
                    onChange={(e) => {
                      const value = e.target.value;
                      setSelectedSubtopics((prev) =>
                        e.target.checked
                          ? [...prev, value]
                          : prev.filter((t) => t !== value)
                      );
                    }}
                  />
                  {topic}
                </label>
              ))}
            </div>
            <div className="flex flex-wrap gap-4">
              <Button
                onClick={() => fetchQuiz(getPrompt())}
                disabled={selectedSubtopics.length === 0 || loading}
                className="bg-[#1FAA59] hover:bg-[#16A34A] text-white"
              >
                {loading
                  ? "Please wait, generating your quiz..."
                  : "🧪 Generate Quiz"}
              </Button>
              <Button
                variant="outline"
                onClick={() => setStep(1)}
                className="text-blue-500 dark:text-blue-300"
              >
                🔙 Back to Categories
              </Button>
            </div>
          </>
        )}
      </div>
    );
  }

  // Step 3: Quiz
  if (step === 3) {
    const question = quiz[current];
    return (
      <div className="min-h-screen py-10 px-4 flex justify-center bg-[#FAFAFA] dark:bg-[#0F172A]">
        <Card className="p-8 max-w-3xl w-full dark:bg-[#1E293B] bg-white border border-[#E5E7EB] dark:border-[#334155]">
          <div className="flex justify-between mb-4">
            <h2 className="text-lg font-semibold dark:text-green-400 text-[#1E1E7E]">
              {category} — Q{current + 1}/{quiz.length}
            </h2>
            <span className="text-green-600">⏱ {timer}s</span>
          </div>
          <Progress
            value={((current + 1) / quiz.length) * 100}
            className="mb-6"
          />
          <CardContent className="space-y-6">
            <h3 className="text-lg font-medium dark:text-white text-gray-800">
              {question.question}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {question.options.map((opt, i) => {
                let classes = "w-full";
                if (selected) {
                  if (opt === question.answer) {
                    classes += " bg-green-600 text-white";
                  } else if (opt === selected && selected !== question.answer) {
                    classes += " bg-red-500 text-white";
                  } else {
                    classes += " dark:text-white text-gray-800";
                  }
                } else {
                  classes += " dark:text-white text-gray-800";
                }

                return (
                  <Button
                    key={i}
                    onClick={() => {
                      setSelected(opt);
                      const newAnswers = [...userAnswers];
                      newAnswers[current] = opt;
                      setUserAnswers(newAnswers);
                    }}
                    className={classes}
                    disabled={!!selected}
                  >
                    {opt}
                  </Button>
                );
              })}
            </div>
            <Button
              className="w-full bg-[#1E1E7E] hover:bg-[#3742fa] text-white"
              onClick={handleNext}
              disabled={!selected}
            >
              {current === quiz.length - 1 ? "Finish" : "Next"}
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Step 4: Results
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-10 bg-[#FAFAFA] dark:bg-[#0F172A]">
      <Card className="p-10 max-w-2xl dark:bg-[#1E293B] bg-white border border-[#E5E7EB] dark:border-[#334155]">
        <h2 className="text-2xl font-semibold mb-2 dark:text-green-400 text-[#1E1E7E]">
          🎉 Quiz Completed!
        </h2>
        <p className="text-lg text-[#1FAA59]">
          You scored {score} / {quiz.length}
        </p>
        <div className="my-6 space-y-4">
          {quiz.map((q, i) => {
            const correctAnswer =
              typeof q.answer === "number" ? q.options[q.answer] : q.answer;
            const userAnswer =
              typeof userAnswers[i] === "number"
                ? q.options[userAnswers[i]]
                : userAnswers[i];
            const isCorrect = userAnswer === correctAnswer;
            return (
              <div
                key={i}
                className="bg-white dark:bg-[#2D3748] p-4 rounded-lg shadow"
              >
                <p className="font-medium dark:text-white text-gray-800">
                  {i + 1}. {q.question}
                </p>
                <p
                  className={`text-sm ${
                    isCorrect ? "text-green-600" : "text-red-500"
                  }`}
                >
                  🧠 Your Answer: {userAnswer || "Not answered"}
                </p>
                {!isCorrect && (
                  <p className="text-sm text-green-600">
                    ✅ Correct Answer: {correctAnswer}
                  </p>
                )}
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  💡Explanation: {q.explanation || "No explanation"}
                </p>
              </div>
            );
          })}
        </div>
        <div className="flex flex-wrap gap-4 justify-center mt-6">
          <Button
            onClick={() => fetchQuiz(getPrompt())}
            className="bg-[#1FAA59] hover:bg-[#16A34A] text-white"
          >
            Retry
          </Button>
          <Button
            variant="outline"
            onClick={() => setStep(1)}
            className="text-blue-500 dark:text-blue-300"
          >
            Back to Categories
          </Button>
          <Button
            className="bg-[#1FAA59] hover:bg-[#16A34A] text-white"
            onClick={generatePDF}
          >
            📄 Download PDF
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default QuizPage;
