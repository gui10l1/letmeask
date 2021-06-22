import { ButtonHTMLAttributes, ComponentType, FC } from 'react';
import { IconBaseProps } from 'react-icons';

import { Container } from './styles';

interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: ComponentType<IconBaseProps>;
  img?: string;
  backgroundColor: string;
}

const Button: FC<IButton> = ({ icon: Icon, img, children, ...rest }) => {
  return (
    <Container {...rest}>
      {Icon && <Icon size={22} />}
      {img && <img src={img} alt="Button reference" />}
      {children}
    </Container>
  );
};

export { Button };
