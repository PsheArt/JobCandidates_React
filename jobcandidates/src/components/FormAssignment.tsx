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
    const [deadLine, setDeadLine] = useState(initialData?.DeadLine.toISOString().split('T')[0]  || '');
    const [executionTime, setExecutionTime] = useState(initialData?.ExecutionTime.toISOString().split('T')[0]  || '');
    useEffect(() => {
        if (initialData) {
           setNameTask(initialData.NameTask);
           setDescriptionTask(initialData.DescriptionTask);
           setStack(initialData.Stak);
           setDeadLine(initialData.DeadLine.toISOString().split('T')[0]);
           setExecutionTime(initialData.ExecutionTime.toISOString().split('T')[0]);
        } else {
            setNameTask('');
            setDescriptionTask('');
            setStack([]);
            setDeadLine('');
            setExecutionTime('');
        }
    }, [initialData]);

    const handleStackChange = (event: SelectChangeEvent<Stack[]>) => {
        const {
            target: { value },
        } = event;
        setStack(prev => ({ ...prev, Stak: typeof value === 'string' ? value.split(',') as Stack[] : value }));
    };
      const handleSubmit = () => {
        const assignment: Assignment = {
            Id: initialData ? initialData.Id : Date.now(),
            NameTask: nameTask,
            DescriptionTask: descriptionTask,
            Stak: stak,
            DeadLine: new Date(deadLine),
            ExecutionTime: new Date(executionTime)
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
                    label="Срок выполнения"
                    type="date"
                    value={deadLine}
                    onChange={(e) => setDeadLine(e.target.value)} 
                    fullWidth
                />
                <TextField
                    label="Время  выполнения"
                    type="date"
                    value={executionTime}
                    onChange={(e) => setExecutionTime(e.target.value)} 
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

