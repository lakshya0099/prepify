import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Setup from './pages/Setup';
import Start from './pages/Start';
import Result from './pages/Result';
import AnalysisReport from './pages/AnalysisReport';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';


// Create a client
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/setup" element={<Setup />} />
          <Route path="/start" element={<Start />} />
          <Route path="/result" element={<Result />} />
          <Route path="/analysis-report" element={<AnalysisReport />} />
        </Routes>
      </>
    </QueryClientProvider>
  );
}

export default App;
