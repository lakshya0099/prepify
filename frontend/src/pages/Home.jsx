// src/pages/Home.jsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Sun, Moon } from "lucide-react";
import { useEffect, useState } from "react";
import { useTheme } from "@/context/ThemeContext";

function Home() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-br from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 transition-colors">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        <Card className="shadow-2xl rounded-2xl border dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-800 dark:text-white">
          <CardHeader className="text-center relative">
            <CardTitle className="text-4xl text-blue-700 dark:text-blue-400 font-extrabold tracking-tight">
              Prepify
            </CardTitle>
            <button
              onClick={toggleTheme}
              className="absolute top-2 right-2 p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition"
              aria-label="Toggle Theme"
            >
              {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
            </button>
          </CardHeader>
          <CardContent className="space-y-6 text-center">
            <p className="text-gray-600 dark:text-gray-300 text-lg">
              Elevate your prep with <span className="font-semibold text-blue-600 dark:text-blue-300">Prepify</span> — an AI-powered platform delivering tailored interview questions by domain and difficulty.
            </p>
            <Button asChild className="w-full text-lg">
              <a href="/setup">Start Your Preparation</a>
            </Button>
          </CardContent>
        </Card>
        <footer className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
          © 2025 Prepify. All rights reserved.
        </footer>
      </motion.div>
    </div>
  );
}

export default Home;
