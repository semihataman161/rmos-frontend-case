import { formatDate, getDayName } from '@/utils/dates';
import { formatNumberByPrecision } from '@/utils/numbers';

export const tableHeaders = [
    {
        field: "Tarih",
        headerName: 'Tarih',
        valueGetter: (value: any, row: any) => formatDate(value)
    },
    { field: "Mevcut", headerName: 'Mevcut' },
    { field: "Oda", headerName: 'Oda' },
    { field: "Yetişkin", headerName: 'Yetişkin' },
    { field: "Çocuk", headerName: 'Çocuk' },
    { field: "Free", headerName: 'Free' },
    { field: "Toplam Kişi", headerName: 'Top.Kisi' },
    { field: "Pax(P)", headerName: 'Pax' },
    {
        field: "Yuzde%(Net)",
        headerName: 'Net %',
        sortable: false,
        valueGetter: (value: any, row: any) => `%${formatNumberByPrecision(value * 100, 3)}`,
    },
    { field: "Son Durum", headerName: 'Son durum' },
    {
        field: "Package Tutar",
        headerName: 'Package',
        sortable: false,
        valueGetter: (value: any, row: any) => formatNumberByPrecision(value, 2),
    },
    { field: "Gun Tarih", headerName: 'Gun Tarih' },
    {
        field: "Gün İsmi",
        headerName: 'Gün İsmi',
        valueGetter: (value: any, row: any) => getDayName(row["Gun Tarih"])
    },
    {
        field: "Pax(Y/C2)",
        headerName: 'Pax(Y+C/2)',
        sortable: false,
        valueGetter: (value: any, row: any) => formatNumberByPrecision(value, 2),
    },
];