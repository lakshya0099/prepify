import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

function Setup() {
  const sessionId = uuidv4();
  const [domain, setDomain] = useState("");
  const [questions, setQuestions] = useState(5);
  const [level, setLevel] = useState("easy");
  const [timer, setTimer] = useState(30);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!domain.trim()) return alert("Please select a domain.");
    if (questions < 1) return alert("Minimum 1 question required.");
    if (timer < 1) return alert("Timer must be at least 1 minute.");

    const formData = { domain, questions, level, timer, sessionId };
    navigate("/start", { state: formData });
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <Card className="w-[400px] shadow-xl">
        <CardHeader>
          <CardTitle className="text-center text-blue-600 text-2xl">Set Up Your Interview</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Domain Select */}
            <div>
              <Label>Select Domain</Label>
              <Select onValueChange={(value) => setDomain(value)}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Choose domain..." />
                </SelectTrigger>
                <SelectContent>
                  {[
                    "Java", "Python", "JavaScript", "C++", "Machine Learning", "Data Structures",
                    "Html", "CSS", "Networking", "Operating System", "System Design", "Algorithms", "Database Management"
                  ].map((d) => (
                    <SelectItem key={d} value={d}>{d}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Number of Questions */}
            <div>
              <Label htmlFor="questions">Number of Questions</Label>
              <Input
                id="questions"
                type="number"
                min="1"
                value={questions}
                onChange={(e) => setQuestions(e.target.value)}
              />
            </div>

            {/* Difficulty Level */}
            <div>
              <Label>Select Difficulty Level</Label>
              <Select onValueChange={(value) => setLevel(value)} defaultValue="easy">
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="easy">Easy</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="hard">Hard</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Timer */}
            <div>
              <Label htmlFor="timer">Timer (minutes)</Label>
              <Input
                id="timer"
                type="number"
                min="1"
                value={timer}
                onChange={(e) => setTimer(e.target.value)}
              />
            </div>

            <Button type="submit" className="w-full mt-4">
              Start Interview
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default Setup;
