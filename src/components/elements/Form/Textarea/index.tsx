import { useRef, useEffect, FC, TextareaHTMLAttributes } from 'react';
import { useField } from '@unform/core';

import { Container } from './styles';

interface ITextarea extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: string;
}

const Textarea: FC<ITextarea> = ({ name, ...rest }) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { defaultValue, fieldName, registerField } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: textareaRef.current,
      path: 'value',
    });
  }, [registerField, fieldName]);

  return (
    <Container
      ref={textareaRef}
      rows={7 || rest.rows}
      defaultValue={defaultValue}
      {...rest}
    />
  );
};

export { Textarea };
