import React, { useState } from 'react';
import {
    Modal,
    Button,
    TextField,
    Box,
    Tabs,
    Tab,
} from '@mui/material';
import { Interview } from '../models/Interview'
import { Stack } from '../models/Assignment'

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 2
};

const FormInterview: React.FC<{ open: boolean; onClose: () => void; interview?: Interview }> = ({ open, onClose, interview }) => {

    const [tabIndex, setTabIndex] = useState(0);
    const [dateInterview, setDateInterview] = useState(interview?.DateInterview.toISOString().split('T')[0] || '');
    const [department, setDepartment] = useState(interview?.Department || '');
    const [linkOnCompletedTask, setLinkOnCompletedTask] = useState(interview?.LinkOnCompletedTask || '');
    const [interviewer, setInterviewer] = useState(interview?.Interviewer || '');
    const [assignmentName, setAssignmentName] = useState(interview?.Assignment.NameTask || '');
    const [assignmentDescription, setAssignmentDescription] = useState(interview?.Assignment.DescriptionTask || '');
    const [executionTime, setExecutionTime] = useState(interview?.Assignment.ExecutionTime.toISOString().split('T')[0] || '');
    const [assignmentId, setAssignmentId] = useState(interview?.Assignment.Id || '');
    const [executionDeadLine, setExecutionDeadLine] = useState(interview?.Assignment.DeadLine|| new Date());
    const [candidateFullName, setCandidateFullName] = useState(interview?.CandidateId.FullName || '');
    const [candidateAddress, setCandidateAddress] = useState(interview?.CandidateId.Adress || '');
    const [candidateId, setCandidateId] = useState(interview?.CandidateId.Id || '');
    const [candidateDateBirth, setCandidateDateBirth] = useState(interview?.CandidateId.DateBirth || '');
    const [candidatePhoneNumber, setCandidatePhoneNumber] = useState(interview?.CandidateId.PhoneNumber || '');
    

    const [stack, setStack] = useState<Stack[]>(interview?.Assignment.Stak || []);



    const handleSubmit = () => {
        const newInterview = {
            Id: interview ? interview.Id : Date.now(),
            CandidateId: {Id:candidateId as number, FullName: candidateFullName, Adress: candidateAddress,  PhoneNumber:candidatePhoneNumber, DateBirth: candidateDateBirth as Date },
            DateInterview: new Date(dateInterview),
            Department: department,
            Position: interview?.Position || '', 
            Assignment: {
                Id: assignmentId as number,
                NameTask: assignmentName,
                DescriptionTask: assignmentDescription,
                ExecutionTime: new Date(executionTime),
                Stak: stack, 
                DeadLine: executionDeadLine
            },
            LinkOnCompletedTask: linkOnCompletedTask,
            AttachedFiles: [], 
            Interviewer: interviewer,
        };

        if (interview) {
            updateInterview(newInterview);
        } else {
            addInterview(newInterview);
        }

        onClose();
    };
    return (
        <Modal open={open} onClose={onClose}>
            <Box sx={{ style }}>
                <h2>��������</h2>
                <Tabs value={tabIndex} onChange={(event, newValue) => setTabIndex(newValue)}>
                    <Tab label="���������� �� ��������" />
                    <Tab label="���������� � �������" />
                    <Tab label="���������� � ���������" />
                </Tabs>

                {tabIndex === 0 && (
                    <Box sx={{ mt: 2 }}>
                        <TextField
                            label="���� ��������"
                            type="date"
                            value={dateInterview}
                            onChange={(e) => setDateInterview(e.target.value)}
                            fullWidth
                        />
                        <TextField
                            label="�����"
                            value={department}
                            onChange={(e) => setDepartment(e.target.value)}
                            fullWidth
                        />
                        <TextField
                            label="������ �� ����������� �������"
                            value={linkOnCompletedTask}
                            onChange={(e) => setLinkOnCompletedTask(e.target.value)}
                            fullWidth
                        />
                        <TextField
                            label="����������"
                            value={interviewer}
                            onChange={(e) => setInterviewer(e.target.value)}
                            fullWidth
                        />
                    </Box>
                )}

                {tabIndex === 1 && (
                    <Box sx={{ mt: 2 }}>
                        <TextField
                            label="�������� �������"
                            value={assignmentName}
                            onChange={(e) => setAssignmentName(e.target.value)}
                            fullWidth
                        />
                        <TextField
                            label="�������� �������"
                            value={assignmentDescription}
                            onChange={(e) => setAssignmentDescription(e.target.value)}
                            fullWidth
                        />
                        <TextField
                            label="���� ����������"
                            type="date"
                            value={executionTime}
                            onChange={(e) => setExecutionTime(e.target.value)}
                            fullWidth
                        />
                    </Box>
                )}

                {tabIndex === 2 && (
                    <Box sx={{ mt: 2 }}>
                        <TextField
                            label="������ ��� ���������"
                            value={candidateFullName}
                            onChange={(e) => setCandidateFullName(e.target.value)}
                            fullWidth
                        />
                        <TextField
                            label="����� ���������"
                            value={candidateAddress}
                            onChange={(e) => setCandidateAddress(e.target.value)}
                            fullWidth
                        />
                    </Box>
                )}

                <Button variant="contained" color="primary" onClick={handleSubmit} sx={{ mt: 2 }}>
                    ���������
                </Button>
            </Box>
        </Modal>
    );
};


export default FormInterview;