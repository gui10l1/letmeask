import { Form } from '@unform/web';
import { FC, useCallback } from 'react';
import { useRouteMatch } from 'react-router-dom';

import { Textarea } from '../../components/elements/Form/Textarea';
import { Header } from '../../components/layouts/Header';
import { Button as ButtonComponent } from '../../components/elements/Button';
import { useAuth } from '../../hooks/useAuth';
import { database } from '../../services/firebase';
import { Question } from '../../components/layouts/Question';
import {
  Container,
  ContainerHeader,
  Content,
  UnloggedUser,
  EmptyQuestions,
  Button,
} from './styles';
import { useRoom } from '../../hooks/useRoom';
import likeIcon from '../../assets/images/like.svg';
import emptyQuestions from '../../assets/images/empty-questions.svg';

interface IParams {
  roomId: string;
}

interface IFormData {
  questionContent: string;
}

const Room: FC = () => {
  const { params } = useRouteMatch<IParams>();
  const { user } = useAuth();
  const { questions } = useRoom(params.roomId);

  const handleAddNewQuestion = useCallback(
    async (data: IFormData, { reset }) => {
      if (data.questionContent.trim() === '') {
        return;
      }

      if (!user) {
        return;
      }

      const question = {
        content: data.questionContent,
        author: {
          authorAvatar: user.avatar,
          authorId: user.id,
          authorName: user.name,
        },
        isHighlighted: false,
        isAnswered: false,
      };

      await database.ref(`rooms/${params.roomId}/questions`).push(question);

      reset();
    },
    [user, params.roomId],
  );

  const handleLikeQuestion = useCallback(
    async (questionId: string, hasLiked: boolean) => {
      if (!hasLiked) {
        await database
          .ref(`rooms/${params.roomId}/questions/${questionId}/likes`)
          .push({
            authorId: user.id,
          });
      }
    },
    [params.roomId, user.id],
  );

  return (
    <>
      <Header isAdmin={false} code={params.roomId} />

      <Container>
        <ContainerHeader>
          <h1>Nome da sala</h1>

          <span>{questions.length} perguntas</span>
        </ContainerHeader>

        <Content>
          <Form onSubmit={handleAddNewQuestion}>
            <Textarea
              name="questionContent"
              placeholder="O que você quer perguntar?"
            />

            <UnloggedUser>
              {!user && (
                <span>
                  Para enviar uma pergunta,&nbsp;
                  <a href="/teste">faça seu login.</a>
                </span>
              )}

              {user && (
                <div>
                  <img src={user.avatar} alt={user.name} />

                  <span>{user.name}</span>
                </div>
              )}

              <ButtonComponent
                style={{ width: '100%', maxWidth: 177 }}
                styleType="success"
                disabled={!user}
              >
                Enviar
              </ButtonComponent>
            </UnloggedUser>
          </Form>

          {questions.length === 0 && (
            <EmptyQuestions>
              <img src={emptyQuestions} alt="No questions here" />

              <h1>Nenhuma pergunta por aqui...</h1>

              {!user ? (
                <p>
                  Faça o seu login e seja a primeira pessoa a fazer uma
                  pergunta!
                </p>
              ) : (
                <p>Seja a primeira pessoa a fazer uma pergunta!</p>
              )}
            </EmptyQuestions>
          )}

          {questions.length !== 0 &&
            questions.map(item => (
              <Question
                authorAvatar={item.author.authorAvatar}
                authorName={item.author.authorName}
                key={item.key}
                content={item.content}
              >
                <span>{item.likes.length}</span>
                <Button
                  img={likeIcon}
                  onClick={() =>
                    handleLikeQuestion(
                      item.key,
                      item.likes.some(like => like.authorId === user.id),
                    )
                  }
                />
              </Question>
            ))}
        </Content>
      </Container>
    </>
  );
};

export { Room };
