import { FC, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { Container, ImageWrapper, Content } from './styles';
import illustrationImage from '../../assets/images/illustration.svg';
import logoImage from '../../assets/images/logo.svg';

import { useAuth } from '../../hooks/useAuth';

const CreateRoom: FC = () => {
  const { user } = useAuth();

  useEffect(() => {
    console.log(user);
  }, [user]);

  return (
    <Container>
      <ImageWrapper>
        <img src={illustrationImage} alt="Illustration" />

        <h1>Toda pergunta tem uma resposta.</h1>

        <span>Aprenda e compartilhe conhecimento com outras pessoas</span>
      </ImageWrapper>

      <Content>
        <img src={logoImage} alt="Logo" />

        <h1>Crie uma nova sala</h1>

        <form>
          <input type="text" placeholder="Nome da sala" />

          <button type="submit">Criar sala</button>
        </form>

        <span>
          Quer entrar em uma sala existente? <Link to="/">Clique aqui</Link>
        </span>
      </Content>
    </Container>
  );
};

export { CreateRoom };
