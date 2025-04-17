"use client";

import Image from "next/image";

import { useState } from "react";
import {
    Box,
    Button,
    Container,
    FormControl,
    TextField,
    TextFieldProps,
    Typography,
    Paper,
    InputLabel,
    Select,
    SelectChangeEvent,
    MenuItem
} from "@mui/material";

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import {styled} from "@mui/system";

export default function FormPage() {
    const VisuallyHiddenInput = styled('input')({
        clip: 'rect(0 0 0 0)',
        clipPath: 'inset(50%)',
        height: 1,
        overflow: 'hidden',
        position: 'absolute',
        bottom: 0,
        left: 0,
        whiteSpace: 'nowrap',
        width: 1,
    });

    const [selectedOption, setSelectedOption] = useState("");

    const handleDropdownChange = (event: SelectChangeEvent) => {
        setSelectedOption(event.target.value);
    };

    const [startDateRaw, setStartDateRaw] = useState<Date | null>(null);
    const [endDateRaw, setEndDateRaw] = useState<Date | null>(null);

    const [result, setResult] = useState('');

    async function onButtonClick() {
        // console.log("here is the data")
        // console.log("here is the employee")
        // console.log(selectedOption)
        // console.log("here is the start date")
        // console.log(startDate)
        // // console.log("here is the end date")
        // // console.log(endDate)
        // console.log(typeof startDate
        const name = selectedOption
        const startDate = startDateRaw?.toISOString()
        const endDate = endDateRaw?.toISOString()
        console.log(selectedOption)
        console.log(typeof selectedOption)
        console.log(startDate)
        console.log(typeof startDate)
        console.log(endDate)
        console.log(typeof endDate)
        const res = await fetch('http://localhost:8000/forms/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, startDate, endDate }),
        });
        console.log("res")
        console.log(res)
        const data = await res.json();
        console.log("data")
        console.log(data)
        // setResult(JSON.stringify(data, null, 2));
    }

    return (
        <Container maxWidth="lg" sx={{ mt: 8 }}>
            <Paper elevation={3} sx={{ p: 4 }}>
                <Typography variant="h5" component="h1" gutterBottom>
                    Employee Absence Form
                </Typography>
                <Box>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Choose Option</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={selectedOption}
                            label="Choose Employee"
                            onChange={handleDropdownChange}
                        >
                            <MenuItem value="Jack Sparrow">Jack Sparrow</MenuItem>
                            <MenuItem value="Baris Manco">Baris Manco</MenuItem>
                            <MenuItem value="Wolfgang Amadeus Mozart">Wolfgang Amadeus Mozart</MenuItem>
                        </Select>
                    </FormControl>
                    <Box sx={{ mt: 2 }}>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                                label="Start Date"
                                value={startDateRaw}
                                onChange={(newValue) => setStartDateRaw(newValue)}
                                textField={(params: TextFieldProps) => <TextField fullWidth {...params} />}
                            />
                        </LocalizationProvider>
                    </Box>
                    <Box sx={{ mt: 2 }}>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                                label="End Date"
                                value={endDateRaw}
                                onChange={(newValue) => setEndDateRaw(newValue)}
                                textField={(params: TextFieldProps) => <TextField fullWidth {...params} />}
                            />
                        </LocalizationProvider>
                    </Box>
                    <Box sx={{ mt: 2 }}>
                        <Button
                            component="label"
                            role={undefined}
                            variant="contained"
                            tabIndex={-1}
                            startIcon={<Image
                                src="/file.svg"
                                alt="Upload File Button"
                                width={20}
                                height={20}
                            />}
                        >
                            Upload files
                            <VisuallyHiddenInput
                                type="file"
                                onChange={(event) => console.log(event.target.files)}
                                multiple
                            />
                        </Button>
                    </Box>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        sx={{ mt: 2 }}
                        fullWidth
                        onClick={onButtonClick}
                    >
                        Submit
                    </Button>
                </Box>
            </Paper>
        </Container>
    );
}

