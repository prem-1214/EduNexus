import React, { useEffect, useState } from "react";
import axios from "axios";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const categories = ["C", "Java", "Python", "HTML", "CSS"];

const QuizPage = () => {
  const [quiz, setQuiz] = useState([]);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(30);
  const [isFinished, setIsFinished] = useState(false);
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchQuiz = async (topic) => {
    setLoading(true);
    setIsFinished(false);
    setCurrent(0);
    setScore(0);
    setTimer(30);
    try {
      const response = await axios.post("http://localhost:11434/api/generate", {
        model: "llama3.2",
        prompt: `Create a JSON quiz with 5 random multiple-choice questions on the topic "${topic}". Each object should have a 'question', 4 'options', and a correct 'answer'. Return only a valid JSON array.`,
        stream: false,
      });
      const raw = response.data.response;
      const parsed = JSON.parse(raw);
      setQuiz(parsed);
    } catch (err) {
      console.error("Error generating quiz:", err);
      setQuiz([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!isFinished && timer > 0 && quiz.length > 0) {
      const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
      return () => clearInterval(interval);
    }

    if (timer === 0 && !isFinished) handleNext();
  }, [timer, isFinished, quiz]);

  const handleOption = (opt) => setSelected(opt);

  const handleNext = () => {
    if (!quiz[current]) return;
    const correct = quiz[current].answer;
    if (selected === correct) setScore((prev) => prev + 1);

    if (current < quiz.length - 1) {
      setCurrent((prev) => prev + 1);
      setSelected(null);
      setTimer(30);
    } else {
      setIsFinished(true);
    }
  };

  if (!category) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center space-y-6 bg-[#FAFAFA] px-4">
        <h2 className="text-2xl font-bold text-[#1E1E7E]">🧠 Choose a Quiz Category</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {categories.map((cat) => (
            <Button
              key={cat}
              onClick={() => {
                setCategory(cat);
                fetchQuiz(cat);
              }}
              className="bg-[#1FAA59] hover:bg-green-600 text-white rounded-2xl px-6 py-3 text-lg"
            >
              {cat}
            </Button>
          ))}
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="text-center mt-20 text-lg text-primary font-medium">🤖 Generating your {category} quiz…</div>
    );
  }

  if (isFinished) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-[#FAFAFA]">
        <Card className="glassmorphic p-10 max-w-xl">
          <h2 className="text-3xl font-semibold text-[#1E1E7E] mb-4">🎉 Quiz Completed!</h2>
          <p className="text-lg text-[#1FAA59]">You scored {score} out of {quiz.length}</p>
          <div className="flex gap-4 mt-6">
            <Button onClick={() => fetchQuiz(category)}>Retry {category}</Button>
            <Button variant="outline" onClick={() => {
              setCategory(null);
              setQuiz([]);
            }}>Back to Categories</Button>
          </div>
        </Card>
      </div>
    );
  }

  const question = quiz[current];

  return (
    <div className="min-h-screen bg-[#FAFAFA] px-4 py-10 flex justify-center">
      <Card className="glassmorphic p-8 w-full max-w-3xl shadow-2xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-[#1E1E7E]">{category} Quiz — Question {current + 1} of {quiz.length}</h2>
          <div className="text-[#1FAA59] text-sm">⏱ {timer}s</div>
        </div>
        <Progress value={((current + 1) / quiz.length) * 100} className="mb-6" />

        <CardContent className="space-y-6">
          <h3 className="text-lg font-medium text-[#374151]">{question?.question}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {question?.options.map((opt, i) => (
              <Button
                key={i}
                variant={selected === opt ? "default" : "outline"}
                onClick={() => handleOption(opt)}
                className={`w-full ${selected === opt ? "bg-[#1FAA59] text-white" : "text-[#1E1E7E]"}`}
              >
                {opt}
              </Button>
            ))}
          </div>
          <Button
            className="w-full mt-4 bg-[#1E1E7E] text-white hover:bg-[#15154f]"
            onClick={handleNext}
            disabled={!selected}
          >
            {current === quiz.length - 1 ? "Finish" : "Next"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default QuizPage;
