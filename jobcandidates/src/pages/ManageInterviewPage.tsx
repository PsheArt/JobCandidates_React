import React, { useState } from 'react';
import { Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { Interview }  from '../models/Interview'
import  { useInterviewContext } from '../contexts/InterviewContext'
import TableInterview from '../components/TableInterview'

const ManageInterview: React.FC = () =>{

    const [selectedInterview, setSelectedInterview] = useState<Interview| null>(null)
    const [interview, addInterview, updateInterview, deleteInterview ] = useInterviewContext();
    const [isModalOpen, setIsModalOpen] = useState(false);

     const handleDelete = (id: number) => {
        deleteInterview(id); 
    };

    const handleAddOrUpdate = (interview: Interview) => {
        if (selectedInterview) {
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
            <h1>���������� ���������������</h1>
            <TableInterview interviews={interview} onEdit={handleOpenModal} onDelete={handleDelete} />
            <Fab color="primary" aria-label="add" style={{ position: 'fixed', bottom: 16, right: 16 }} onClick={handleOpenAddModal}>
                <AddIcon />
            </Fab>
            <FormInterview
                open={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </>
    );
}

export default ManageInterview;