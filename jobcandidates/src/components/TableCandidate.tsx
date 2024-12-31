import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button } from '@mui/material';
import { Candidate } from '../models/Candidate';

interface TableCandidateProps {
    candidates: Candidate[];
    onEdit: (candidate: Candidate) => void;
    onDelete: (id: number) => void;
}

const TableCandidate: React.FC<TableCandidateProps> = ({ candidates, onEdit, onDelete }) => {
    return (
        <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>ФИО</TableCell>
                        <TableCell>Номер</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Дата рождения</TableCell>
                        <TableCell>Действие </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {candidates.map((candidate) => (
                        <TableRow key={candidate.Id} onClick={() => onEdit(candidate)}>
                            <TableCell>{candidate.FullName}</TableCell>
                            <TableCell>{candidate.PhoneNumber}</TableCell>
                            <TableCell>{candidate.Adress}</TableCell>
                            <TableCell>{candidate.DateBirth.toLocaleDateString()}</TableCell>
                            <TableCell>
                                <Button onClick={(e) => { e.stopPropagation(); onDelete(candidate.Id); }}>Delete</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default TableCandidate;