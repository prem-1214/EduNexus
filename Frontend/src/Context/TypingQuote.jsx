import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  FaLightbulb,
  FaBook,
  FaGraduationCap,
  FaChalkboardTeacher,
  FaTrophy,
  FaLaptopCode,
  FaRocket,
  FaPencilAlt,
  FaBrain,
} from "react-icons/fa";

const quotes = [
  "Learning never exhausts the mind – Leonardo da Vinci",
  "Education is the passport to the future – Malcolm X",
  "Knowledge shared is knowledge squared.",
  "Your LMS, your launchpad to limitless learning.",
  "Empower. Educate. Elevate.",
  "Today a reader, tomorrow a leader – Margaret Fuller",
  "Education is not the filling of a pail, but the lighting of a fire – William Butler Yeats",
  "The beautiful thing about learning is that no one can take it away from you – B.B. King",
  "Teaching is the one profession that creates all other professions.",
  "In the middle of difficulty lies opportunity – Albert Einstein",
  "A person who never made a mistake never tried anything new – Albert Einstein",
  "The more that you read, the more things you will know. The more that you learn, the more places you'll go – Dr. Seuss",
  "Education is not preparation for life; education is life itself – John Dewey",
  "The only limit to our realization of tomorrow is our doubts of today – Franklin D. Roosevelt",
  "Success is the sum of small efforts, repeated day in and day out – Robert Collier",
  "What we learn with pleasure we never forget – Alfred Mercier",
  "The only way to do great work is to love what you do – Steve Jobs",
  "Don't watch the clock; do what it does. Keep going – Sam Levenson",
  "Life is 10% what happens to us and 90% how we react to it – Charles R. Swindoll",
  "Failure is not the opposite of success; it’s part of success.",
  "Tell me and I forget. Teach me and I remember. Involve me and I learn – Benjamin Franklin",
  "Knowledge is power. Information is liberating. Education is the premise of progress, in every society, in every family – Kofi Annan",
  "Education is the key to unlock the golden door of freedom – George Washington Carver",
  "A good teacher can inspire hope, ignite the imagination, and instill a love of learning – Brad Henry",
  "Learning is a treasure that will follow its owner everywhere – Chinese Proverb",
  "The roots of education are bitter, but the fruit is sweet – Aristotle",
  "I have no special talent. I am only passionately curious – Albert Einstein",
  "You can never be overdressed or overeducated – Oscar Wilde",
  "Don’t be afraid to give up the good to go for the great – John D. Rockefeller",
  "A journey of a thousand miles begins with a single step – Lao Tzu",
  "Life is a journey, and learning is the map that guides you.",
  "An investment in knowledge pays the best interest – Benjamin Franklin",
  "Without education, we are in a horrible and deadly danger of taking educated people seriously – G.K. Chesterton",
  "A teacher affects eternity; he can never tell where his influence stops – Henry Adams",
  "The secret of getting ahead is getting started – Mark Twain",
  "The mind is not a vessel to be filled, but a fire to be kindled – Plutarch",
];

const iconList = [
  FaLightbulb,
  FaBook,
  FaGraduationCap,
  FaChalkboardTeacher,
  FaTrophy,
  FaLaptopCode,
  FaRocket,
  FaPencilAlt,
  FaBrain,
];

const iconPositions = [
  { x: 80, y: 60 },
  { x: 160, y: -115 },
  { x: 300, y: 110 },
  { x: 350, y: -150 },
  { x: 20, y: -200 },
];

const TypingQuote = () => {
  const [displayText, setDisplayText] = useState("");
  const [currentQuote, setCurrentQuote] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [iconsVisible, setIconsVisible] = useState(false);
  const [randomIcons, setRandomIcons] = useState([]);

  useEffect(() => {
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    setCurrentQuote(randomQuote);
    setTimeout(() => setIsTyping(true), 1000);
  }, []);

  useEffect(() => {
    if (!isTyping || !currentQuote) return;

    let index = 0;
    const interval = setInterval(() => {
      setDisplayText(currentQuote.slice(0, index + 1));
      index++;
      if (index === currentQuote.length) {
        clearInterval(interval);
        setIsTyping(false);
        const shuffled = [...iconList].sort(() => 0.5 - Math.random());
        setRandomIcons(shuffled.slice(0, iconPositions.length));
        setIconsVisible(true);
      }
    }, 50);

    return () => clearInterval(interval);
  }, [isTyping, currentQuote]);

  return (
    <div className="relative flex flex-col justify-center items-center w-full h-full text-center overflow-hidden">
      <div className="max-w-xl z-10 p-4 relative">
        {!isTyping && displayText === "" ? (
          <h3 className="text-xl md:text-2xl font-semibold text-cyan-300 animate-pulse">
            Generating your AI Quote...
          </h3>
        ) : (
          <p className="text-lg md:text-xl font-medium text-gray-800 dark:text-gray-100 leading-relaxed break-words whitespace-pre-wrap">
            {displayText}
            {isTyping && <span className="blinking-cursor">|</span>}
          </p>
        )}

        {/* Animated Icons */}
        {iconsVisible &&
          iconPositions.map((pos, idx) => {
            const Icon = randomIcons[idx];
            return (
              <motion.div
                key={idx}
                initial={{ x: 0, y: 0, opacity: 0, scale: 0 }}
                animate={{
                  x: pos.x,
                  y: pos.y,
                  opacity: 1,
                  scale: 1,
                }}
                transition={{
                  type: "spring",
                  stiffness: 30,
                  damping: 12,
                  delay: 0.3 + idx * 0.1,
                }}
                className="absolute"
              >
                <motion.div
                  animate={{ y: [0, -5, 0, 5, 0] }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <Icon className="text-gray-800 dark:text-white w-6 h-6" />
                </motion.div>
              </motion.div>
            );
          })}
      </div>
    </div>
  );
};

export default TypingQuote;
