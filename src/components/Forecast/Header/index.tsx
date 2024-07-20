import React, { useState } from 'react';
import {
  Grid,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
  Typography,
  Checkbox
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { IHeaderSectionConfig } from '@/types/Forecast';
import dayjs from 'dayjs';
import { SelectChangeEvent } from '@mui/material';

interface IProps {
  sections?: IHeaderSectionConfig[];
}

const ForecastHeader: React.FC<IProps> = ({ sections = [] }) => {
  const [localSections, setLocalSections] = useState<IHeaderSectionConfig[]>(sections);

  const handleChange = (sectionIndex: number, elementIndex: number) => (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<any> | null,
    newValue?: any
  ) => {
    const updatedSections = [...localSections];
    const section = updatedSections[sectionIndex];
    const element = section.elements[elementIndex];

    if (element.type === 'select') {
      section.elements[elementIndex] = {
        ...element,
        value: (event as SelectChangeEvent<any>).target.value,
      };
    } else if (element.type === 'date') {
      section.elements[elementIndex] = {
        ...element,
        value: newValue ? newValue.toISOString() : null,
      };
    } else if (element.type === 'radio') {
      section.elements[elementIndex] = {
        ...element,
        value: (event as React.ChangeEvent<HTMLInputElement>).target.value,
      };
    } else if (element.type === 'checkbox') {
      section.elements[elementIndex] = {
        ...element,
        value: (event as React.ChangeEvent<HTMLInputElement>).target.checked,
      };
    } else {
      section.elements[elementIndex] = {
        ...element,
        value: (event as React.ChangeEvent<HTMLInputElement>).target.value,
      };
    }

    setLocalSections(updatedSections);

    if (element.onChange) {
      element.onChange(event, newValue);
    }
  };

  return (
    <Paper elevation={3} style={{ padding: 16, backgroundColor: '#f0f0f0' }}>
      <Grid container spacing={2} style={{ display: 'flex', flexDirection: 'row', gap: '16px', padding: '25px' }}>
        {localSections.map((section, sectionIndex) => (
          <Grid
            key={sectionIndex}
            item
            xs={12}
            sm={1}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              gap: '10px',
              border: '1px solid #ccc',
              borderRadius: '8px',
              padding: '10px',
              maxWidth: { xs: 'none', sm: '190px' },
            }}
          >
            {section.elements.map(({ label, value, type, options }, elementIndex) => (
              <div key={elementIndex} style={{ display: 'flex', flexDirection: 'column' }}>
                {type === 'select' ? (
                  <FormControl fullWidth variant="outlined">
                    <InputLabel>{label}</InputLabel>
                    <Select
                      value={value}
                      label={label}
                      onChange={handleChange(sectionIndex, elementIndex)}
                    >
                      {options?.map((option) => (
                        <MenuItem key={option} value={option}>
                          {option}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                ) : type === 'date' ? (
                  <DatePicker
                    label={label}
                    value={typeof value === 'string' || value instanceof Date ? dayjs(value) : null}
                    onChange={(newValue) => handleChange(sectionIndex, elementIndex)(null, newValue)}
                    slots={{ textField: (params) => <TextField {...params} fullWidth variant="outlined" /> }}
                    format="DD.MM.YYYY"
                  />
                ) : type === 'radio' ? (
                  <FormControl component="fieldset">
                    <Typography>{label}</Typography>
                    <RadioGroup
                      value={value}
                      onChange={handleChange(sectionIndex, elementIndex)}
                    >
                      {options?.map((option) => (
                        <FormControlLabel
                          key={option}
                          value={option}
                          control={<Radio />}
                          label={option}
                        />
                      ))}
                    </RadioGroup>
                  </FormControl>
                ) : type === 'checkbox' ? (
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={!!value}
                        onChange={handleChange(sectionIndex, elementIndex)}
                      />
                    }
                    label={label}
                  />
                ) : (
                  <TextField
                    label={label}
                    value={value}
                    type="text"
                    InputProps={{ readOnly: true }}
                    variant="outlined"
                    fullWidth
                    onChange={(event) => handleChange(sectionIndex, elementIndex)(event)}
                  />
                )}
              </div>
            ))}
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
};

export default ForecastHeader;