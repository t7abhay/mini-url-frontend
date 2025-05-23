import { Link } from "react-router-dom";
import { facts } from "../utils/facts";
import { useAuth } from "../hooks/useAuth";
import { useMemo } from "react";

export default function HomePage() {
  const { user } = useAuth();

  function getRandomFacts(array, count) {
    const shuffled = [...array].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }

  const bubbleFacts = useMemo(() => getRandomFacts(facts, 10), []);

  return (
    <div className="relative w-full min-h-screen overflow-hidden bg-gradient-to-b from-gray-900 to-black flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-4xl font-bold text-white z-10">Minuri</h1>
      <h2 className="text-2xl text-white mt-2 z-10">
        One of the best URL shorteners
      </h2>

      <Link
        to={user ? "/dashboard" : "/register"}
        className="z-10 mt-8 px-6 py-3 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 transition-all shadow-lg"
      >
        {user ? "Back to Dashboard" : "Get Started"}
      </Link>

      <div className="absolute inset-0">
        {bubbleFacts.map((fact, index) => (
          <div
            key={`${fact}-${index}`}
            className="bubble text-white text-xs sm:text-sm md:text-base"
            style={{
              left: `${Math.random() * 85 + 5}%`,
              animationDuration: `${6 + Math.random() * 10}s`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          >
            {fact}
          </div>
        ))}
      </div>
    </div>
  );
}
