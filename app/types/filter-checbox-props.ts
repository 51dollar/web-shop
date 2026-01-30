export interface FilterChecboxProps {
    text: string;
    value: string;
    endAdornment?: React.ReactNode;
    onCheckedChange?: (checked: boolean) => void;
    checked?: boolean;
}