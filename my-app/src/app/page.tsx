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

    const [files, setFiles] = useState<FileList | null>(null);

    async function onButtonClick() {
        if(startDateRaw === null || endDateRaw === null || files === null) {
            return;
        }
        const startDateIso: string = startDateRaw.toISOString()
        const endDateIso: string = endDateRaw.toISOString()
        const formData = new FormData();

        formData.append('selectedOption', selectedOption);
        formData.append('startDateIso', startDateIso);
        formData.append('endDateIso', endDateIso);

        for (let i = 0; i < files.length; i++) {
            formData.append('files', files[i]);  // 'files' must match FastAPI param name
        }

        const res = await fetch('http://localhost:8000/forms/', {
            method: 'POST',
            body: formData,
        });
        console.log("res")
        console.log(res)
        const data = await res.json();
        console.log("data")
        console.log(data)
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
                            color={files ? 'secondary' : 'primary'}
                        >
                            Upload files
                            <VisuallyHiddenInput
                                type="file"
                                onChange={(event) => setFiles(event.target.files)}
                                multiple
                            />
                        </Button>
                        {files && (
                            <Box sx={{ mt: 1, ml: 1 }}>
                                {Array.from(files).map((file, index) => (
                                    <Box key={index} sx={{ fontSize: '0.9rem', color: 'text.secondary' }}>
                                        {file.name}
                                    </Box>
                                ))}
                            </Box>
                        )}
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

