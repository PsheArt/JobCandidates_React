import React from 'react';
import { Interview } from '../models';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button} from '@mui/material';

interface TableInterviewProps {
    interviews: Interview[];
    onEdit: (interview: Interview) => void;
    onDelete: (id: number) => void;
}

const TableInterview: React.FC<TableInterviewProps> = ({ interviews, onEdit, onDelete }) => { 

    return (
        <Paper>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>ФИО кандидата</TableCell>
                            <TableCell>Дата собеседования</TableCell>
                            <TableCell>Подразделение</TableCell>
                            <TableCell>Должность</TableCell>
                        </TableRow>
                    </TableHead>
                   <TableBody>
                    {interviews.map((interview) => (
                        <TableRow key={interview.Id} onClick={() => onEdit(interview)}>
                            <TableCell>{interview.CandidateId.FullName}</TableCell>
                            <TableCell>{interview.DateInterview.toLocaleDateString()}</TableCell>
                            <TableCell>{interview.Department}</TableCell>
                            <TableCell>{interview.Position}</TableCell>
                            <TableCell>
                                <Button onClick={(e) => { e.stopPropagation(); onDelete(interview.Id); }}>Delete</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
};

export default TableInterview;
