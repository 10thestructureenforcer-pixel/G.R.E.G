"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const quotes = [
  "Did you know? The US processes over 1 million green card applications annually 📊",
  "Immigration law dates back to 1790 with the Naturalization Act 📜",
  "The US has over 50 different types of non-immigrant visas available 🛂",
  "Family-based immigration accounts for 70% of all US immigration 👨‍👩‍👧‍👦",
  "The US Citizenship test includes 100 civics questions - we can help you prepare! 📚",
  "Employment-based green cards are limited to 140,000 per year 💼",
  "The US immigration system has over 500 different forms and documents 📋",
  "DACA recipients contribute over $42 billion to the US economy annually 💰",
  "Immigration courts handle over 1.2 million cases each year ⚖️",
  "The US has welcomed immigrants from over 200 countries worldwide 🌍",
  "Naturalization ceremonies are held in over 100 locations across the US 🎉",
  "Immigration lawyers handle over 2 million cases annually in the US 👨‍⚖️",
  "The US immigration system has over 1,000 pages of laws and regulations 📚",
  "Immigration contributes over $2 trillion to the US GDP each year 💹",
  "The US has over 11 million undocumented immigrants in the country 📊",
  "Immigration courts have a backlog of over 2 million cases ⏳",
  "The US issues over 10 million non-immigrant visas annually 🛂",
  "Immigration detention centers hold over 30,000 people daily 🏢",
  "The US has over 200 immigration detention facilities nationwide 📍",
  "Immigration enforcement costs over $25 billion annually 💰",
];

export default function AnimatedQuotes() {
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);

  useEffect(() => {
    const quoteInterval = setInterval(() => {
      setCurrentQuoteIndex((prevIndex) => (prevIndex + 1) % quotes.length);
    }, 3500);

    return () => clearInterval(quoteInterval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div className="text-center">
        <div className="text-center">
          <div className="relativeh-20 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentQuoteIndex}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{
                  duration: 0.3,
                  ease: "easeInOut",
                }}
                className=" w-full"
              >
                <p className="text-base">{quotes[currentQuoteIndex]}</p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
