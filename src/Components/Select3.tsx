import React from 'react';
import Select from 'react-select';

interface MySelectProps<T extends Record<string, any>> {
    options: T[];
    valueKey: keyof T;
    labelKey: keyof T;
    value: T | null;
    onChange: (newValue: T | null) => void;
    placeholder?: string;
}

const Select3 = <T extends Record<string, any>>({ options, valueKey, labelKey, value, onChange, placeholder = 'Seleccione una opción', }: MySelectProps<T>): JSX.Element => {
    const selectOptions = options.map((option) => ({
        value: option[valueKey],
        label: option[labelKey] as string,
    }));

    return (
        <Select
            placeholder={placeholder}
            options={selectOptions}
            value={value ? { value: value[valueKey], label: value[labelKey] as string } : null}
            onChange={(newValue) => {
                if (!newValue) {
                    onChange(null);
                    return;
                }
                const selectedOption = options.find((option) => option[valueKey] === newValue.value);
                if (selectedOption) {
                    onChange(selectedOption);
                }
            }}
        />
    );
};

export default Select3;