import { useField } from '@unform/core';
import { useRef, useEffect, FC, HTMLAttributes } from 'react';

import { Container } from './styles';

interface IInput extends HTMLAttributes<HTMLInputElement> {
  name: string;
}

const Input: FC<IInput> = ({ name, ...rest }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { defaultValue, fieldName, registerField } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  return (
    <Container
      name={name}
      ref={inputRef}
      defaultValue={defaultValue}
      {...rest}
    />
  );
};

export { Input };
