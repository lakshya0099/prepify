import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTheme } from "../context/ThemeContext"; // ✅ Corrected: import context directly
import {
  Settings,
  Play,
  Clock,
  Hash,
  Target,
  BookOpen,
  Moon,
  Sun,
} from "lucide-react";

const domains = [
  "Custom","Java", "Python", "JavaScript", "C++", "Machine Learning",
  "Data Structures", "HTML/CSS", "Networking", "Operating Systems",
  "System Design", "Algorithms", "Database Management",
];

const difficultyColors = {
  easy: "text-emerald-600 dark:text-emerald-400",
  medium: "text-amber-600 dark:text-amber-400",
  hard: "text-red-600 dark:text-red-400",
};

function Setup() {
  const { theme, toggleTheme } = useTheme();
  const sessionId = uuidv4();
  const [domain, setDomain] = useState("");
  const [customDomain, setCustomDomain] = useState(""); // ✅ custom domain state
  const [questions, setQuestions] = useState(5);
  const [level, setLevel] = useState("easy");
  const [timer, setTimer] = useState(30);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const finalDomain = domain === "Custom" ? customDomain : domain;
    if (!finalDomain.trim()) return;
    navigate("/start", {
      state: {
        domain: finalDomain,
        questions: Number(questions),
        level,
        timer: Number(timer),
        sessionId,
      },
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100 dark:from-slate-900 dark:via-gray-900 dark:to-slate-950 flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Interview Setup
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Configure your technical interview session
          </p>
        </motion.div>

        {/* Setup Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
        >
          <Card className="backdrop-blur-sm bg-white/95 dark:bg-gray-900/95 shadow-xl border-0 ring-1 ring-gray-200 dark:ring-gray-800">
            <CardHeader className="pb-6">
              <CardTitle className="text-xl font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                <Target className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                Configuration
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Domain */}
                <div className="space-y-3">
                  <Label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                    <BookOpen className="w-4 h-4" />
                    Domain
                  </Label>
                  <Select onValueChange={setDomain}>
                    <SelectTrigger className="h-12 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                      <SelectValue placeholder="Choose your technical domain" />
                    </SelectTrigger>
                    <SelectContent>
                      {domains.map((d) => (
                        <SelectItem key={d} value={d}>
                          {d}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  {domain === "Custom" && (
                    <Input
                      type="text"
                      value={customDomain}
                      onChange={(e) => setCustomDomain(e.target.value)}
                      placeholder="Enter your custom domain"
                      className="h-12 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                    />
                  )}
                </div>

                {/* Questions & Timer */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <Label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                      <Hash className="w-4 h-4" />
                      Questions
                    </Label>
                    <Input
                      type="number"
                      min="1"
                      max="20"
                      value={questions}
                      onChange={(e) => setQuestions(e.target.value)}
                    />
                  </div>
                  <div className="space-y-3">
                    <Label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                      <Clock className="w-4 h-4" />
                      Duration (min)
                    </Label>
                    <Input
                      type="number"
                      min="1"
                      value={timer}
                      onChange={(e) => setTimer(e.target.value)}
                    />
                  </div>
                </div>

                {/* Difficulty */}
                <div className="space-y-3">
                  <Label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                    <Target className="w-4 h-4" />
                    Difficulty Level
                  </Label>
                  <Select onValueChange={setLevel} defaultValue="easy">
                    <SelectTrigger className="h-12 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="easy">
                        <span className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-emerald-500"></div> Easy
                        </span>
                      </SelectItem>
                      <SelectItem value="medium">
                        <span className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-amber-500"></div> Medium
                        </span>
                      </SelectItem>
                      <SelectItem value="hard">
                        <span className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-red-500"></div> Hard
                        </span>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Summary */}
                <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
                  <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Session Summary
                  </h3>
                  <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                    <p><strong>Domain:</strong> {domain === "Custom" ? customDomain || "Not entered" : domain || "Not selected"}</p>
                    <p><strong>Questions:</strong> {questions}</p>
                    <p><strong>Duration:</strong> {timer} minutes</p>
                    <p><strong>Difficulty:</strong> <span className={`${difficultyColors[level]} capitalize ml-1`}>{level}</span></p>
                  </div>
                </div>

                {/* Submit */}
                <Button
                  type="submit"
                  disabled={!domain || (domain === "Custom" && !customDomain.trim())}
                  className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <Play className="w-5 h-5" />
                  Begin Interview
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}

export default Setup;
