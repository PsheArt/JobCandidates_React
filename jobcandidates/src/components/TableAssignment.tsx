// src/components/AssignmentTable.tsx
import React from 'react';
import { Assignment } from '../models/Assignment';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

interface AssignmentTableProps {
    assignments: Assignment[];
}

const AssignmentTable: React.FC<AssignmentTableProps> = ({ assignments }) => {
    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Название задания</TableCell>
                        <TableCell>Описание</TableCell>
                        <TableCell>Срок выполнения</TableCell>
                        <TableCell>Время выполнения</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {assignments.map((assignment) => (
                        <TableRow key={assignment.Id}>
                            <TableCell>{assignment.Id}</TableCell>
                            <TableCell>{assignment.NameTask}</TableCell>
                            <TableCell>{assignment.DescriptionTask}</TableCell>
                            <TableCell>{new Date(assignment.DeadLine).toLocaleDateString()}</TableCell>
                            <TableCell>{new Date(assignment.ExecutionTime).toLocaleDateString()}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default AssignmentTable;
