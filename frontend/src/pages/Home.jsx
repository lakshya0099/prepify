// src/pages/Home.jsx
import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext'; // Import the theme context
import { ChevronRight, Sparkles, Shield, Zap, Users, TrendingUp, Award, ArrowRight, Globe, Star } from 'lucide-react';

function Home() {
  const { theme } = useTheme(); // Use the shared theme context - no need for toggleTheme here since navbar handles it
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const features = [
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: "AI-Powered Intelligence",
      description: "Advanced algorithms tailored to your career trajectory"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Enterprise Security",
      description: "Bank-level encryption protecting your professional data"
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Real-Time Adaptation",
      description: "Dynamic difficulty adjustment based on performance"
    }
  ];

  const stats = [
    { value: "500K+", label: "Professionals Trained" },
    { value: "95%", label: "Success Rate" },
    { value: "Fortune 500", label: "Companies Trust Us" }
  ];

  return (
    <div className={`min-h-screen transition-all duration-700 ${
      theme === 'dark' 
        ? 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900' 
        : 'bg-gradient-to-br from-slate-50 via-white to-slate-100'
    }`}>
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className={`absolute -top-40 -right-40 w-80 h-80 rounded-full opacity-20 ${
            theme === 'dark' ? 'bg-gradient-to-br from-blue-500 to-purple-600' : 'bg-gradient-to-br from-blue-400 to-purple-500'
          } blur-3xl`}></div>
          <div className={`absolute -bottom-40 -left-40 w-80 h-80 rounded-full opacity-20 ${
            theme === 'dark' ? 'bg-gradient-to-br from-purple-500 to-pink-600' : 'bg-gradient-to-br from-purple-400 to-pink-500'
          } blur-3xl`}></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
          <div className="text-center">
            {/* Badge */}
            <div className={`inline-flex items-center px-4 py-2 rounded-full mb-8 ${
              theme === 'dark' 
                ? 'bg-slate-800/60 border border-slate-700 text-slate-300' 
                : 'bg-white/60 border border-slate-200 text-slate-600'
            } backdrop-blur-sm transition-all duration-300 transform ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}>
              <Award className="w-4 h-4 mr-2 text-amber-500" />
              <span className="text-sm font-medium">Trusted by Fortune 500 Companies</span>
            </div>

            {/* Main Heading */}
            <h1 className={`text-5xl md:text-7xl font-bold mb-6 leading-tight transition-all duration-700 transform ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            } ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
              Master Your
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent block">
                Interview Success
              </span>
            </h1>

            {/* Subtitle */}
            <p className={`text-xl md:text-2xl mb-12 max-w-3xl mx-auto leading-relaxed transition-all duration-700 delay-200 transform ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            } ${theme === 'dark' ? 'text-slate-300' : 'text-slate-600'}`}>
              Enterprise-grade AI technology that transforms ambitious professionals into industry leaders through personalized interview preparation.
            </p>

            {/* CTA Buttons */}
            <div className={`flex flex-col sm:flex-row gap-4 justify-center items-center mb-16 transition-all duration-700 delay-300 transform ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
              <button className="group relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 flex items-center">
                <span className="relative z-10"><a href="setup">Begin Your Journey</a></span>
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
              

            </div>

            {/* Stats */}
            <div className={`grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto transition-all duration-700 delay-400 transform ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className={`text-3xl font-bold mb-2 ${
                    theme === 'dark' ? 'text-white' : 'text-slate-900'
                  }`}>
                    {stat.value}
                  </div>
                  <div className={`text-sm font-medium ${
                    theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
                  }`}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className={`py-20 ${
        theme === 'dark' ? 'bg-slate-800/50' : 'bg-slate-50/50'
      } backdrop-blur-sm`}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className={`text-4xl font-bold mb-4 ${
              theme === 'dark' ? 'text-white' : 'text-slate-900'
            }`}>
              Why Global Leaders Choose Prepify
            </h2>
            <p className={`text-xl ${
              theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
            }`}>
              Technology that adapts to your ambition
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className={`group p-8 rounded-2xl transition-all duration-300 hover:scale-105 ${
                theme === 'dark' 
                  ? 'bg-slate-900/60 border border-slate-700 hover:bg-slate-800/60' 
                  : 'bg-white/60 border border-slate-200 hover:bg-white shadow-lg hover:shadow-xl'
              } backdrop-blur-sm`}>
                <div className={`w-12 h-12 rounded-xl mb-6 flex items-center justify-center ${
                  theme === 'dark' 
                    ? 'bg-gradient-to-br from-blue-500 to-purple-600' 
                    : 'bg-gradient-to-br from-blue-600 to-purple-600'
                } text-white group-hover:scale-110 transition-transform duration-300`}>
                  {feature.icon}
                </div>
                <h3 className={`text-xl font-semibold mb-3 ${
                  theme === 'dark' ? 'text-white' : 'text-slate-900'
                }`}>
                  {feature.title}
                </h3>
                <p className={`leading-relaxed ${
                  theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
                }`}>
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className={`py-12 ${
        theme === 'dark' ? 'bg-slate-900' : 'bg-white'
      } border-t ${theme === 'dark' ? 'border-slate-800' : 'border-slate-200'}`}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className={`w-8 h-8 rounded-lg ${
                theme === 'dark' ? 'bg-gradient-to-br from-blue-400 to-purple-500' : 'bg-gradient-to-br from-blue-600 to-purple-600'
              } flex items-center justify-center`}>
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <span className={`text-xl font-bold ${
                theme === 'dark' ? 'text-white' : 'text-slate-900'
              }`}>
                Prepify
              </span>
            </div>
            
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className={`text-sm ${
                theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
              }`}>
                4.9/5 from 10,000+ professionals
              </span>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-slate-200 dark:border-slate-700 text-center">
            <p className={`text-sm ${
              theme === 'dark' ? 'text-slate-500' : 'text-slate-500'
            }`}>
              © {new Date().getFullYear()} Prepify Technologies, Inc. All rights reserved. 
              <span className="mx-2">•</span>
              Enterprise solutions for global talent development.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;