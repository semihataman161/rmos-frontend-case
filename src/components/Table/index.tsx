import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { styled } from '@mui/material/styles';

interface ITableProps {
    data: { id: number; [key: string]: any }[];
    headers: { field: string; headerName?: string; valueGetter?: (value: any, row: any) => any }[];
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
    const columns: GridColDef[] = headers.map(({ field, headerName, valueGetter }) => ({
        field,
        headerName: headerName ?? field.charAt(0).toUpperCase() + field.slice(1), 
        width: 150,
        valueGetter,
    }));

    return (
        <Box sx={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={data}
                columns={columns}
                slots={{ noRowsOverlay: loading ? CustomNoRowsOverlay : undefined }}
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 5,
                        },
                    },
                }}
                pageSizeOptions={[5]}
                disableRowSelectionOnClick
                loading={loading}
                disableColumnFilter
            />
        </Box>
    );
}
