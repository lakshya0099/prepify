import React, { useEffect, useState } from 'react';

function AnalysisReport() {
  const [report, setReport] = useState([]);
  const [loading, setLoading] = useState(true);
  const sessionId = localStorage.getItem('sessionId'); // ✅ Retrieve sessionId

  useEffect(() => {
    if (!sessionId) {
      console.error("Session ID is missing!");
      return;
    }

    const fetchReport = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/analysis", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ sessionId }),
        });

        if (!response.ok) {
          throw new Error('Failed to fetch analysis report');
        }

        const data = await response.json();
        setReport(data.analysisReport);
      } catch (error) {
        console.error("Failed to fetch analysis report:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReport();
  }, [sessionId]);

  if (loading) {
    return <div className="text-center mt-10">Loading report...</div>;
  }

  if (!report || report.length === 0) {
    return <div className="text-center mt-10">No analysis report found for this session.</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
      <h2 className="text-3xl font-bold text-blue-600 mb-6">Analysis Report</h2>
      {report.map((userReport, index) => (
        <div key={index} className="mb-6 p-4 border-b border-gray-200">
          <p className="text-lg">Correct Answers: <span className="font-bold">{userReport.correctAnswers}</span></p>
          <p className="text-lg">Total Questions: <span className="font-bold">{userReport.totalQuestions}</span></p>
          <p className="text-lg">Score Percentage: <span className="font-bold">{userReport.scorePercentage}%</span></p>
        </div>
      ))}
    </div>
  );
}

export default AnalysisReport;
