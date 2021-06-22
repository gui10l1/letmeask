import { FC, useCallback } from 'react';
import { FiLogIn } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';

import { Container, ImageWrapper, Content } from './styles';
import { Button } from '../../components/elements/Button';
import illustrationImage from '../../assets/images/illustration.svg';
import logoImage from '../../assets/images/logo.svg';
import googleIconImage from '../../assets/images/google-icon.svg';
import { useAuth } from '../../hooks/useAuth';

const Home: FC = () => {
  const { push } = useHistory();
  const { signIn } = useAuth();

  const handleCreateNewRoom = useCallback(async () => {
    await signIn();

    push('/rooms/new');
  }, [push, signIn]);

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
          backgroundColor="#EA4335"
          type="button"
          img={googleIconImage}
          onClick={handleCreateNewRoom}
        >
          Crie sua sala com o Google
        </Button>

        <div>
          <span />
          <span>ou entre em uma sala</span>
          <span />
        </div>

        <form>
          <input type="text" placeholder="Digite o código da sala" />

          <Button backgroundColor="#835AFD" type="submit" icon={FiLogIn}>
            Entrar na sala
          </Button>
        </form>
      </Content>
    </Container>
  );
};

export { Home };
