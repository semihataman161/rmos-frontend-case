import { SelectChangeEvent } from '@mui/material';

// Define the `IElementConfig` interface with `onChange` handler
export interface IElementConfig {
    label: string;
    value: string | Date;
    type: 'text' | 'select' | 'date' | 'radio';
    options?: string[];
    onChange?: (event: React.ChangeEvent<HTMLInputElement> | SelectChangeEvent<any>, newValue?: any) => void;
}

// Define the `ISectionConfig` interface
export interface ISectionConfig {
    elements: IElementConfig[];
}