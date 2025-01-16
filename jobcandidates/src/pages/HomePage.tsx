import React, { useState } from 'react';
import { Container, Fab, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import AssignmentTable from '../components/TableAssignment';
import TableInterview from '../components/TableInterview';
import { Assignment, Stack } from '../models/Assignment';
import { Candidate } from '../models/Candidate';
import { Interview } from '../models/Interview';
import { useCandidates } from '../contexts/CandidateContext';
import { useInterviewContext } from '../contexts/InterviewContext'
import { useAssignments } from '../contexts/AssignmentContext'
import FormCandidate from '../components/FormCandidate';
import FormInterview from '../components/FormInterview';
import FormAssignment from '../components/FormAssignment';
import TableCandidate from '../components/TableCandidate';

const samplecandidates: Candidate[] = [
    { Id: 1, FullName: "Иванов Иван", PhoneNumber: "+7 (999) 123-45-67", Adress: "ivanovII@yandex.com", DateBirth: new Date('1990-01-01') },
    { Id: 2, FullName: "Петров Петр", PhoneNumber: "+7 (999) 234-56-78", Adress: "petrovPP@yandex.com", DateBirth: new Date('1992-02-02') },
    { Id: 3, FullName: "Сидоров Сидор", PhoneNumber: "+7 (999) 345-67-89", Adress: "sidorovSS@yandex.com", DateBirth: new Date('1995-03-03') },
];

const sampleAssignments: Assignment[] = [
    { Id: 1, NameTask: "Задание 1", DescriptionTask: "Описание задания 1", Stak: [Stack.CSharp, Stack.Golang],ExecutionTime: 4 },
    { Id: 2, NameTask: "Задание 2", DescriptionTask: "Описание задания 2", Stak: [Stack.Golang], ExecutionTime: 5 },
];

const sampleInterviews: Interview[] = [
    {
        Id: 1,
        CandidateId: samplecandidates[0],
        DateInterview: new Date('2023-12-01'),
        Department: "IT",
        Position: "Разработчик",
        Assignment: sampleAssignments[0],
        LinkOnCompletedTask: "",
        AttachedFiles: [],
        Interviewer: "Алексей Смирнов"
    },
];

const HomePage: React.FC = () => {
    const {candidates, addCandidate, updateCandidate, deleteCandidate } = useCandidates();
    const { assignments, addAssignment, updateAssignment, deleteAssignment } = useAssignments();
    const { addInterview, updateInterview } = useInterviewContext();
    const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
    const [selectedInterview, setSelectedInterview] = useState<Interview | null>(null);
    const [selectedAssignment, setSelectedAssignment] = useState<Assignment | null>(null)
    const [isCandidateModalOpen, setIsCandidateModalOpen] = useState(false);
    const [isAssignmentModalOpen, setIsAssignmentModalOpen] = useState(false);
    const [isInterviewModalOpen, setIsInterviewModalOpen] = useState(false);

    const handleDelete = (id: number) => {
        deleteCandidate(id);
    };
    const handleDeleteAssignment = (id: number) => {
        deleteAssignment(id)
    }
    const handleAddOrUpdate = (samplecandidates: Candidate) => {
        if (selectedCandidate) {
            updateCandidate(samplecandidates);
        } else {
            addCandidate(samplecandidates);
        }
        setSelectedCandidate(null);
        setIsCandidateModalOpen(false);
    };
    const handleAddOrUpdateInterview = (interview: Interview) => {
        if (selectedInterview) {
            updateInterview(interview);
        } else {
            addInterview(interview);
        }
        setSelectedInterview(null);
        setIsCandidateModalOpen(false);
    };
    const handleAddOrUpdateAssignment = (sampleAssignment: Assignment) => {
        if (sampleAssignment) {
            updateAssignment(sampleAssignment);
        } else {
            addAssignment(sampleAssignment);
        }
        setSelectedCandidate(null);
        setIsCandidateModalOpen(false);
    };
    const handleOpenModal = (samplecandidates: Candidate | null) => {
        setSelectedCandidate(samplecandidates);
        setIsCandidateModalOpen(true);
    };
    const handleOpenModalInterview = (sampleInterviews: Interview | null) => {
        setSelectedInterview(sampleInterviews);
        setIsInterviewModalOpen(true);
    };
    const handleOpenModalAssignment = (assignment: Assignment | null) => {
        setSelectedAssignment(assignment);
        setIsAssignmentModalOpen(true);
    };
    const handleOpenAddModal = () => {
        setSelectedCandidate(null); 
        setSelectedInterview(null)
        setIsInterviewModalOpen(true);

    };

    return (
        <>
            <Container sx={{ mt: 4 }}>
                <Typography variant="h4" gutterBottom align="center">
                    Приветствие
                </Typography>
                <Typography variant="h5" gutterBottom align="left">
                    Управление кандидатами
                </Typography>
                <TableCandidate candidates={samplecandidates} onEdit={handleOpenModal} onDelete={handleDelete} />
                <FormCandidate
                    open={isCandidateModalOpen}
                    onClose={() => setIsCandidateModalOpen(false)}
                    onSubmit={handleAddOrUpdate}
                    initialData={selectedCandidate}
                />
                <Typography variant="h5" gutterBottom align="left">
                    Управление тестовыми заданиями
                </Typography>
                <AssignmentTable assignments={sampleAssignments} onEdit={handleOpenModalAssignment} onDelete={handleDeleteAssignment}  />
                <Typography variant="h5" gutterBottom align="left">
                    Управление собеседованиями
                </Typography>
                <FormAssignment
                    open={isAssignmentModalOpen}
                    onClose={() => setIsAssignmentModalOpen(false)}
                    onSubmit={handleAddOrUpdateAssignment}
                    initialData={selectedAssignment} 
                />
                <TableInterview interviews={sampleInterviews} onEdit={handleOpenModalInterview} onDelete={handleDelete} />
                <Fab color="primary" aria-label="add" style={{ position: 'fixed', bottom: 16, right: 16 }} onClick={handleOpenAddModal}>
                    <AddIcon />
                </Fab>
                <FormInterview
                    open={isInterviewModalOpen}
                    onClose={() => setIsInterviewModalOpen(false)}
                    onSubmit={ handleAddOrUpdateInterview }
                />
               
            </Container>
        </>
    );
};

export default HomePage;
