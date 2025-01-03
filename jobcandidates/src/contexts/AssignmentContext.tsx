import React, { createContext, useContext, useState } from 'react';
import { Assignment } from './models/Assignment';

interface AssignmentContextType {
    assignments: Assignment[];
    addAssignment: (assignment: Assignment) => void;
    updateAssignment: (updatedAssignment: Assignment) => void;
    deleteAssignment: (id: number) => void;
}

const AssignmentContext = createContext<AssignmentContextType | undefined>(undefined);

export const AssignmentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [assignments, setAssignments] = useState<Assignment[]>([]);

    const addAssignment = (assignment: Assignment) => {
        setAssignments([...assignments, assignment]);
    };

    const updateAssignment = (updatedAssignment: Assignment) => {
        setAssignments(assignments.map(a => (a.Id === updatedAssignment.Id ? updatedAssignment : a)));
    };

    const deleteAssignment = (id: number) => {
        setAssignments(assignments.filter(a => a.Id !== id));
    };

    return (
        <AssignmentContext.Provider value={{ assignments, addAssignment, updateAssignment, deleteAssignment }}>
            {children}
        </AssignmentContext.Provider>
    );
};

export const useAssignments = () => {
    const context = useContext(AssignmentContext);
    if (!context) {
        throw new Error('useAssignments must be used within an AssignmentProvider');
    }
    return context;
};
