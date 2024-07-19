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
  Radio
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { ISectionConfig } from '@/types/Header';
import dayjs, { Dayjs } from 'dayjs';
import { SelectChangeEvent } from '@mui/material';

interface IProps {
  sections?: ISectionConfig[];
}

const Header: React.FC<IProps> = ({ sections = [] }) => {
  const [localSections, setLocalSections] = useState<ISectionConfig[]>(sections);

  const handleChange = (sectionIndex: number, elementIndex: number) => (
    event: React.ChangeEvent<HTMLInputElement> | SelectChangeEvent<any>,
    newValue?: any
  ) => {
    const updatedSections = [...localSections];
    const section = updatedSections[sectionIndex];
    const element = section.elements[elementIndex];

    if (element.type === 'select') {
      section.elements[elementIndex] = {
        ...element,
        value: event.target.value,
      };
    } else if (element.type === 'date') {
      section.elements[elementIndex] = {
        ...element,
        value: newValue ? newValue.toISOString() : null,
      };
    } else if (element.type === 'radio') {
      section.elements[elementIndex] = {
        ...element,
        value: event.target.value,
      };
    } else {
      section.elements[elementIndex] = {
        ...element,
        value: event.target.value,
      };
    }

    setLocalSections(updatedSections);

    if (element.onChange) {
      element.onChange(event, newValue);
    }
  };

  return (
    <Paper elevation={3} style={{ padding: 16, backgroundColor: '#e3f2fd' }}>
      <Grid container spacing={2} style={{ display: 'flex', flexDirection: 'row', gap: '16px' }}>
        {localSections.map((section, sectionIndex) => (
          <Grid
            key={sectionIndex}
            item
            xs={12}
            sm={3}
            style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', gap: '16px' }}
          >
            {section.elements.map(({ label, value, type, options }, elementIndex) => (
              <div key={elementIndex} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
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
                    value={value ? dayjs(value) : null}
                    onChange={(newValue) => handleChange(sectionIndex, elementIndex)(null, newValue)}
                    slots={{ textField: (params) => <TextField {...params} fullWidth variant="outlined" /> }}
                    inputFormat="DD.MM.YYYY"
                  />
                ) : type === 'radio' ? (
                  <FormControl component="fieldset">
                    <InputLabel>{label}</InputLabel>
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

export default Header;