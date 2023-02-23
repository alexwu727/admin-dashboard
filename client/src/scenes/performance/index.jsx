import React from 'react'
import { useGetUserPerformanceQuery } from 'state/api'
import { Box, useTheme } from '@mui/material'
import Header from 'components/Header'
import { DataGrid } from '@mui/x-data-grid'
import { useSelector } from 'react-redux'
import DataGridCustomColumnMenu from 'components/DataGridCustomColumnMenu'

const Performance = () => {
    const userId = useSelector((state) => state.global.userId)
    const theme = useTheme()
    const { data, isLoading } = useGetUserPerformanceQuery(userId)
    const columns = [
        { field: '_id', headerName: 'ID', flex: 1 },
        { field: 'userId', headerName: 'User ID', flex: 1 },
        { field: 'createdAt', headerName: 'Date', flex: 1 },
        { field: "products", headerName: "# of Products", flex: 0.5, sortable: false, renderCell: (params) => params.value.length, },
        { field: "cost", headerName: "Cost", flex: 1, renderCell: (params) => `$${Number(params.value).toFixed(2)}` },
    ]
    return (
        <Box m="1.5rem 2.5rem">
            <Header title="Performance" subtitle={"Track your affiliate sales performance."} />
            <Box mt="40px" height="75vh"
                sx={{
                    '& .MuiDataGrid-root': {
                        border: "none",
                    },
                    '& .MuiDataGrid-cell': {
                        borderBottom: "none"
                    },
                    '& .MuiDataGrid-columnHeaders': {
                        backgroundColor: theme.palette.background.alt,
                        color: theme.palette.secondary[100],
                        borderBottom: "none"
                    },
                    '& .MuiDataGrid-virtualScroller': {
                        backgroundColor: theme.palette.primary.light,
                    },
                    '& .MuiDataGrid-footerContainer': {
                        backgroundColor: theme.palette.background.alt,
                        color: theme.palette.secondary[100],
                        borderTop: "none"
                    },
                    '& .MuiDataGrid-toolbarContainer .MuiButtoon-text': {
                        color: `${theme.palette.secondary[200]} !important`,
                    },
                    '*::-webkit-scrollbar': {
                        width: '0.4em'
                    },
                    '*::-webkit-scrollbar-thumb': {
                        backgroundColor: theme.palette.secondary[300],
                    }
                }
                } >
                <DataGrid
                    rows={(data && data.sales) || []}
                    columns={columns}
                    loading={isLoading || !data}
                    rowsPerPageOptions={[10, 25, 50, 100]}
                    getRowId={(row) => row._id}
                    components={{
                        ColumnMenu: DataGridCustomColumnMenu,
                    }}
                />
            </Box>
        </Box >
    )
}

export default Performance