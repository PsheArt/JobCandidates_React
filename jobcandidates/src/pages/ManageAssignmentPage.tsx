import React, { useState } from 'react';
import { Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useAssignments } from '../contexts/AssignmentContext';
import TableAssignment from '../components/TableAssignment';
import FormAssignment from '../components/FormAssignment';
import { Assignment } from '../models/Assignment'

const ManageAssignment: React.FC = () => {
  const { assignments, addAssignment, updateAssignment, deleteAssignment } = useAssignments() 
  const [ selectedAssignment, setSelectedAssignment ] = useState<Assignment | null>(null);
  const [ isModalOpen, setIsModalOpen ] = useState(false);

  const handleDelete = (id: number) => {
        deleteAssignment(id);
    };
    const handleAddOrUpdate = (assignment: Assignment) => {
      if (selectedAssignment) {
          updateAssignment(assignment);
        } else {
          addAssignment(assignment);
        }
        setSelectedAssignment(null);
        setIsModalOpen(false);
    };
    const handleOpenModal = (assignment: Assignment | null) => {
        setSelectedAssignment(assignment);
        setIsModalOpen(true);
    };
  const handleOpenAddModal = () => {
        setSelectedAssignment(null); 
        setIsModalOpen(true); 
    };

    return (
        <>
            <h1>Управление тестовыми заданиями</h1>
            <TableAssignment assignments={assignments} onEdit={handleOpenModal} onDelete={handleDelete} />
            <Fab color="primary" aria-label="add" style={{ position: 'fixed', bottom: 16, right: 16 }} onClick={handleOpenAddModal}>
                <AddIcon />
            </Fab>
            <FormAssignment
                open={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleAddOrUpdate}
                initialData={selectedAssignment}
            />
        </>
    );
}

export default ManageAssignment;