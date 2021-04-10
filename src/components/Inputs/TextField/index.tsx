import React, { ChangeEvent, FocusEvent, useEffect, useRef } from 'react';
import clsx from 'clsx';
import { bemify } from '@thenewboston/utils';

import '../../../styles/colors.css';
import '../../../styles/font.css';
import './TextField.scss';

export enum TextFieldType {
  text = 'text',
  number = 'number',
}

export interface TextFieldProps {
  /** Optional. Extra classNames you can pass. */
  className?: string;
  /** Optional. Disables the input. */
  disabled?: boolean;
  /** Optional. Places a red outline. */
  error?: boolean;
  /** Optional. Determines if input is focused. */
  focused?: boolean;
  /** Optional. Name of input for forms. */
  name?: string;
  /** Optional. Adds an onBlur event handler. */
  onBlur?(e: FocusEvent<HTMLInputElement>): void;
  /** Optional. Adds an onChange event handler. Goes with 'value' to make it a controlled input. */
  onChange?(e: ChangeEvent<HTMLInputElement>): void;
  /** Optional. input placeholder. */
  placeholder?: string;
  /** Optional. Input type. */
  type?: TextFieldType;
  /** Optional. Value of the input. Goes with 'onChange' to make it a controlled input. */
  value?: string;
}

/**
 * A TextField Input component.
 */
const TextField = function({
  className,
  disabled = false,
  error = false,
  focused = false,
  name,
  onBlur,
  onChange,
  placeholder = 'Enter',
  type = TextFieldType.text,
  value,
}: TextFieldProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (focused && inputRef.current) {
      inputRef.current!.focus();
    }
  }, [focused, inputRef]);

  return (
    <input
      className={clsx('TextField', className, {
        'TextField--error': error,
        ...bemify(className, '--error', error),
      })}
      disabled={disabled}
      name={name}
      onBlur={onBlur}
      onChange={onChange}
      placeholder={placeholder}
      ref={inputRef}
      type={type}
      value={value}
    />
  );
};

export { TextField };
