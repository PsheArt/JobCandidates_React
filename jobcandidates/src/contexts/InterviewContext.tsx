import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Interview }  from '../models/Interview';

interface InterviewContextType {
    interviews: Interview[];
    addInterview: (interview: Interview) => void;
    updateInterview: (interview: Interview) => void;
    deleteInterview: (id: number) => void;
}

const InterviewContext = createContext<InterviewContextType | undefined>(undefined);

export const InterviewProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
     const [interviews, setInterview] = useState<Interview[]>([]);

     const addInterview = (interview: Interview) => {
        setInterview((prev) => [...prev, interview]);
    };

    const updateInterview = (updatedInterview: Interview) => {
        setInterview(prev => prev.map(interview =>
            interview.Id === updatedInterview.Id ? updatedInterview : interview
        ));
    };

    const deleteInterview = (id: number) => {
        setInterview((prev) => prev.filter((interview) => interview.Id !== id));
    };

    return (
        <InterviewContext.Provider value={{ interviews, addInterview, updateInterview, deleteInterview }} >
        { children }
        </InterviewContext.Provider>
    );

}
export const useInterviewContext = () => {

    const context = useContext(InterviewContext);
    if (!context) {
        throw new Error('useInterview must be used within a InterviewProvider');
    }
    return context;
};