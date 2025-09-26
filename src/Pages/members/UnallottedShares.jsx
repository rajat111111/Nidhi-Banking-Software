import React from "react";
import { Box, Typography, Grid, Paper } from "@mui/material";

const unallottedRanges = [
    { start: 91127, end: 99999 },
    { start: 100011, end: 200021 },
    { start: 200032, end: 200051 },
    { start: 200062, end: 200106 },
    { start: 200148, end: 370000 },
    { start: 370031, end: 399999 },
    { start: 450001, end: 499999 },
    { start: 520001, end: 520126 },
    { start: 10000687, end: 10000696 },
    { start: 650012, end: 650096 },
];

const UnallottedShares = () => {
    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
                Unallotted Share
            </Typography>

            <Paper sx={{ p: 3, backgroundColor: "#f7f8fa" }}>
                <Grid container spacing={3}>
                    {unallottedRanges.map((range, index) => (
                        <React.Fragment key={index}>
                            <Grid item xs={5} sm={3} md={2}>
                                <Typography variant="body1" fontWeight={500}>
                                    {range.start}
                                </Typography>
                            </Grid>
                            <Grid item xs={2} sm={1} md={1} textAlign="center">
                                <Typography variant="body1">→</Typography>
                            </Grid>
                            <Grid item xs={5} sm={3} md={2}>
                                <Typography variant="body1" fontWeight={500}>
                                    {range.end}
                                </Typography>
                            </Grid>
                        </React.Fragment>
                    ))}
                </Grid>
            </Paper>
        </Box>
    );
};

export default UnallottedShares;
