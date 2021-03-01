import React, { ReactNode, useMemo } from 'react';
import ReactSelect, {
  ActionMeta,
  FocusEventHandler,
  FormatOptionLabelMeta,
} from 'react-select';
import ReactSelectCreatable from 'react-select/creatable';
import { ValueType } from 'react-select/src/types';
import clsx from 'clsx';
import { bemify } from '@thenewboston/utils';

import { InputOption } from '../../../types';
import '../../../styles/colors.css';
import '../../../styles/font.css';
import './Select.scss';

export interface BaseSelectProps {
  className?: string;
  clearable?: boolean;
  creatable?: boolean;
  disabled?: boolean;
  error?: boolean;
  focused?: boolean;
  menuPortalTarget?: HTMLElement;
  name?: string;
  onBlur?: FocusEventHandler;
  onChange?(
    value: ValueType<InputOption, any>,
    actionMeta?: ActionMeta<InputOption>
  ): void;
  options: InputOption[];
  placeholder?: string;
  searchable?: boolean;
  value?: InputOption | null;
}

export interface SelectProps extends BaseSelectProps {
  filterOption?(option: InputOption, rawInput: string): boolean;
  formatOptionLabel?(
    option: InputOption,
    labelMeta: FormatOptionLabelMeta<InputOption, any>
  ): ReactNode;
}

const Select = function({
  className,
  clearable = false,
  creatable = false,
  disabled = false,
  error = false,
  filterOption,
  focused = false,
  formatOptionLabel,
  searchable = true,
  menuPortalTarget = document.getElementById('dropdown-root')!,
  name,
  onBlur,
  onChange,
  options,
  placeholder = 'Select',
  value,
}: SelectProps) {
  const formattedOptions = useMemo(
    () =>
      options.map(
        ({ disabled: optionDisabled, label, value: optionValue }) => ({
          isDisabled: optionDisabled,
          label,
          value: optionValue,
        })
      ),
    [options]
  );

  const getOptionLabel = ({ label, value: valueParam }: InputOption): string =>
    label || valueParam;

  const getSharedSelectProps = () => {
    return {
      autoFocus: focused,
      className: clsx('Select', className, {
        'Select--error': error,
        ...bemify(className, '--error', error),
      }),
      classNamePrefix: 'Select',
      filterOption,
      formatOptionLabel,
      getOptionLabel,
      isClearable: clearable,
      isDisabled: disabled,
      isSearchable: searchable,
      menuPortalTarget,
      name,
      onBlur,
      onChange,
      onKeyDown: handleKeyDown,
      options: formattedOptions,
      placeholder,
      value,
    };
  };

  const handleKeyDown = (e: any) => {
    if (!e.target.value && e.key === 'Backspace') {
      onChange?.(null);
    }
  };

  return creatable ? (
    <ReactSelectCreatable
      formatCreateLabel={() => undefined}
      {...getSharedSelectProps()}
    />
  ) : (
    <ReactSelect {...getSharedSelectProps()} />
  );
};

export { Select };
