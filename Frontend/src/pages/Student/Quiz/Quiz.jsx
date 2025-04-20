import React, { useEffect, useState } from "react"
import axios from "axios"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { jsPDF } from "jspdf"

const categories = [
  "C",
  "C++",
  "Java",
  "Python",
  "JavaScript",
  "HTML",
  "React",
  "Data Science",
  "Artificial Intelligence",
  "Machine Learning",
  "Cybersecurity",
]

const QuizPage = () => {
  const [quiz, setQuiz] = useState([])
  const [current, setCurrent] = useState(0)
  const [selected, setSelected] = useState(null)
  const [score, setScore] = useState(0)
  const [timer, setTimer] = useState(30)
  const [isFinished, setIsFinished] = useState(false)
  const [category, setCategory] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  const fetchQuiz = async (topic) => {
    setLoading(true)
    setError(false)
    setIsFinished(false)
    setCurrent(0)
    setScore(0)
    setTimer(30)
    try {
      const response = await axios.post("http://localhost:11434/api/generate", {
        model: "llama3.2",
        prompt: `Return ONLY a valid JSON array (no markdown, no explanation, no wrapping text) of exactly 10 multiple-choice questions on "${topic}". Each question object must include:
        {
          "question": "...",
          "options": ["...", "...", "...", "..."],
          "answer": "...",
          "explanation": "..."
        }
        Make sure all quotes are double quotes. END the response immediately after the array.`,
        stream: false,
      })

      const raw = response.data.response
      const match = raw.match(/\[\s*{[\s\S]*?}\s*\]/)
      if (!match) throw new Error("No valid JSON array found.")
      const parsed = JSON.parse(match[0])
      setQuiz(parsed)
    } catch (err) {
      console.error("Error generating quiz:", err)
      setQuiz([])
      setError(true)
    } finally {
      setLoading(false)
    }
  }
  const generatePDF = () => {
    const doc = new jsPDF()
    doc.setFontSize(14)
    doc.text(`${category} Quiz - Solutions`, 20, 20)

    let y = 30
    quiz.forEach((q, i) => {
      doc.text(`${i + 1}. ${q.question}`, 10, y)
      y += 8
      doc.text(`Correct Answer: ${q.answer}`, 12, y)
      y += 8
      doc.text(`Explanation: ${q.explanation || "N/A"}`, 12, y)
      y += 12

      if (y > 270) {
        doc.addPage()
        y = 20
      }
    })

    doc.save(`${category}_quiz_solutions.pdf`)
  }

  useEffect(() => {
    if (!isFinished && timer > 0 && quiz.length > 0) {
      const interval = setInterval(() => setTimer((prev) => prev - 1), 1000)
      return () => clearInterval(interval)
    }

    if (timer === 0 && !isFinished) handleNext()
  }, [timer, isFinished, quiz])

  const handleOption = (opt) => {
    setSelected(opt)
  }

  const handleNext = () => {
    if (!quiz[current]) return
    const correct = quiz[current].answer
    if (selected === correct) setScore((prev) => prev + 1)

    if (current < quiz.length - 1) {
      setCurrent((prev) => prev + 1)
      setSelected(null)
      setTimer(30)
    } else {
      setIsFinished(true)
    }
  }

  if (!category) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center space-y-6 bg-[#FAFAFA] dark:bg-[#0B1120] px-4">
        <h2 className="text-2xl font-bold text-[#1E1E7E] dark:text-white">
          🧠 Choose a Quiz Category
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {categories.map((cat) => (
            <Button
              key={cat}
              onClick={() => {
                setCategory(cat)
                fetchQuiz(cat)
              }}
              className="bg-[#1FAA59] hover:bg-green-600 text-white rounded-2xl px-6 py-3 text-lg min-w-[140px]"
            >
              {cat}
            </Button>
          ))}
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="text-center mt-20 text-lg text-primary font-medium dark:text-white">
        🤖 Generating your {category} quiz…
      </div>
    )
  }

  if (error || (category && quiz.length === 0)) {
    return (
      <div className="text-center mt-20 space-y-4">
        <p className="text-red-600 font-semibold">
          ⚠️ Failed to generate quiz.
        </p>
        <Button
          onClick={() => fetchQuiz(category)}
          className="bg-[#1FAA59] hover:bg-green-600 text-white"
        >
          Retry {category}
        </Button>
        <Button
          variant="outline"
          onClick={() => {
            setCategory(null)
            setQuiz([])
            setError(false)
          }}
        >
          Back to Categories
        </Button>
      </div>
    )
  }

  if (isFinished) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#FAFAFA] dark:bg-[#0B1120] px-4">
        <Card className="glassmorphic p-10 max-w-xl dark:bg-slate-800">
          <h2 className="text-3xl font-semibold text-[#1E1E7E] dark:text-white mb-4">
            🎉 Quiz Completed!
          </h2>
          <p className="text-lg text-[#1FAA59]">
            You scored {score} out of {quiz.length}
          </p>
          <div className="my-6 space-y-4">
            {quiz.map((q, i) => (
              <div key={i} className="bg-white dark:bg-slate-700 p-4 rounded-lg shadow">
                <p className="font-medium text-[#1E1E7E] dark:text-white">
                  {i + 1}. {q.question}
                </p>
                <p className="text-sm mt-1 text-green-600">
                  ✅ Correct Answer: {q.answer}
                </p>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  💡 Explanation: {q.explanation || "Not available"}
                </p>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap gap-4 justify-center mt-6">
            <Button onClick={() => fetchQuiz(category)}>Retry {category}</Button>
            <Button
              variant="outline"
              onClick={() => {
                setCategory(null)
                setQuiz([])
              }}
            >
              Back to Categories
            </Button>
            <Button
              className="bg-[#1FAA59] hover:bg-green-700 text-white"
              onClick={generatePDF}
            >
              Download Solution PDF
            </Button>
          </div>
        </Card>
      </div>
    )
  }

  const question = quiz[current]

  return (
    <div className="min-h-screen bg-[#FAFAFA] dark:bg-[#0B1120] px-4 py-10 flex justify-center">
      <Card className="glassmorphic p-8 w-full max-w-3xl shadow-2xl dark:bg-slate-800">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-[#1E1E7E] dark:text-white">
            {category} Quiz — Question {current + 1} of {quiz.length}
          </h2>
          <div className="text-[#1FAA59] text-sm">⏱ {timer}s</div>
        </div>
        <Progress
          value={((current + 1) / quiz.length) * 100}
          className="mb-6"
        />

        <CardContent className="space-y-6">
          <h3 className="text-lg font-medium text-[#374151] dark:text-gray-300">
            {question?.question}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {question?.options.map((opt, i) => {
              let btnClass = "w-full"
              if (selected) {
                if (opt === question.answer) {
                  btnClass += " bg-green-600 text-white"
                } else if (opt === selected && selected !== question.answer) {
                  btnClass += " bg-red-500 text-white"
                } else {
                  btnClass += " text-[#1E1E7E] dark:text-white"
                }
              } else {
                btnClass += " text-[#1E1E7E] dark:text-white"
              }

              return (
                <Button
                  key={i}
                  variant={selected === opt ? "default" : "outline"}
                  onClick={() => handleOption(opt)}
                  className={btnClass}
                  disabled={!!selected}
                >
                  {opt}
                </Button>
              )
            })}
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
  )
}

export default QuizPage
