import { Box } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { DataGrid, GridColDef, GridCellParams, gridClasses } from '@mui/x-data-grid';
import { styled } from '@mui/material/styles';

interface ITableProps {
    data: { id: number;[key: string]: any }[];
    headers: { field: string; headerName?: string; sortable?: boolean; valueGetter?: (value: any, row: any) => any }[];
    loading?: boolean;
}

const StyledGridOverlay = styled('div')(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    '& .no-rows-message': {
        marginTop: theme.spacing(2),
        color: theme.palette.text.secondary,
    },
}));

function CustomNoRowsOverlay() {
    return (
        <StyledGridOverlay>
            <CircularProgress />
            <Box className="no-rows-message">No rows</Box>
        </StyledGridOverlay>
    );
}

export default function Table({ data, headers, loading = false }: ITableProps) {
    const columns: GridColDef[] = headers.map(({ field, headerName, sortable = true, valueGetter }) => ({
        field,
        headerName: headerName ?? field.charAt(0).toUpperCase() + field.slice(1),
        sortable: sortable,
        width: 150,
        valueGetter,
    }));

    const getRowClassName = (params: GridCellParams<any, any, number>) => {
        const lastRowIndex = data.length - 1;
        return params.row.id === data[lastRowIndex].id ? 'last-row' : '';
    };

    return (
        <Box
            sx={{
                height: '100%',
                width: '100%',
                [`.${gridClasses.cell}.last-row`]: {
                    backgroundColor: '#90EE90',
                    color: '#000000',
                    border: 1,
                    borderColor: 'primary.light',
                },
            }}
        >
            <DataGrid
                rows={data}
                columns={columns}
                slots={{ noRowsOverlay: loading ? CustomNoRowsOverlay : undefined }}
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 20,
                        },
                    },
                }}
                pageSizeOptions={[20]}
                disableRowSelectionOnClick
                loading={loading}
                disableColumnFilter
                getCellClassName={getRowClassName}
            />
        </Box>
    );
}
