import React, { useEffect, useState } from 'react';
import { SelectChangeEvent } from '@mui/material/Select';
import { Modal, TextField, Button, MenuItem, Select, Chip, InputLabel, FormControl } from '@mui/material';
import { Stack, Assignment } from '../models/Assignment';

interface AssignmentFormProps {
    open: boolean;
    onSubmit: (assignment: Assignment) => void;
    onClose: () => void;
    initialData?: Assignment | null;
}

const FormAssignment: React.FC<AssignmentFormProps> = ({ open, onClose, onSubmit, initialData }) => {
    const [nameTask, setNameTask] = useState(initialData?.NameTask || '');
    const [descriptionTask, setDescriptionTask] = useState(initialData?.DescriptionTask || '');
    const [stak, setStack] = useState(initialData?.Stak  || []);
    const [executionDays, setExecutionDays] = useState(initialData?.ExecutionTime.toString() || '');
    useEffect(() => {
        if (initialData) {
           setNameTask(initialData.NameTask);
           setDescriptionTask(initialData.DescriptionTask);
           setStack(initialData.Stak);
            setExecutionDays(initialData.ExecutionTime.toString());
        } else {
            setNameTask('');
            setDescriptionTask('');
            setStack([]);
            setExecutionDays('');
        }
    }, [initialData]);

    const handleStackChange = (event: SelectChangeEvent<Stack[]>) => {
        const {
            target: { value },
        } = event;
        const selectedValues = typeof value === 'string' ? value.split(',') as Stack[] : value;
        setStack(selectedValues);
    };
    const handleSubmit = () => {
        const assignment: Assignment = {
            Id: initialData ? initialData.Id : Date.now(),
            NameTask: nameTask,
            DescriptionTask: descriptionTask,
            Stak: stak,
            ExecutionTime: executionDays
        };
        onSubmit(assignment);
        onClose();
    };
    return (
        <Modal open={open} onClose={onClose}>
            <div style={{ padding: '20px', backgroundColor: 'white' }}>
                <h2>{initialData ? 'Изменить' : 'Добавить'}</h2>
                <TextField
                    label="Название задания"
                    name="NameTask"
                    value={nameTask}
                    onChange={(e) => setNameTask(e.target.value)} 
                    fullWidth
                />
                <TextField
                    label="Описание задания"
                    name="DescriptionTask"
                    value={descriptionTask}
                    onChange={(e) => setDescriptionTask(e.target.value)} 
                    fullWidth
                />
                <TextField
                    label="Продолжительность выполнения (дни)"
                    type="number"
                    value={executionDays}
                    onChange={(e) => setExecutionDays(e.target.value)}
                    fullWidth
                />
                <FormControl fullWidth>
                    <InputLabel>Стек</InputLabel>
                    <Select
                        multiple
                        value={stak}
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
                <Button onClick={handleSubmit}>{initialData ? 'Обновить' : 'Добавить'}</Button>
            </div>
        </Modal>
    );
};

export default FormAssignment;

