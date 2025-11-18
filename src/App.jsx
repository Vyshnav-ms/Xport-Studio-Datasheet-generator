import React, { useState, useMemo } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Paper,
  TextField,
  Button,
  Stack,
  Chip,
  FormGroup,
  FormControlLabel,
  Checkbox,
  CssBaseline,
  Box,
  Stepper,
  Step,
  StepLabel,
  useMediaQuery,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Divider,
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {
  ArrowBack,
  ArrowForward,
  Download as DownloadIcon,
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import { exportPdf } from './utils/exportPdf';
import { exportDocx } from './utils/exportDocx';
import { exportExcel } from './utils/exportExcel';
import Lottie from 'lottie-react';

const dummyAnimation = null;

const steps = ['Details', 'Structure', 'Formats', 'Preview & Export'];

const App = () => {
  const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');
  const [parallax, setParallax] = useState({ x: 0, y: 0 });

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: 'dark',
          primary: { main: '#fbbf24' },
          secondary: { main: '#f97316' },
          background: {
            default: '#0f172a',
            paper: 'rgba(15, 23, 42, 0.8)',
          },
          text: { primary: '#f9fafb', secondary: '#e5e7eb' },
        },
        typography: {
          fontFamily:
            'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        },
        shape: { borderRadius: 24 },
      }),
    []
  );

  const [activeStep, setActiveStep] = useState(0);

  const [datasheetTitle, setDatasheetTitle] = useState('');
  const [fileName, setFileName] = useState('xport_sheet');
  const [columnInput, setColumnInput] = useState('');
  const [columns, setColumns] = useState([]);
  const [rowCount, setRowCount] = useState(20);
  const [headerColor, setHeaderColor] = useState('#facc15');

  const [formats, setFormats] = useState({
    pdf: true,
    docx: false,
    excel: false,
  });

  const handleAddColumn = () => {
    const trimmed = columnInput.trim();
    if (!trimmed) return;
    if (columns.includes(trimmed)) {
      alert('This column already exists.');
      return;
    }
    setColumns([...columns, trimmed]);
    setColumnInput('');
  };

  const handleFormatsChange = (e) =>
    setFormats({ ...formats, [e.target.name]: e.target.checked });

  const handleNext = () => {
    if (activeStep === 0 && (!datasheetTitle.trim() || !fileName.trim())) {
      alert('Enter title and filename.');
      return;
    }
    if (activeStep === 1 && (!columns.length || rowCount <= 0)) {
      alert('Add at least one column and valid row count.');
      return;
    }
    if (activeStep === 2 && !Object.values(formats).includes(true)) {
      alert('Select at least one export format.');
      return;
    }
    setActiveStep((prev) => prev + 1);
  };

  const handleGenerate = () => {
    const config = {
      fileName: fileName.trim(),
      title: datasheetTitle.trim(),
      columns,
      rowCount: Number(rowCount),
      headerColor
    };
    if (formats.pdf) exportPdf(config);
    if (formats.docx) exportDocx(config);
    if (formats.excel) exportExcel(config);
    alert('Export Complete');
  };

  const previewRows = Math.min(Number(rowCount), 5);

  const stepAnim = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      {/* AppBar */}
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          background: 'rgba(15,23,42,0.85)',
          backdropFilter: 'blur(16px)',
        }}
      >
        <Toolbar>
          <Typography variant="h6" fontWeight={700}>
            XPort Studio
          </Typography>
        </Toolbar>
      </AppBar>

      <Box
        sx={{
          height: '100vh',
          pt: '70px',
          pb: '60px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Container maxWidth="lg" sx={{ height: '100%' }}>
          <Paper
            sx={{
              height: '100%',
              width: '100%',
              overflow: 'hidden',
              p: 3,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Stack spacing={2} flex={1} minHeight={0}>
              <Stepper activeStep={activeStep} alternativeLabel>
                {steps.map((label) => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>

              <Divider />

              {/* SCROLLING WIZARD AREA */}
              <Box
                sx={{
                  minHeight: 0,
                  flexGrow: 1,
                  overflowY: 'auto',
                  pr: 1,
                }}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeStep}
                    variants={stepAnim}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    transition={{ duration: 0.25 }}
                  >
                    {/* STEP CONTENT */}
                    {activeStep === 0 && (
                      <Stack spacing={2}>
                        <Typography fontWeight={600}>Step 1 · Details</Typography>
                        <TextField
                          label="Datasheet Title"
                          fullWidth size="small"
                          value={datasheetTitle}
                          onChange={(e) => setDatasheetTitle(e.target.value)}
                        />
                        <TextField
                          label="Base File Name"
                          fullWidth size="small"
                          value={fileName}
                          onChange={(e) => setFileName(e.target.value)}
                        />
                      </Stack>
                    )}

                    {activeStep === 1 && (
                      <Stack spacing={2}>
                        <Typography fontWeight={600}>Step 2 · Structure</Typography>

                        <Stack direction="row" spacing={1}>
                          <TextField
                            label="Add Column Name"
                            fullWidth size="small"
                            value={columnInput}
                            onChange={(e) => setColumnInput(e.target.value)}
                          />
                          <Button variant="outlined" onClick={handleAddColumn}>
                            Add
                          </Button>
                        </Stack>

                        <Stack direction="row" spacing={1} flexWrap="wrap">
                          {columns.map((c) => (
                            <Chip key={c} label={c} onDelete={() =>
                              setColumns(columns.filter((x) => x !== c))
                            }/>
                          ))}
                        </Stack>

                        <Box>
                          <Typography fontWeight={600}>Header Color</Typography>
                          <input
                            type="color"
                            value={headerColor}
                            onChange={(e) => setHeaderColor(e.target.value)}
                            style={{ width: 60, height: 32 }}
                          />
                        </Box>

                        <TextField
                          label="Row Count"
                          type="number"
                          value={rowCount}
                          onChange={(e) => setRowCount(e.target.value)}
                          sx={{ width: 150 }}
                        />
                      </Stack>
                    )}

                    {activeStep === 2 && (
                      <Stack spacing={2}>
                        <Typography fontWeight={600}>Step 3 · Formats</Typography>
                        <FormGroup row>
                          <FormControlLabel
                            control={<Checkbox checked={formats.pdf} onChange={handleFormatsChange} name="pdf" />}
                            label="PDF"
                          />
                          <FormControlLabel
                            control={<Checkbox checked={formats.docx} onChange={handleFormatsChange} name="docx" />}
                            label="DOCX"
                          />
                          <FormControlLabel
                            control={<Checkbox checked={formats.excel} onChange={handleFormatsChange} name="excel" />}
                            label="Excel"
                          />
                        </FormGroup>
                      </Stack>
                    )}

                    {activeStep === 3 && (
                      <Stack spacing={2}>
                        <Typography fontWeight={600}>Step 4 · Preview</Typography>

                        <Table size="small" stickyHeader>
                          <TableHead>
                            <TableRow>
                              {columns.map((col) => (
                                <TableCell key={col}>{col}</TableCell>
                              ))}
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {Array.from({ length: previewRows }).map((_, i) => (
                              <TableRow key={i}>
                                {columns.map((col) => (
                                  <TableCell key={col}></TableCell>
                                ))}
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </Stack>
                    )}
                  </motion.div>
                </AnimatePresence>
              </Box>

              {/* FIXED NAVIGATION BUT INSIDE CARD */}
              <Stack direction="row" justifyContent="space-between">
                <Button
                  disabled={activeStep === 0}
                  startIcon={<ArrowBack />}
                  onClick={() => setActiveStep((s) => s - 1)}
                >
                  Back
                </Button>
                {activeStep < steps.length - 1 ? (
                  <Button
                    variant="contained"
                    endIcon={<ArrowForward />}
                    onClick={handleNext}
                  >
                    Next
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    startIcon={<DownloadIcon />}
                    onClick={handleGenerate}
                  >
                    Generate Files
                  </Button>
                )}
              </Stack>
            </Stack>
          </Paper>
        </Container>
      </Box>

      {/* Footer */}
      <Box
        position="fixed"
        bottom={0}
        width="100%"
        textAlign="center"
        py={1}
        bgcolor="rgba(15,23,42,0.85)"
        borderTop="1px solid rgba(250,204,21,0.2)"
      >
        Copyright © 2025 Vyshnav M S. All rights reserved.
      </Box>
    </ThemeProvider>
  );
};

export default App;
