import { formatDate, getDayName } from '@/utils/date';
import { formatNumberByPrecision } from '@/utils/number';

export const forecastTableHeaders = [
    {
        field: "Tarih",
        headerName: 'Tarih',
        valueGetter: (value: any, row: any) => formatDate(value)
    },
    { field: "Mevcut(Net)", headerName: 'Mevcut' },
    { field: "Net Oda", headerName: 'Oda' },
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

export const blackListTableHeaders = [
    { field: "Adi", headerName: 'Adı' },
    { field: "Soy", headerName: 'Soyadı' },
    { field: "Tcno", headerName: 'TCKN' },
    { field: "Kimlik_no", headerName: 'Kimlik No' },
    {
        field: "Dogum_tarihi",
        headerName: 'Doğum Tarihi',
        valueGetter: (value: any, row: any) => formatDate(value)
    },
    {
        field: "Sistem_tarihi",
        headerName: 'Sistem Tarihi',
        valueGetter: (value: any, row: any) => formatDate(value)
    },
    { field: "Aciklama", headerName: 'Açıklama' },
    { field: "Sistem_grubu", headerName: 'Grubu' },
    { field: "Ulke_xml", headerName: 'Milliyet' },
    { field: "Kulanici", headerName: 'Kullanıcı' },
];