import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function Confetti({ show, onComplete }) {
  const [pieces, setPieces] = useState([]);

  useEffect(() => {
    if (show) {
      const colors = [
        "#3b82f6",
        "#8b5cf6",
        "#10b981",
        "#f59e0b",
        "#ef4444",
        "#ec4899",
      ];

      const newPieces = [];

      for (let i = 0; i < 50; i++) {
        newPieces.push({
          id: i,
          x: Math.random() * 100,
          y: -10,
          color: colors[Math.floor(Math.random() * colors.length)],
          rotation: Math.random() * 360,
          size: Math.random() * 8 + 4,
        });
      }

      setPieces(newPieces);

      // Clean up after animation
      const timer = setTimeout(() => {
        setPieces([]);

        // Safe optional callback
        if (onComplete) onComplete();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [show, onComplete]);

  if (!show || pieces.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {pieces.map((piece) => (
        <motion.div
          key={piece.id}
          initial={{
            x: `${piece.x}vw`,
            y: "-10vh",
            rotate: piece.rotation,
            opacity: 1,
          }}
          animate={{
            y: "110vh",
            x: `${piece.x + (Math.random() - 0.5) * 30}vw`,
            rotate: piece.rotation + 720,
            opacity: [1, 1, 0.8, 0],
          }}
          transition={{
            duration: 2 + Math.random(),
            ease: "easeIn",
          }}
          style={{
            position: "absolute",
            width: piece.size,
            height: piece.size,
            backgroundColor: piece.color,
            borderRadius: Math.random() > 0.5 ? "50%" : "0",
          }}
        />
      ))}
    </div>
  );
}