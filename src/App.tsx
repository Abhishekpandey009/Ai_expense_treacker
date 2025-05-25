import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ExpenseProvider } from './context/ExpenseContext';
import Navbar from './components/layout/Navbar';
import Dashboard from './pages/Dashboard';
import AddExpense from './pages/AddExpense';
import EditExpense from './pages/EditExpense';
import Analytics from './pages/Analytics';
import Insights from './pages/Insights';
import Settings from './pages/Settings'; // Add this import

function App() {
  return (
    <ExpenseProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <main className="pb-16">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/add" element={<AddExpense />} />
              <Route path="/edit/:id" element={<EditExpense />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/insights" element={<Insights />} />
               <Route path="/settings" element={<Settings />} /> {/* Add this line */}
            </Routes>
          </main>
        </div>
      </Router>
    </ExpenseProvider>
  );
}

export default App;