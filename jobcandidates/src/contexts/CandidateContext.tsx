import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Candidate }  from '../models/Candidate';

interface CandidateContextType {
    candidates: Candidate[];
    addCandidate: (candidate: Candidate) => void;
    updateCandidate: (candidate: Candidate) => void;
    deleteCandidate: (id: number) => void;
}

const CandidateContext = createContext<CandidateContextType | null>(null);

export const CandidateProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [candidates, setCandidates] = useState<Candidate[]>([]);

    const addCandidate = (candidate: Candidate) => {
        setCandidates((prev) => [...prev, candidate]);
    };

    const updateCandidate = (updatedCandidate: Candidate) => {
        setCandidates((prev) =>
            prev.map((candidate) => (candidate.Id === updatedCandidate.Id ? updatedCandidate : candidate))
        );
    };


    const deleteCandidate = (id: number) => {
        setCandidates((prev) => prev.filter((candidate) => candidate.Id !== id));
    };

    const value = { candidates, addCandidate, updateCandidate, deleteCandidate };
    return (
        <CandidateContext.Provider value= { value } >
        { children }
        </CandidateContext.Provider>
    );
};

export const useCandidates = () => {

    const context = useContext(CandidateContext);
    if (!context) {
        throw new Error('useCandidates must be used within a CandidateProvider');
    }
    return context;
};
