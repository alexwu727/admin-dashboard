import React from 'react'
import { Search } from '@mui/icons-material'
import { IconButton, TextField, InputAdornment, useTheme } from '@mui/material'
import {
    GridToolbarContainer,
    GridToolbarExport,
    GridToolbarDensitySelector,
    GridToolbarColumnsButton,
} from '@mui/x-data-grid'
import FlexBetween from './FlexBetween'

const DataGridCustomToolbar = ({ searchValue, setSearchValue, setSearch }) => {
    const theme = useTheme()
    return (
        <GridToolbarContainer>
            <FlexBetween width="100%">
                <FlexBetween>
                    <GridToolbarColumnsButton sx={{ color: theme.palette.secondary[100] }} />
                    <GridToolbarDensitySelector sx={{ color: theme.palette.secondary[100] }} />
                    <GridToolbarExport sx={{ color: theme.palette.secondary[100] }} />
                </FlexBetween>
                <TextField
                    label="Search..."
                    sx={{ mb: "0.5rem", width: "15rem" }}
                    onChange={(e) => setSearchValue(e.target.value)}
                    value={searchValue}
                    placeholder="Search"
                    variant='standard'
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton onClick={() => {
                                    setSearch(searchValue)
                                    setSearchValue("")
                                }}>
                                    <Search />
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
            </FlexBetween>
        </GridToolbarContainer>
    )
}

export default DataGridCustomToolbar