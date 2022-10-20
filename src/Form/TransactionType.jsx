import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useEffect } from 'react';
import entryService from '../services/entryService';
import { useState } from 'react';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import { ListItemText } from '@mui/material';
import { Formik } from "formik";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

const validationSchema = yup.object({
    email: yup
        .string('Enter your email')
        .email('Enter a valid email')
        .required('Email is required'),
    password: yup
        .string('Enter your password')
        .min(8, 'Password should be of minimum 8 characters length')
        .required('Password is required'),
});

export default function TransactionType() {
    const formik = useFormik({
        initialValues: {
            email: 'foobar@example.com',
            password: 'foobar',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            alert(JSON.stringify(values, null, 2));
        },
    });
    const [type, setType] = useState([]);
    const [voucherId, setVoucherId] = useState();

    useEffect(() => {
        entryService.getAllVoucher()
            .then(res => setType(res.data));
    }, []);

    const handleChangeVoucher = (event) => {
        setVoucherId(event.target.value);
        window.sessionStorage.setItem("voucherId",event.target.value );
    }
    return (
        <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Voucher Type</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                      value={voucherId}
                  onChange={handleChangeVoucher}
                >
                    {type.map(data => (

                        <MenuItem value={data.voucher_id}>{data.name}</MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Box>
    );
};
