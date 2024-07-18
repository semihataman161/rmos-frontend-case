import React from 'react';
import { TextField, Grid, Paper, Typography, Select, MenuItem, InputLabel, FormControl } from '@mui/material';

interface IProps {
  ayKodu: string;
  baslangicTarihi: string;
  bitisTarihi: string;
  sistemTarihi: string;
  alisTarihi: string;
  konumSecenek: string;
  dovizSeciniz: string;
  yuzdeCik: string;
  type: string;
  grafikteCikacaklar: string;
  kalanlar: string;
  connKontenjan: string;
  fiiltreler: string;
  otelDep: string;
  occForecast: string;
  sirketSecimi: string;
  rap: string;
}

const Header: React.FC<IProps> = ({
  ayKodu,
  baslangicTarihi,
  bitisTarihi,
  sistemTarihi,
  alisTarihi,
  konumSecenek,
  dovizSeciniz,
  yuzdeCik,
  type,
  grafikteCikacaklar,
  kalanlar,
  connKontenjan,
  fiiltreler,
  otelDep,
  occForecast,
  sirketSecimi,
  rap,
}) => {
  // Example options for the Select component
  const ayKoduOptions = ['Option1', 'Option2', 'Option3'];
  const tarihOptions = ['Option1', 'Option2', 'Option3']; // Example options for tarih fields

  return (
    <Paper elevation={3} style={{ padding: 16, backgroundColor: '#e3f2fd' }}>
      <Grid container spacing={2} style={{ display: 'flex', flexDirection: 'row', gap: '16px' }}>
        {/* Section 1 */}
        <Grid item xs={12} sm={3} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', gap: '16px' }}>
          {[
            {
              label: 'Ay Kodu',
              value: ayKodu,
              options: ayKoduOptions,
            },
            {
              label: 'Başlangıç Tarihi',
              value: baslangicTarihi,
              options: tarihOptions,
            },
            {
              label: 'Bitiş Tarihi',
              value: bitisTarihi,
              options: tarihOptions,
            },
            {
              label: 'Sistem Tarihi',
              value: sistemTarihi,
              options: tarihOptions,
            },
            {
              label: 'Alış Tarihi',
              value: alisTarihi,
              options: tarihOptions,
            },
          ].map(({ label, value, options }) => (
            <div key={label} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <Typography variant="subtitle2" color="textSecondary">
                {label}
              </Typography>
              <FormControl fullWidth variant="outlined">
                <InputLabel>{label}</InputLabel>
                <Select
                  value={value}
                  label={label}
                  inputProps={{ readOnly: true }}
                  renderValue={(selected) => selected}
                >
                  {options.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
          ))}
        </Grid>

        {/* Section 2 */}
        <Grid item xs={12} sm={3} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', gap: '16px' }}>
          {[
            { label: 'Konum Secenek', value: konumSecenek },
            { label: 'Doviz Seçiniz', value: dovizSeciniz },
            { label: 'Type', value: type },
            { label: 'Yüzde Çıksın', value: yuzdeCik },
          ].map(({ label, value }) => (
            <div key={label} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <Typography variant="subtitle2" color="textSecondary">
                {label}
              </Typography>
              <TextField
                fullWidth
                variant="outlined"
                value={value}
                InputProps={{ readOnly: true }}
              />
            </div>
          ))}
        </Grid>

        {/* Section 3 */}
        <Grid item xs={12} sm={3} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', gap: '16px' }}>
          {[
            { label: 'Grafikte Çıkacaklar', value: grafikteCikacaklar },
            { label: 'Kalanlar', value: kalanlar },
            { label: 'Conn Kontenjan', value: connKontenjan },
            { label: 'Fiiltreler', value: fiiltreler },
            { label: 'Otel/Dep', value: otelDep },
            { label: 'Occ% Forecast', value: occForecast },
          ].map(({ label, value }) => (
            <div key={label} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <Typography variant="subtitle2" color="textSecondary">
                {label}
              </Typography>
              <TextField
                fullWidth
                variant="outlined"
                value={value}
                InputProps={{ readOnly: true }}
              />
            </div>
          ))}
        </Grid>

        {/* Section 4 */}
        <Grid item xs={12} sm={3} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', gap: '16px' }}>
          {[
            { label: 'Şirket Seçimi', value: sirketSecimi },
            { label: 'Rap', value: rap },
          ].map(({ label, value }) => (
            <div key={label} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <Typography variant="subtitle2" color="textSecondary">
                {label}
              </Typography>
              <TextField
                fullWidth
                variant="outlined"
                value={value}
                InputProps={{ readOnly: true }}
              />
            </div>
          ))}
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Header;