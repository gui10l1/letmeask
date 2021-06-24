import { FC, useEffect, useCallback } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Form } from '@unform/web';

import { Container, ImageWrapper, Content } from './styles';
import illustrationImage from '../../assets/images/illustration.svg';
import logoImage from '../../assets/images/logo.svg';
import { useAuth } from '../../hooks/useAuth';
import { Input } from '../../components/elements/Form/Input';
import { database } from '../../services/firebase';

interface IFormData {
  roomName: string;
}

const CreateRoom: FC = () => {
  const { user } = useAuth();
  const { push } = useHistory();

  useEffect(() => {
    if (!user) {
      push('/');
    }
  }, [user, push]);

  const handleCreateRoom = useCallback(
    async (data: IFormData) => {
      if (data.roomName.trim() === '') {
        return;
      }

      const rooms = database.ref('rooms');

      const room = await rooms.push({
        authorId: user.id,
        roomName: data.roomName,
      });

      push(`/rooms/${room.key}`);
    },
    [user, push],
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

        <h1>Crie uma nova sala</h1>

        <Form onSubmit={handleCreateRoom}>
          <Input name="roomName" placeholder="Nome da sala" />

          <button type="submit">Criar sala</button>
        </Form>

        <span>
          Quer entrar em uma sala existente? <Link to="/">Clique aqui</Link>
        </span>
      </Content>
    </Container>
  );
};

export { CreateRoom };
