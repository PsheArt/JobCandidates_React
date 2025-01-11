import React, { useEffect, useState } from 'react';
import { SelectChangeEvent } from '@mui/material/Select';
import { Modal, TextField, Button, MenuItem, Select, Chip, InputLabel, FormControl } from '@mui/material';
import { Stack, Assignment } from '../models/Assignment';
import { useAssignments } from '../contexts/AssignmentContext';

interface AssignmentFormProps {
    open: boolean;
    onClose: () => void;
    assignment?: Assignment | null; 
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

    const handleStackChange = (event: SelectChangeEvent<Stack[]>) => {
        const {
            target: { value },
        } = event;
        setFormData(prev => ({ ...prev, Stak: typeof value === 'string' ? value.split(',') as Stack[] : value }));
    };
    const handleSubmit = () => {
        if (assignment) {
            updateAssignment(formData);
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
                <FormControl fullWidth>
                    <InputLabel>Stack</InputLabel>
                    <Select
                        multiple
                        value={formData.Stak}
                        onChange={handleStackChange}
                        renderValue={(selected) => (
                            <div>
                                {selected.map((value) => (
                                    <Chip key={value} label={value} />
                                ))}
                            </div>
                        )}>
                        {Object.values(Stack).map((stack) => (
                            <MenuItem key={stack} value={stack}>
                                {stack}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <Button onClick={handleSubmit}>{assignment ? 'Update' : 'Add'}</Button>
            </div>
        </Modal>
    );
};

export default FormAssignment;

