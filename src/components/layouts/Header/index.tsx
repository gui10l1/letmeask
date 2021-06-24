import { FC, useCallback } from 'react';
import { FiCopy } from 'react-icons/fi';

import logo from '../../../assets/images/logo.svg';
import {
  Container,
  ButtonWrapper,
  CodeButton,
  FinishRoomButton,
} from './styles';

interface IHeader {
  code: string;
  isAdmin: boolean;
}

const Header: FC<IHeader> = ({ isAdmin, code }) => {
  const handleCopyCode = useCallback(() => {
    navigator.clipboard.writeText(code);
  }, [code]);

  return (
    <Container>
      <img src={logo} alt="Logo" />

      <ButtonWrapper>
        <CodeButton>
          <button type="button" onClick={handleCopyCode}>
            <FiCopy size={22} color="#fff" />
          </button>

          <span>Sala {code}</span>
        </CodeButton>

        {isAdmin && <FinishRoomButton>Finalizar sala</FinishRoomButton>}
      </ButtonWrapper>
    </Container>
  );
};

export { Header };
