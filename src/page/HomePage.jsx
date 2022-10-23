import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useEffect } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { useState } from 'react';
import entryService from "../services/entryService";
import { Box, FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
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

export default function HomePage() {
  const [type, setType] = useState([]);
  const [voucherType, setVoucherType] = useState(window.sessionStorage.getItem("voucherName"))
  const [subType, setSubType] = useState();
  const [amount, setAmount] = useState();
  const [entryDate, setEntryDate] = useState();
  const [allEntry, setAllEntry] = useState([]);
  const [totalDebit, setTotalDebit] = useState();
  const [totalCredit, setTotalCredit] = useState();
  const [edit, setEdit] = useState(false);
  const [updateType, setUpdateType] = useState();
  const [updateSubType, setUpdateSubType] = useState();
  const [updateAmount, setUpdateAmount] = useState();
  const [id, setId] = useState();
  console.log(subType)
  useEffect(() => {
    entryService.getAllVoucher()
      .then(res => setType(res.data));
    getLedgerByVoucher();
  }, []);

  const handleChangeVoucher = (event) => {
    window.sessionStorage.setItem("voucherId", event.target.value.voucher_id);
    window.sessionStorage.setItem("voucherName", event.target.value.name);
    chageLedgerValue();
  }
  const [allLedger, setAllLedger] = useState([]);
  const getLedgerByVoucher = () => {
    entryService.getLedgerByVoucher()
      .then(res => setAllLedger(res.data));
    chageLedgerValue();
  }

  const chageLedgerValue = () => {
    entryService.getLedgerByVoucher()
      .then(res => setAllLedger(res.data));
  }
  const formik = useFormik({
    initialValues: {
      type: '',
      subType: '',
      amount: '',
      entryDate: ''
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      console.log(values)
      alert(JSON.stringify(values, null, 2));
    },
  });

  const addEntry = (e) => {
    e.preventDefault();
    if (window.sessionStorage.getItem("entryId") == null) {
      entryService.addEntry(voucherType, subType, amount, entryDate);
      getAllEntry();
      getTotalDebitAndCreditAmont();
    } else {
      var entryId = window.sessionStorage.getItem("entryId");
      entryService.addEntryWithId(voucherType, subType, amount, entryDate, entryId);
      getAllEntry();
      getTotalDebitAndCreditAmont();
    }
  }

  const getAllEntry = () => {
    entryService.getAllEntry(window.sessionStorage.getItem("entryId"))
      .then(res => setAllEntry(res.data))
  }

  const newEntry = () => {
    window.sessionStorage.clear();
    window.location.reload();
  }

  const getTotalDebitAndCreditAmont = () => {
    entryService.getTotalDebitAndCreditAmount(window.sessionStorage.getItem("entryId"))
      .then(res => {
        setTotalDebit(res.data.debit);
        setTotalCredit(res.data.credit)
      })
  }

  const finalSubmit = () => {
    if (totalCredit !== totalDebit) {
      alert("Credit and Debit value doesn't match");
    } else {
      var entryId = window.sessionStorage.getItem("entryId");
      entryService.finalTransaction(totalDebit, totalCredit, entryId);
    }
  }
  const updateEntry = () => {
    entryService.updateEntry(id, updateType, subType, amount);
  }

  const handleShow = async (id, debit, credit, ledger) => {
    setId(id);
    setSubType(ledger);
    if (type == "CREDIT") {
      setAmount(credit);
    }
    else{
      setAmount(debit);
    }

    setEdit(true)
  }
  return (
    <>
      <div>
        <Button variant="contained" onClick={newEntry}>Add New Entry</Button>
        <div style={{ width: " 100%", marginTop: "20px", marginLeft: "50px" }}>
          <Box sx={{ minWidth: 120 }}>
            <InputLabel id="demo-simple-select-label">Voucher Type</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              onChange={handleChangeVoucher}
            >
              {type?.map(data => (
                <MenuItem value={data}  >{data.name}</MenuItem>
              ))}
            </Select>
          </Box>
        </div>
        <div>
          <div style={{ width: "40%", float: "left", marginLeft: "5%", marginTop: "100px" }}>
            {edit == true
              ?
              <>
                <div>
                  <Box sx={{ minWidth: 120 }}>
                    <InputLabel id="demo-simple-select-label">Voucher Type</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      onChange={e => setUpdateType(e.target.value)}
                      value={updateType}
                      
                    >
                      <MenuItem value="DEBIT"  >DEBIT</MenuItem>
                      <MenuItem value="CREDIT"  >CREDIT</MenuItem>

                    </Select>
                  </Box>
                  <Box sx={{ minWidth: 120 }}>
                    <InputLabel id="demo-simple-select-label" style={{ marginTop: "20px" }}>Voucher Type</InputLabel>
                    <Select
                      value={subType}
                      onChange={e => setSubType(e.target.value)}
                      style={{ marginTop: "10px" }}
                    >
                      {allLedger?.map(data => (

                        <MenuItem value={data.name} >{data.name}</MenuItem>
                      ))}
                    </Select>
                  </Box>
                  <TextField
                    fullWidth
                    id="amount"
                    name="amount"
                    label="amount"
                    type="number"
                    value={amount}
                    onChange={e => setAmount(e.target.value)}
                    error={formik.touched.amount && Boolean(formik.errors.amount)}
                    helperText={formik.touched.amount && formik.errors.amount}
                    style={{ marginTop: "10px" }}
                  />
                  {/* <TextField
                    fullWidth
                    id="entryDate"
                    name="entryDate"
                    label=""
                    type="date"
                    // value={ e=>setEntryDate(e.target.entryDate)}
                    onChange={e => setEntryDate(e.target.value)}
                    error={formik.touched.entryDate && Boolean(formik.errors.entryDate)}
                    helperText={formik.touched.entryDate && formik.errors.entryDate}
                    style={{ marginTop: "10px" }}
                  /> */}
                  <Button color="primary"
                    variant="contained"
                    fullWidth type="submit"
                    style={{ marginTop: "20px" }}
                    onClick={updateEntry}
                  >
                    Update
                  </Button>
                </div>
              </>
              :
              <>
                <div>
                  <Box sx={{ minWidth: 120 }}>
                    <InputLabel id="demo-simple-select-label">Voucher Type</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      onChange={e => setVoucherType(e.target.value)}
                    >
                      <MenuItem value="DEBIT"  >DEBIT</MenuItem>
                      <MenuItem value="CREDIT"  >CREDIT</MenuItem>

                    </Select>
                  </Box>
                  <Box sx={{ minWidth: 120 }}>
                    <InputLabel id="demo-simple-select-label" style={{ marginTop: "20px" }}>Voucher Type</InputLabel>
                    <Select
                      value={subType}
                      name="subType"
                      onChange={e => setSubType(e.target.value)}
                      style={{ marginTop: "10px" }}
                    >
                      {allLedger?.map(data => (

                        <MenuItem value={data.name} >{data.name}</MenuItem>
                      ))}
                    </Select>
                  </Box>
                  <TextField
                    fullWidth
                    id="amount"
                    name="amount"
                    label="amount"
                    type="number"
                    value={amount}
                    onChange={e => setAmount(e.target.value)}
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
                    // value={ e=>setEntryDate(e.target.entryDate)}
                    onChange={e => setEntryDate(e.target.value)}
                    error={formik.touched.entryDate && Boolean(formik.errors.entryDate)}
                    helperText={formik.touched.entryDate && formik.errors.entryDate}
                    style={{ marginTop: "10px" }}
                  />
                  <Button color="primary"
                    variant="contained"
                    fullWidth type="submit"
                    style={{ marginTop: "20px" }}
                    onClick={addEntry}
                  >
                    Submit
                  </Button>
                </div>
              </>
            }

            <Button variant="contained" style={{ marginTop: "200px", backgroundColor: "green" }} onClick={finalSubmit}>Submit</Button>
          </div>
          <div style={{ width: "40%", float: "left", marginLeft: "5%" }}>
            <TableContainer component={Paper}>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="right">Ledger</TableCell>
                    <TableCell align="right">Debit</TableCell>
                    <TableCell align="right">Credit</TableCell>
                    <TableCell align="right">Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {allEntry.map((row) => (
                    <TableRow
                      key={row.name}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell align="right">{row.ledger}</TableCell>
                      <TableCell align="right">{row.debit}</TableCell>
                      <TableCell align="right">{row.credit}</TableCell>
                      <button align="right" onClick={() => handleShow(row.id, row.debit, row.credit, row.ledger)}  >update</button>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="right">Debit Total</TableCell>
                    <TableCell align="right">Credit Total</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow

                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell align="right">{totalDebit}</TableCell>
                    <TableCell align="right">{totalCredit}</TableCell>
                  </TableRow>

                </TableBody>
              </Table>
            </TableContainer>
          </div>

        </div>
      </div>
    </>
  );
}