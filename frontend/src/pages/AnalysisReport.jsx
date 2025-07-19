import React, { useEffect, useState } from 'react';
import { FileText, TrendingUp, Award, AlertCircle, Moon, Sun } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';

function AnalysisReport() {
  const { theme, toggleTheme } = useTheme(); // ✅ use toggleTheme
  const [report, setReport] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const sessionId = localStorage.getItem("sessionId");

  useEffect(() => {
    if (!sessionId) {
      setError("Session ID is missing!");
      setLoading(false);
      return;
    }

    const fetchReport = async () => {
      try {
        setLoading(true);
        setError(null);

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
        setLoading(false);

      } catch (error) {
        console.error("Failed to fetch analysis report:", error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchReport();
  }, [sessionId]);

  const getScoreColor = (percentage) => {
    if (percentage >= 90) return 'text-emerald-600 dark:text-emerald-400';
    if (percentage >= 80) return 'text-blue-600 dark:text-blue-400';
    if (percentage >= 70) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
  };

  const getScoreIcon = (percentage) => {
    if (percentage >= 80) return <Award className="w-5 h-5 text-amber-500" />;
    return <TrendingUp className="w-5 h-5 text-blue-500" />;
  };

  const renderThemeToggleButton = () => (
    <button
      onClick={toggleTheme}
      className="fixed top-4 right-4 bg-slate-200 dark:bg-gray-700 p-2 rounded-full shadow-md hover:scale-105 transition"
      title="Toggle Theme"
    >
      {theme === 'dark' ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-gray-800" />}
    </button>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-gray-950 flex items-center justify-center">
        {renderThemeToggleButton()}
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-slate-600 dark:text-slate-300 text-lg">Loading your analysis report...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-gray-950 flex items-center justify-center">
        {renderThemeToggleButton()}
        <div className="max-w-md mx-auto bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8 text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-slate-800 dark:text-white mb-2">Error Loading Report</h3>
          <p className="text-slate-600 dark:text-slate-400">{error}</p>
        </div>
      </div>
    );
  }

  if (!report || report.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-gray-950 flex items-center justify-center">
        {renderThemeToggleButton()}
        <div className="max-w-md mx-auto bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8 text-center">
          <FileText className="w-16 h-16 text-slate-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-slate-800 dark:text-white mb-2">No Reports Found</h3>
          <p className="text-slate-600 dark:text-slate-400">No analysis report found for this session.</p>
        </div>
      </div>
    );
  }

  const totalQuestions = report.reduce((sum, item) => sum + item.totalQuestions, 0);
  const totalCorrect = report.reduce((sum, item) => sum + item.correctAnswers, 0);
  const overallPercentage = totalQuestions > 0 ? Math.round((totalCorrect / totalQuestions) * 100) : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-gray-950 py-12 px-4 text-slate-800 dark:text-slate-100">
      {renderThemeToggleButton()}
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-6">
            <FileText className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold mb-4">Performance Analysis Report</h1>
          <p className="text-lg text-slate-600 dark:text-slate-300">Comprehensive overview of your assessment results</p>
        </div>

        {/* Overall Summary */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-8 mb-8 border border-slate-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            <TrendingUp className="w-6 h-6 text-blue-600 dark:text-blue-400 mr-3" />
            Overall Performance Summary
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-slate-50 dark:bg-gray-800 rounded-xl">
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">{totalCorrect}</div>
              <div className="text-slate-600 dark:text-slate-300">Total Correct</div>
            </div>
            <div className="text-center p-6 bg-slate-50 dark:bg-gray-800 rounded-xl">
              <div className="text-3xl font-bold text-slate-700 dark:text-white mb-2">{totalQuestions}</div>
              <div className="text-slate-600 dark:text-slate-300">Total Questions</div>
            </div>
            <div className="text-center p-6 bg-slate-50 dark:bg-gray-800 rounded-xl">
              <div className={`text-3xl font-bold mb-2 ${getScoreColor(overallPercentage)}`}>
                {overallPercentage}%
              </div>
              <div className="text-slate-600 dark:text-slate-300">Overall Score</div>
            </div>
          </div>
        </div>

        {/* Individual Reports */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold mb-6">Detailed Assessment Results</h2>
          {report.map((userReport, index) => (
            <div key={index} className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-8 border border-slate-200 dark:border-gray-700">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  {getScoreIcon(userReport.scorePercentage)}
                  <h3 className="text-xl font-semibold ml-3">
                    {userReport.subject || `Assessment ${index + 1}`}
                  </h3>
                </div>
                <div className="text-sm text-slate-500 dark:text-slate-400">
                  {userReport.completedAt && new Date(userReport.completedAt).toLocaleDateString()}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-4 bg-emerald-50 dark:bg-emerald-900/30 rounded-lg border border-emerald-200 dark:border-emerald-400/30">
                  <div className="text-sm font-medium text-emerald-700 dark:text-emerald-300">Correct Answers</div>
                  <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">{userReport.correctAnswers}</div>
                </div>
                <div className="p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg border border-blue-200 dark:border-blue-400/30">
                  <div className="text-sm font-medium text-blue-700 dark:text-blue-300">Total Questions</div>
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{userReport.totalQuestions}</div>
                </div>
                <div className="p-4 bg-slate-50 dark:bg-gray-800 rounded-lg border border-slate-200 dark:border-slate-600">
                  <div className="text-sm font-medium text-slate-700 dark:text-slate-300">Score Percentage</div>
                  <div className={`text-2xl font-bold ${getScoreColor(userReport.scorePercentage)}`}>
                    {userReport.scorePercentage}%
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mt-6">
                <div className="flex justify-between text-sm text-slate-600 dark:text-slate-400 mb-2">
                  <span>Progress</span>
                  <span>{userReport.scorePercentage}%</span>
                </div>
                <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-500 ${
                      userReport.scorePercentage >= 80 ? 'bg-emerald-500' :
                      userReport.scorePercentage >= 70 ? 'bg-yellow-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${userReport.scorePercentage}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="text-center mt-12 text-slate-500 dark:text-slate-400">
          <p>Report generated on {new Date().toLocaleDateString()}</p>
        </div>
      </div>
    </div>
  );
}

export default AnalysisReport;
