import { Box } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { DataGrid, GridColDef, GridCellParams, gridClasses, GridActionsCellItem } from '@mui/x-data-grid';
import { styled } from '@mui/material/styles';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

interface ITableProps {
    data: { id: number; [key: string]: any }[];
    headers: { field: string; headerName?: string; sortable?: boolean; valueGetter?: (value: any, row: any) => any }[];
    loading?: boolean;
    isAggregationAllowed?: boolean;
    onDelete?: (id: number) => void;
    onUpdate?: (data: any) => void;
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

export default function Table({
    data,
    headers,
    loading = false,
    isAggregationAllowed = false,
    onDelete,
    onUpdate
}: ITableProps) {
    const columns: GridColDef[] = [
        ...headers.map(({ field, headerName, sortable = true, valueGetter }) => ({
            field,
            headerName: headerName ?? field.charAt(0).toUpperCase() + field.slice(1),
            sortable: sortable,
            width: 150,
            valueGetter: (value: any, row: any) => {
                if (isAggregationAllowed && row.id === data[data.length - 1]?.id && value !== '' && value !== undefined) {
                    return `Toplam: ${valueGetter ? valueGetter(value, row) : value}`;
                }
                return valueGetter ? valueGetter(value, row) : value;
            },
        })),
        ...(onUpdate || onDelete ? [{
            field: 'actions',
            headerName: 'İşlemler',
            type: 'actions',
            width: 150,
            renderCell: (params: GridCellParams) => (
                <Box sx={{ display: 'flex', gap: 1 }}>
                    {onUpdate && (
                        <GridActionsCellItem
                            icon={<EditIcon />}
                            label="Update"
                            onClick={() => onUpdate(params.row)}
                            color="primary"
                        />
                    )}
                    {onDelete && (
                        <GridActionsCellItem
                            icon={<DeleteIcon />}
                            label="Delete"
                            onClick={() => onDelete(params.row.id)}
                            color="error"
                        />
                    )}
                </Box>
            ),
        }] : []),
    ];

    const getRowClassName = (params: GridCellParams<any, any, number>) => {
        if (!isAggregationAllowed) return '';

        const lastRowIndex = data.length - 1;
        return params.row.id === data[lastRowIndex].id ? 'last-row' : '';
    };

    return (
        <Box
            sx={{
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
                            pageSize: 15,
                        },
                    },
                }}
                pageSizeOptions={[15, 50, 100]}
                disableRowSelectionOnClick
                loading={loading}
                disableColumnFilter
                getCellClassName={getRowClassName}
                autoHeight={true}
            />
        </Box>
    );
}