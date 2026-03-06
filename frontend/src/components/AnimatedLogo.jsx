import { motion } from "framer-motion";
import { Link2 } from "lucide-react";

export function AnimatedLogo({ size = "md" }) {
  const sizes = {
    sm: "size-8",
    md: "size-12",
    lg: "size-16",
  };

  const iconSizes = {
    sm: "size-4",
    md: "size-6",
    lg: "size-8",
  };

  return (
    <motion.div
      className={`${sizes[size]} relative`}
      animate={{
        rotate: [0, 360],
      }}
      transition={{
        duration: 20,
        repeat: Infinity,
        ease: "linear",
      }}
    >
      {/* Outer glow ring */}
      <motion.div
        className="absolute inset-0 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 blur-md opacity-50"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.5, 0.7, 0.5],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Main logo */}
      <motion.div
        className="relative size-full bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg"
        whileHover={{ scale: 1.1 }}
        transition={{ type: "spring", stiffness: 400 }}
      >
        <Link2 className={`${iconSizes[size]} text-white`} />
      </motion.div>

      {/* Orbiting particles */}
      {[0, 120, 240].map((angle, i) => (
        <motion.div
          key={i}
          className="absolute size-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"
          animate={{
            rotate: [angle, angle + 360],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear",
            delay: i * 0.2,
          }}
          style={{
            top: "50%",
            left: "50%",
            marginTop: "-4px",
            marginLeft: "-4px",
          }}
        >
          <motion.div
            style={{
              transform: `translateX(${
                size === "lg"
                  ? "32px"
                  : size === "md"
                  ? "24px"
                  : "16px"
              })`,
            }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="size-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full shadow-lg"
          />
        </motion.div>
      ))}
    </motion.div>
  );
}