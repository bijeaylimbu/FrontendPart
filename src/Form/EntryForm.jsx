import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { useState } from 'react';
import entryService from "../services/entryService";
const validationSchema = yup.object({
  type: yup
    .string('Choose Type')
    .required('Type is required'),
  subType: yup
    .string('Choose Sub Type')
    .required('Sub Type is required'),
  amount: yup
    .string('Insert Amount')
    .required('Amount is required'),
  entryDate: yup
    .string('Entry Date')
    .required('Entry Date is required')
});

const EntryForm = () => {
  const formik = useFormik({
    initialValues: {
      type: '',
      subType: '',
      amount: '',
      entryDate: ''
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      entryService.getAllVoucher();
    },
  });
  const [allLedger, setAllLedger] = useState([]);
  console.log(allLedger)

  useEffect(() => {
    entryService.getLedgerByVoucher()
      .then(res => setAllLedger(res));
      chageLedgerValue();
  }, [])

  const chageLedgerValue = () => {
    entryService.getLedgerByVoucher()
      .then(res => setAllLedger(res));
  }

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          fullWidth
          id="type"
          name="type"
          label="type"
          type="text"
          value={formik.values.type}
          onChange={formik.handleChange}
          error={formik.touched.type && Boolean(formik.errors.type)}
          helperText={formik.touched.type && formik.errors.type}
        />
        <TextField
          fullWidth
          id="subType"
          name="subType"
          label="subType"
          type="text"
          value={formik.values.subType}
          onChange={formik.handleChange}
          error={formik.touched.subType && Boolean(formik.errors.subType)}
          helperText={formik.touched.subType && formik.errors.subType}
          style={{ marginTop: "10px" }}
        />
        <TextField
          fullWidth
          id="amount"
          name="amount"
          label="amount"
          type="text"
          value={formik.values.amount}
          onChange={formik.handleChange}
          error={formik.touched.amount && Boolean(formik.errors.amount)}
          helperText={formik.touched.amount && formik.errors.amount}
          style={{ marginTop: "10px" }}
        />
        <TextField
          fullWidth
          id="entryDate"
          name="entryDate"
          label=""
          type="date"
          value={formik.values.entryDate}
          onChange={formik.handleChange}
          error={formik.touched.entryDate && Boolean(formik.errors.entryDate)}
          helperText={formik.touched.entryDate && formik.errors.entryDate}
          style={{ marginTop: "10px" }}
        />
        <Button color="primary"
          variant="contained"
          fullWidth type="submit"
          style={{ marginTop: "20px" }}
        >
          Submit
        </Button>
      </form>
    </div>
  );
};


export default EntryForm;