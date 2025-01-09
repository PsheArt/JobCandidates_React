import React, { useState } from 'react';
import { Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { Interview }  from '../models/Interview'
import  { useInterviewContext } from '../contexts/InterviewContext'
import TableInterview from '../components/TableInterview'
import FormInterview from '../components/FormInterview'

const ManageInterview: React.FC = () =>{

    const [selectedInterview, setSelectedInterview] = useState<Interview| null>(null)
    const [interviews, addInterview, updateInterview, deleteInterview ] = useInterviewContext();
    const [isModalOpen, setIsModalOpen] = useState(false);

     const handleDelete = (id: number) => {
        deleteInterview(id); 
    };
    const handleAddOrUpdateInterview = (interview: Interview) => {
        if (interview) {
            updateInterview(interview);
        } else {
            addInterview(interview);
        }
        setSelectedInterview(null);
        setIsModalOpen(false);
    };
    const handleOpenModal = (interview: Interview | null) => {
        setSelectedInterview(interview);
        setIsModalOpen(true);
    };

    const handleOpenAddModal = () => {
        setSelectedInterview(null); 
        setIsModalOpen(true); 
    };
    return (
        <>
            <h1>Управление собеседованиями</h1>
            <TableInterview interviews={interviews} onEdit={handleOpenModal} onDelete={handleDelete} />
            <Fab color="primary" aria-label="add" style={{ position: 'fixed', bottom: 16, right: 16 }} onClick={handleOpenAddModal}>
                <AddIcon />
            </Fab>
            <FormInterview
                open={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleAddOrUpdateInterview }
            />
        </>
    );
}

export default ManageInterview;