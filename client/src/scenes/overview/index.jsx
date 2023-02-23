import React, { useState } from 'react'
import { useGetSalesQuery } from 'state/api'
import { Box, useTheme, FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import Header from 'components/Header'
import OverviewChart from 'components/OverviewChart'

const Overview = () => {
    const theme = useTheme()

    const [view, setView] = useState('totalSales')
    return (
        <Box m="1.5rem 2.5rem">
            <Header title="Overview" subtitle="Overview of general revenue and profit" />
            <Box height="75vh">
                <FormControl sx={{ mt: "1rem" }}>
                    <InputLabel>View</InputLabel>
                    <Select value={view} label="View" onChange={(e) => setView(e.target.value)}>
                        <MenuItem value="totalSales">Total Sales</MenuItem>
                        <MenuItem value="totalUnits">Total Units</MenuItem>
                        <MenuItem value="accumulatedUnits">Accumulated Units</MenuItem>
                        <MenuItem value="accumulatedSales">Accumulated Sales</MenuItem>
                    </Select>
                </FormControl>
                <OverviewChart view={view} />
            </Box>
        </Box>
    )
}

export default Overview