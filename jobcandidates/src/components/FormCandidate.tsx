import React, { useState, useEffect } from 'react';
import { Modal, Box, TextField, Button } from '@mui/material';
import { Candidate } from '../models/Candidate';

interface FormCandidateProps {
    open: boolean;
    onClose: () => void;
    onSubmit: (candidate: Candidate) => void;
    initialData?: Candidate | null;
}

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    boxShadow: 2,
    p: 2
};

const FormCandidate: React.FC<FormCandidateProps> = ({ open, onClose, onSubmit, initialData }) => {
    const [fullName, setFullName] = useState(initialData?.FullName || '');
    const [phoneNumber, setPhoneNumber] = useState(initialData?.PhoneNumber || '');
    const [adress, setAdress] = useState(initialData?.Adress || '');
    const [dateBirth, setDateBirth] = useState(initialData?.DateBirth.toISOString().split('T')[0] || '');

    useEffect(() => {
        if (initialData) {
            setFullName(initialData.FullName);
            setPhoneNumber(initialData.PhoneNumber);
            setAdress(initialData.Adress);
            setDateBirth(initialData.DateBirth.toISOString().split('T')[0]);
        } else {
            setFullName('');
            setPhoneNumber('');
            setAdress('');
            setDateBirth('');
        }
    }, [initialData]);

    const handleSubmit = () => {
        const candidate: Candidate = {
            Id: initialData ? initialData.Id : Date.now(),
            FullName: fullName,
            PhoneNumber: phoneNumber,
            Adress: adress,
            DateBirth: new Date(dateBirth),
        };
        onSubmit(candidate);
        onClose();
    };

    return (
        <Modal open={open} onClose={onClose}>
            <Box sx={style}>
               <h2>{initialData ? 'Изменить' : 'Новый кандидат'}</h2>
                <TextField label="ФИО" value={fullName} onChange={(e) => setFullName(e.target.value)} fullWidth />
                <TextField label="Номер телефона" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} fullWidth />
                <TextField label="Email" value={adress} onChange={(e) => setAdress(e.target.value)} fullWidth />
                <TextField type="date" label="Дата рождения" value={dateBirth} onChange={(e) => setDateBirth(e.target.value)} fullWidth />
                <Button onClick={handleSubmit}>{initialData ? 'Обновить' : 'Добавить'}</Button>
            </Box>
        </Modal>
    );
};

export default FormCandidate;
