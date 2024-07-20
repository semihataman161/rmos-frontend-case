import { ISectionConfig } from "@/types/Header";
import { SelectChangeEvent } from "@mui/material";

export const sections: ISectionConfig[] = [
    {
        elements: [
            {
                label: 'Ay Kodu',
                value: 'Haziran',
                type: 'select',
                options: ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'],
                onChange: (event: SelectChangeEvent<any>) => {
                    console.log('Ay Kodu changed to:', event.target.value);
                },
            },
            {
                label: 'Başlangıç Tarihi',
                value: '2024-06-01',
                type: 'date',
                onChange: (event: React.ChangeEvent<HTMLInputElement> | null, newValue?: Dayjs) => {
                    console.log('Başlangıç Tarihi changed to:', newValue?.format('DD.MM.YYYY'));
                },
            },
            {
                label: 'Bitiş Tarihi',
                value: '2024-06-30',
                type: 'date',
                onChange: (event: React.ChangeEvent<HTMLInputElement> | null, newValue?: Dayjs) => {
                    console.log('Bitiş Tarihi changed to:', newValue?.format('DD.MM.YYYY'));
                },
            },
            {
                label: 'Sistem Tarihi',
                value: '2024-07-06',
                type: 'date',
                onChange: (event: React.ChangeEvent<HTMLInputElement> | null, newValue?: Dayjs) => {
                    console.log('Sistem Tarihi changed to:', newValue?.format('DD.MM.YYYY'));
                },
            },
            {
                label: 'Alış Tarihi',
                value: '2024-07-06',
                type: 'date',
                onChange: (event: React.ChangeEvent<HTMLInputElement> | null, newValue?: Dayjs) => {
                    console.log('Alış Tarihi changed to:', newValue?.format('DD.MM.YYYY'));
                },
            },
        ],
    },
    {
        elements: [
            {
                label: 'Oda Tipi',
                value: '',
                type: 'select',
                options: [],
                onChange: (event: SelectChangeEvent<any>) => {
                    console.log('Oda Tipi changed to:', event.target.value);
                },
            },
            {
                label: 'Acenta',
                value: '',
                type: 'select',
                options: [],
                onChange: (event: SelectChangeEvent<any>) => {
                    console.log('Acenta changed to:', event.target.value);
                },
            },
            {
                label: 'For.Grubu',
                value: '',
                type: 'select',
                options: [],
                onChange: (event: SelectChangeEvent<any>) => {
                    console.log('For.Grubu changed to:', event.target.value);
                },
            },
            {
                label: 'Pazar',
                value: '',
                type: 'select',
                options: [],
                onChange: (event: SelectChangeEvent<any>) => {
                    console.log('Pazar changed to:', event.target.value);
                },
            },
            {
                label: 'Acenta.Grup',
                value: '',
                type: 'select',
                options: [],
                onChange: (event: SelectChangeEvent<any>) => {
                    console.log('Acenta.Grup changed to:', event.target.value);
                },
            },
        ],
    },
    {
        elements: [
            {
                label: 'Konum Seçenek',
                value: 'Verilen Konum',
                type: 'radio',
                options: ['Verilen Konum', 'İstenen Konum'],
                onChange: (event) => {
                    console.log('Verilen Konum changed to:', event.target.value);
                },
            },
            {
                label: 'Döviz Seçiniz',
                value: 'EURO',
                type: 'select',
                options: ["EURO", "DOLAR", "TL"],
                onChange: (event: SelectChangeEvent<any>) => {
                    console.log('Döviz Seçiniz changed to:', event.target.value);
                },
            },
            {
                label: 'Yüzde Çıksın',
                value: true,
                type: 'checkbox',
                onChange: (event) => {
                    console.log('Yüzde Çıksın changed:', (event.target as HTMLInputElement).checked);
                }
            }
        ],
    },
    {
        elements: [
            {
                label: 'Type',
                value: 'Confirmed',
                type: 'radio',
                options: ['Confirmed', 'Tentative', 'All'],
                onChange: (event) => {
                    console.log('Type changed to:', event.target.value);
                },
            },
        ],
    },
    {
        elements: [
            {
                label: 'Dolu Odalar',
                value: true,
                type: 'checkbox',
                onChange: (event) => {
                    console.log('Dolu Odalar changed:', (event.target as HTMLInputElement).checked);
                }
            },
            {
                label: 'Boş Odalar',
                value: true,
                type: 'checkbox',
                onChange: (event) => {
                    console.log('Boş Odalar changed:', (event.target as HTMLInputElement).checked);
                }
            },
            {
                label: 'Toplam(Kişi)',
                value: false,
                type: 'checkbox',
                onChange: (event) => {
                    console.log('Toplam(Kişi) changed:', (event.target as HTMLInputElement).checked);
                }
            },
            {
                label: 'Tentative',
                value: true,
                type: 'checkbox',
                onChange: (event) => {
                    console.log('Tentative changed:', (event.target as HTMLInputElement).checked);
                }
            }
        ],
    },
    {
        elements: [
            {
                label: 'Yetişkin',
                value: false,
                type: 'checkbox',
                onChange: (event) => {
                    console.log('Yetişkin changed:', (event.target as HTMLInputElement).checked);
                }
            },
            {
                label: 'Çocuk',
                value: false,
                type: 'checkbox',
                onChange: (event) => {
                    console.log('Çocuk changed:', (event.target as HTMLInputElement).checked);
                }
            },
            {
                label: 'Free',
                value: false,
                type: 'checkbox',
                onChange: (event) => {
                    console.log('Free changed:', (event.target as HTMLInputElement).checked);
                }
            }
        ],
    },
    {
        elements: [
            {
                label: 'Arızalı Odalar Çıksın',
                value: false,
                type: 'checkbox',
                onChange: (event) => {
                    console.log('Arızalı Odalar Çıksın changed:', (event.target as HTMLInputElement).checked);
                }
            },
            {
                label: 'Forecast Kalan',
                value: false,
                type: 'checkbox',
                onChange: (event) => {
                    console.log('Forecast Kalan changed:', (event.target as HTMLInputElement).checked);
                }
            },
            {
                label: 'Birleşen Odalar',
                value: false,
                type: 'checkbox',
                onChange: (event) => {
                    console.log('Birleşen Odalar changed:', (event.target as HTMLInputElement).checked);
                }
            },
            {
                label: 'PM(Sanal)',
                value: false,
                type: 'checkbox',
                onChange: (event) => {
                    console.log('PM(Sanal) changed:', (event.target as HTMLInputElement).checked);
                }
            }
        ],
    },
    {
        elements: [
            {
                label: 'Gelen Oda',
                value: false,
                type: 'checkbox',
                onChange: (event) => {
                    console.log('Gelen Oda changed:', (event.target as HTMLInputElement).checked);
                }
            },
            {
                label: 'Gelen Yetişkin',
                value: false,
                type: 'checkbox',
                onChange: (event) => {
                    console.log('Gelen Yetişkin changed:', (event.target as HTMLInputElement).checked);
                }
            },
            {
                label: 'Çocuk Paralı',
                value: false,
                type: 'checkbox',
                onChange: (event) => {
                    console.log('Çocuk Paralı changed:', (event.target as HTMLInputElement).checked);
                }
            },
            {
                label: 'Birleş(Trace-)',
                value: false,
                type: 'checkbox',
                onChange: (event) => {
                    console.log('Birleş(Trace-) changed:', (event.target as HTMLInputElement).checked);
                }
            }
        ],
    },
    {
        elements: [
            {
                label: 'Giden Oda',
                value: false,
                type: 'checkbox',
                onChange: (event) => {
                    console.log('Giden Oda changed:', (event.target as HTMLInputElement).checked);
                }
            },
            {
                label: 'Giden Yetişkin',
                value: false,
                type: 'checkbox',
                onChange: (event) => {
                    console.log('Giden Yetişkin changed:', (event.target as HTMLInputElement).checked);
                }
            },
            {
                label: 'Giden Çocuk Paralı',
                value: false,
                type: 'checkbox',
                onChange: (event) => {
                    console.log('Giden Çocuk Paralı changed:', (event.target as HTMLInputElement).checked);
                }
            },
            {
                label: 'Havayolu Mürettabatı',
                value: false,
                type: 'checkbox',
                onChange: (event) => {
                    console.log('Havayolu Mürettabatı changed:', (event.target as HTMLInputElement).checked);
                }
            }
        ],
    },
    {
        elements: [
            {
                label: 'PM(Sanal) Satışa Dahil',
                value: true,
                type: 'checkbox',
                onChange: (event) => {
                    console.log('PM(Sanal) Satışa Dahil changed:', (event.target as HTMLInputElement).checked);
                }
            },
            {
                label: 'ÖnForecast Fiyatlı',
                value: false,
                type: 'checkbox',
                onChange: (event) => {
                    console.log('ÖnForecast Fiyatlı changed:', (event.target as HTMLInputElement).checked);
                }
            }
        ],
    },
    {
        elements: [
            {
                label: 'Şirket Seçimi',
                value: 'Rmos Victory Be mine',
                type: 'select',
                options: ['Rmos Victory Be mine'],
                onChange: (event: SelectChangeEvent<any>) => {
                    console.log('Şirket Seçimi changed to:', event.target.value);
                },
            },
            {
                label: 'Ozet Consolide Sirket',
                value: 'Rmos Victory Be mine',
                type: 'select',
                options: ['Rmos Victory Be mine'],
                onChange: (event: SelectChangeEvent<any>) => {
                    console.log('Ozet Consolide Sirket changed to:', event.target.value);
                },
            },
        ],
    },
    {
        elements: [
            {
                label: 'Rap',
                value: '',
                type: 'select',
                options: [''],
                onChange: (event: SelectChangeEvent<any>) => {
                    console.log('Rap changed to:', event.target.value);
                },
            },
        ],
    }
];