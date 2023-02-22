import React, { useState } from 'react'
import { useGetTransactionsQuery } from 'state/api'
import { DataGrid } from '@mui/x-data-grid'
import Header from 'components/Header'
import { Box, useTheme } from '@mui/material'
import DataGridCustomToolbar from 'components/DataGridCustomToolbar'

const Transactions = () => {
    const theme = useTheme()
    // values to be sent to the server
    const [page, setPage] = useState(1)
    const [pageSize, setPageSize] = useState(10)
    const [sort, setSort] = useState({})
    const [search, setSearch] = useState("")
    const [searchValue, setSearchValue] = useState("")

    const { data, isLoading } = useGetTransactionsQuery(
        { page, pageSize, sort: JSON.stringify(sort), search },
    )

    const columns = [
        { field: '_id', headerName: 'ID', flex: 1 },
        { field: 'userId', headerName: 'User ID', flex: 1 },
        { field: 'createdAt', headerName: 'Created At', flex: 1 },
        { field: 'products', headerName: '# of Products', flex: 0.5, sortable: false, renderCell: (params) => params.value.length },
        { field: 'cost', headerName: 'Cost', flex: 1, renderCell: (params) => `$${Number(params.value).toFixed(2)}` },
    ]

    return (
        <Box m="1.5rem 2.5rem">
            <Header title="Transactions" subtitle={`Showing ${data?.transactions.length} of ${data?.total} transactions`} />
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
                    rows={(data && data.transactions) || []}
                    columns={columns}
                    loading={isLoading || !data}
                    getRowId={(row) => row._id}
                    rowCount={data && data.total || 0}
                    pagination
                    page={page - 1}
                    pageSize={pageSize}
                    rowsPerPageOptions={[10, 25, 50, 100]}
                    paginationMode="server"
                    sortingMode='server'
                    onPageChange={(newPage) => setPage(newPage + 1)}
                    onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                    onSortModelChange={(newSort) => setSort(...newSort)}
                    // custom toolbar
                    components={{ Toolbar: DataGridCustomToolbar }}
                    componentsProps={{
                        toolbar: { searchValue, setSearchValue, setSearch },
                    }}

                />
            </Box>
        </Box>
    )
}

export default Transactions