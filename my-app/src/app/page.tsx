"use client";

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
    MenuItem, IconButton
} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import {styled} from "@mui/system";
import Image from "next/image";
import { useState } from "react";

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

    const [employee, setEmployee] = useState("");
    const handleEmployeeChange = (event: SelectChangeEvent) => {
        setEmployee(event.target.value);
    };

    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);

    const [files, setFiles] = useState<File[]>([]);
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selected = event.target.files;
        if (selected) {
            setFiles((prev) => [...prev, ...Array.from(selected)]);
        }
    };
    const handleRemoveFile = (indexToRemove: number) => {
        setFiles((prev) => prev.filter((_, i) => i !== indexToRemove));
    };

    async function onButtonClick() {
        if(startDate === null || endDate === null || files === null) {
            return;
        }
        const startDateIso: string = startDate.toISOString()
        const endDateIso: string = endDate.toISOString()
        const formData = new FormData();

        formData.append('employee_name', employee);
        formData.append('start_date_iso', startDateIso);
        formData.append('end_date_iso', endDateIso);

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
                            value={employee}
                            label="Choose Employee"
                            onChange={handleEmployeeChange}
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
                                value={startDate}
                                onChange={(newValue) => setStartDate(newValue)}
                                textField={(params: TextFieldProps) => <TextField fullWidth {...params} />}
                            />
                        </LocalizationProvider>
                    </Box>
                    <Box sx={{ mt: 2 }}>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                                label="End Date"
                                value={endDate}
                                onChange={(newValue) => setEndDate(newValue)}
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
                            color={files.length > 0 ? 'secondary' : 'primary'}
                        >
                            Upload files
                            <VisuallyHiddenInput
                                type="file"
                                onChange={handleFileChange}
                                multiple
                            />
                        </Button>
                        {files.length > 0 && (
                            <Box sx={{ mt: 1, ml: 1 }}>
                                {files.map((file, index) => (
                                    <Box
                                        key={index}
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'space-between',
                                            maxWidth: '300px',
                                            backgroundColor: '#f5f5f5',
                                            px: 1.5,
                                            py: 0.5,
                                            borderRadius: 1,
                                            mb: 0.5,
                                        }}
                                    >
              <span style={{ fontSize: '0.9rem', overflowWrap: 'break-word' }}>
                {file.name}
              </span>
                                        <IconButton
                                            size="small"
                                            onClick={() => handleRemoveFile(index)}
                                            sx={{ ml: 1 }}
                                        >
                                            <CloseIcon fontSize="small" />
                                        </IconButton>
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

