// AssignmentModal.tsx
import React, { useEffect, useState } from 'react';
import { Modal, TextField, Button, MenuItem } from '@mui/material';
import { Stack, Assignment } from '../models/Assignment';
import { useAssignments } from '../contexts/AssignmentContext';

interface AssignmentFormProps {
    open: boolean;
    onClose: () => void;
    assignment?: Assignment; 
}

const FormAssignment: React.FC<AssignmentFormProps> = ({ open, onClose, assignment }) => {
    const { addAssignment, updateAssignment } = useAssignments();
    const [formData, setFormData] = useState<Assignment>({
        Id: assignment ? assignment.Id : Date.now(),
        NameTask: '',
        DescriptionTask: '',
        Stak: [],
        DeadLine: new Date(),
        ExecutionTime: new Date(),
    });

    useEffect(() => {
        if (assignment) {
            setFormData(assignment);
        }
    }, [assignment]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleStackChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setFormData(prev => ({ ...prev, Stak: [value as Stack] }));
    };

    const handleSubmit = () => {
        if (assignment) {
            updateAssignment(formData);
        } else {
            addAssignment(formData);
        }
        onClose();
    };

    return (
        <Modal open={open} onClose={onClose}>
            <div style={{ padding: '20px', backgroundColor: 'white' }}>
                <h2>{assignment ? 'Edit Assignment' : 'Add Assignment'}</h2>
                <TextField
                    label="Task Name"
                    name="NameTask"
                    value={formData.NameTask}
                    onChange={handleChange}
                    fullWidth
                />
                <TextField
                    label="Description"
                    name="DescriptionTask"
                    value={formData.DescriptionTask}
                    onChange={handleChange}
                    fullWidth
                />
                <TextField
                    select
                    label="Stack"
                    name="Stak"
                    value={formData.Stak[0] || ''}
                    onChange={handleStackChange}
                    fullWidth
                >
                    {Object.values(Stack).map((stack) => (
                        <MenuItem key={stack} value={stack}>{stack}</MenuItem>
                    ))}
                </TextField>
                <Button onClick={handleSubmit}>{assignment ? 'Update' : 'Add'}</Button>
            </div>
        </Modal>
    );
};

export default FormAssignment;

