import React, { useState } from 'react';
import { Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useCandidates } from '../contexts/CandidateContext';
import TableCandidate from '../components/TableCandidate';
import FormCandidate from '../components/FormCandidate';
import { Candidate } from '../models/Candidate'

const ManageCandidate: React.FC = () => {
    const { candidates, addCandidate, updateCandidate, deleteCandidate } = useCandidates();

    const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleDelete = (id: number) => {
        deleteCandidate(id);
    };

    const handleAddOrUpdate = (candidate: Candidate) => {
        if (selectedCandidate) {
            updateCandidate(candidate);
        } else {
            addCandidate(candidate);
        }
        setSelectedCandidate(null);
        setIsModalOpen(false);
    };
    const handleOpenModal = (candidate: Candidate | null) => {
        setSelectedCandidate(candidate);
        setIsModalOpen(true);
    };
    const handleOpenAddModal = () => {
        setSelectedCandidate(null); 
        setIsModalOpen(true); 
    };

    return (
        <>
            <h1>Управление кандидатами</h1>
            <TableCandidate candidates={candidates} onEdit={handleOpenModal} onDelete={handleDelete} />
            <Fab color="primary" aria-label="add" style={{ position: 'fixed', bottom: 16, right: 16 }} onClick={handleOpenAddModal}>
                <AddIcon />
            </Fab>
            <FormCandidate
                open={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleAddOrUpdate}
                initialData={selectedCandidate}
            />
        </>
    );
};

export default ManageCandidate;