// src/components/AssignmentTable.tsx
import React from 'react';
import { Assignment } from '../models/Assignment';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Paper } from '@mui/material';

interface AssignmentTableProps {
    assignments: Assignment[];
    onEdit: (assignment: Assignment) => void;
    onDelete: (id: number) => void;
}

const AssignmentTable: React.FC<AssignmentTableProps> = ({ assignments, onEdit, onDelete }) => {
    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Название задания</TableCell>
                        <TableCell>Описание</TableCell>
                        <TableCell>Время выполнения в днях</TableCell>
                        <TableCell>Действие</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {assignments.map((assignment) => (
                        <TableRow key={assignment.Id} onClick = {()=>onEdit(assignment)}>
                            <TableCell>{assignment.Id}</TableCell>
                            <TableCell>{assignment.NameTask}</TableCell>
                            <TableCell>{assignment.DescriptionTask}</TableCell>
                            <TableCell>{assignment.ExecutionTime}</TableCell>
                             <TableCell>
                                <Button onClick={(e) => { e.stopPropagation(); onDelete(assignment.Id); }}>Удалить</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default AssignmentTable;
