import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import { CandidateProvider } from './contexts/CandidateContext';
import { InterviewProvider } from './contexts/InterviewContext';
import { AssignmentProvider } from './contexts/AssignmentContext';
import ManageCandidate from './pages/ManageCandidatePage';
import ManageAssignment from './pages/ManageAssignmentPage';
import ManageInterview from './pages/ManageInterviewPage';
import  Header   from './components/Header'

const App: React.FC = () => {
    return (
        <Router>
            <Header />
            <AssignmentProvider>
            <CandidateProvider>
            <InterviewProvider>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/candidates" element={<ManageCandidate />} />
                    <Route path="/interviews" element={<ManageInterview />} />
                    <Route path="/assignments" element={<ManageAssignment />} />
                </Routes>
            </InterviewProvider>
            </CandidateProvider>
            </AssignmentProvider>
        </Router>
    );
};

export default App;
