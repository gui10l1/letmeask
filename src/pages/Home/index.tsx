import { FC, useCallback } from 'react';
import { FiLogIn } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';
import { Form } from '@unform/web';

import illustrationImage from '../../assets/images/illustration.svg';
import logoImage from '../../assets/images/logo.svg';
import googleIconImage from '../../assets/images/google-icon.svg';
import { Button } from '../../components/elements/Button';
import { useAuth } from '../../hooks/useAuth';
import { Input } from '../../components/elements/Form/Input';
import { database } from '../../services/firebase';

import { Container, ImageWrapper, Content } from './styles';

interface IFormData {
  roomCode: string;
}

const Home: FC = () => {
  const { push } = useHistory();
  const { signIn, user } = useAuth();

  const handleCreateNewRoom = useCallback(async () => {
    if (user) {
      push('/rooms/new');
      return;
    }

    await signIn();

    push('/rooms/new');
  }, [push, signIn, user]);

  const handleEnterInANewRoom = useCallback(
    async (data: IFormData) => {
      if (data.roomCode.trim() === '') {
        return;
      }

      const getRoom = await database.ref(`rooms/${data.roomCode}`).get();

      if (!getRoom.exists()) {
        return;
      }

      if (getRoom.val().endedAt) {
        return;
      }

      push(`/rooms/${getRoom.key}`);
    },
    [push],
  );

  return (
    <Container>
      <ImageWrapper>
        <img src={illustrationImage} alt="Illustration" />

        <h1>Toda pergunta tem uma resposta.</h1>

        <span>Aprenda e compartilhe conhecimento com outras pessoas</span>
      </ImageWrapper>

      <Content>
        <img src={logoImage} alt="Logo" />

        <Button
          styleType="danger"
          type="button"
          img={googleIconImage}
          onClick={handleCreateNewRoom}
          style={{ marginBottom: 32, width: '100%' }}
        >
          Crie sua sala com o Google
        </Button>

        <div>
          <span />
          <span>ou entre em uma sala</span>
          <span />
        </div>

        <Form onSubmit={handleEnterInANewRoom}>
          <Input name="roomCode" placeholder="Digite o código da sala" />

          <Button styleType="success" type="submit" icon={FiLogIn}>
            Entrar na sala
          </Button>
        </Form>
      </Content>
    </Container>
  );
};

export { Home };
