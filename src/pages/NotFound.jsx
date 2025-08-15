import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const NotFoundPage = () => {
  const [countdown, setCountdown] = useState(3);
  const [showRedirect, setShowRedirect] = useState(false);

  useEffect(() => {
    // Start countdown after 2 seconds
    const startTimer = setTimeout(() => {
      setShowRedirect(true);
    }, 2000);

    return () => clearTimeout(startTimer);
  }, []);

  useEffect(() => {
    if (showRedirect && countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(prev => prev - 1);
      }, 1000);

      return () => clearTimeout(timer);
    } else if (countdown === 0) {
      // Redirect to home page
      window.location.href = '/';
    }
  }, [countdown, showRedirect]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const floatingVariants = {
    animate: {
      y: [-10, 10, -10],
      rotate: [-2, 2, -2],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const glowVariants = {
    animate: {
      boxShadow: [
        "0 0 20px rgba(168, 85, 247, 0.4)",
        "0 0 40px rgba(168, 85, 247, 0.6)",
        "0 0 20px rgba(168, 85, 247, 0.4)"
      ],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-purple-600 flex items-center justify-center overflow-hidden relative">
      {/* Animated background shapes */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-white bg-opacity-5 rounded-full"
            style={{
              width: Math.random() * 100 + 50,
              height: Math.random() * 100 + 50,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              x: [0, Math.random() * 100 - 50],
              y: [0, Math.random() * 100 - 50],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      <motion.div
        className="text-center z-10 px-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* 3D 404 Text */}
        <motion.div
          className="relative mb-8"
          variants={floatingVariants}
          animate="animate"
        >
          <motion.h1
            className="text-6xl sm:text-8xl md:text-9xl lg:text-[12rem] font-black text-white relative"
            style={{
              textShadow: `
                4px 4px 0px rgba(168, 85, 247, 0.8),
                8px 8px 0px rgba(147, 51, 234, 0.6),
                12px 12px 0px rgba(126, 34, 206, 0.4),
                16px 16px 20px rgba(0, 0, 0, 0.3)
              `,
              transform: 'rotateX(20deg) rotateY(-10deg)',
              transformStyle: 'preserve-3d'
            }}
            variants={itemVariants}
            whileHover={{ 
              scale: 1.05,
              rotateY: 5,
              transition: { duration: 0.3 }
            }}
          >
            404
          </motion.h1>
          
          {/* Glowing effect behind text */}
          <motion.div
            className="absolute inset-0 text-6xl sm:text-8xl md:text-9xl lg:text-[12rem] font-black text-purple-400 opacity-20 blur-sm"
            variants={glowVariants}
            animate="animate"
            style={{
              transform: 'rotateX(20deg) rotateY(-10deg) translateZ(-10px)',
            }}
          >
            404
          </motion.div>
        </motion.div>

        {/* Page Not Found Text */}
        <motion.div
          variants={itemVariants}
          className="mb-8"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
            Oops! Page Not Found
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-purple-200 max-w-sm sm:max-w-md mx-auto px-4 sm:px-0">
            Looks like this page took a wrong turn in cyberspace.
          </p>
        </motion.div>

        {/* 3D Card with redirect info */}
        <motion.div
          variants={itemVariants}
          className="bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl p-4 sm:p-6 md:p-8 border border-white border-opacity-20 shadow-2xl transform mx-4 sm:mx-0"
          style={{
            transform: 'rotateX(10deg)',
            transformStyle: 'preserve-3d'
          }}
          whileHover={{
            transform: 'rotateX(5deg) translateY(-5px)',
            transition: { duration: 0.3 }
          }}
        >
          <AnimatePresence mode="wait">
            {!showRedirect ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center justify-center space-x-3"
              >
                <motion.div
                  className="w-6 h-6 border-2 border-white border-t-transparent rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
                <span className="text-white text-sm sm:text-base md:text-lg">Preparing redirect...</span>
              </motion.div>
            ) : (
              <motion.div
                key="countdown"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center"
              >
                <p className="text-white text-sm sm:text-base md:text-lg mb-4">
                  Redirecting you to home page in...
                </p>
                <motion.div
                  className="text-4xl sm:text-5xl md:text-6xl font-black text-white"
                  key={countdown}
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 1.5, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  style={{
                    textShadow: `
                      2px 2px 0px rgba(168, 85, 247, 0.8),
                      4px 4px 0px rgba(147, 51, 234, 0.6),
                      6px 6px 10px rgba(0, 0, 0, 0.3)
                    `
                  }}
                >
                  {countdown}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Manual redirect button */}
        <motion.div
          variants={itemVariants}
          className="mt-8"
        >
          <motion.button
            onClick={() => window.location.href = '/'}
            className="bg-white text-purple-800 px-6 sm:px-8 py-2 sm:py-3 rounded-full font-semibold text-base sm:text-lg shadow-lg transform transition-all duration-300"
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 10px 25px rgba(168, 85, 247, 0.3)",
              y: -2
            }}
            whileTap={{ scale: 0.95 }}
            style={{
              boxShadow: '0 8px 20px rgba(0, 0, 0, 0.2)'
            }}
          >
            Take Me Home Now
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Floating particles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute w-1 h-1 bg-white rounded-full opacity-60"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -100, 0],
            opacity: [0.6, 0, 0.6],
          }}
          transition={{
            duration: Math.random() * 3 + 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}
    </div>
  );
};

export default NotFoundPage;