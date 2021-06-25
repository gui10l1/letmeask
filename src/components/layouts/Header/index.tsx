import { FC, useCallback } from 'react';
import { FiCopy } from 'react-icons/fi';
import { useHistory, useRouteMatch } from 'react-router-dom';

import logo from '../../../assets/images/logo.svg';
import { database } from '../../../services/firebase';
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

interface IParams {
  roomId: string;
}

const Header: FC<IHeader> = ({ isAdmin, code }) => {
  const { params } = useRouteMatch<IParams>();
  const { push } = useHistory();

  const handleCopyCode = useCallback(() => {
    navigator.clipboard.writeText(code);
  }, [code]);

  const handleDeleteRoom = useCallback(async () => {
    if (params.roomId) {
      await database.ref(`rooms/${params.roomId}`).update({
        endedAt: new Date(),
      });

      push('/');
    }
  }, [params.roomId, push]);

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

        {isAdmin && (
          <FinishRoomButton onClick={handleDeleteRoom}>
            Finalizar sala
          </FinishRoomButton>
        )}
      </ButtonWrapper>
    </Container>
  );
};

export { Header };
