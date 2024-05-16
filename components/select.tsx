'use client';

import { Option } from '@/hooks/use-options';
import SelectComponent from 'react-select';
import { SingleValue } from 'react-select';
import { useMemo } from 'react';

interface ISelect {
  onChange: (value?: string) => void;
  options: Option[];
  value?: string | null | undefined;
  disabled?: boolean;
  placeholder?: string;
}

export const Select: React.FC<ISelect> = (props) => {
  const { onChange, options = [], disabled, placeholder, value } = props;

  const onSelect = (option: SingleValue<Option>) => {
    onChange(option?.value);
  };

  const formattedValue = useMemo(() => {
    return options.find((option) => option.value === value);
  }, [options, value]);

  return (
    <SelectComponent
      placeholder={placeholder}
      className="h-10 text-sm"
      value={formattedValue}
      onChange={onSelect}
      options={options}
      isDisabled={disabled}
      isClearable
      styles={{
        control: (base) => ({
          ...base,
          borderColor: '#e2e8f0',
          ':hover': {
            borderColor: '#e2e8f0',
          },
        }),
      }}
    />
  );
};
