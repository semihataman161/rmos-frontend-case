import { SelectChangeEvent } from '@mui/material';

export interface IElementConfig {
    label: string;
    value: string | Date | boolean;
    type: 'text' | 'select' | 'date' | 'radio' | 'checkbox';
    options?: string[];
    onChange?: (event: React.ChangeEvent<HTMLInputElement> | SelectChangeEvent<any>, newValue?: any) => void;
}

// Define the `ISectionConfig` interface
export interface ISectionConfig {
    elements: IElementConfig[];
}