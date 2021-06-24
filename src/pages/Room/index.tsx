import { Form } from '@unform/web';
import { FC, useCallback, useEffect, useState } from 'react';
import { FiUser } from 'react-icons/fi';
import { useRouteMatch } from 'react-router-dom';

import { Textarea } from '../../components/elements/Form/Textarea';
import { Header } from '../../components/layouts/Header';
import { Button as ButtonComponent } from '../../components/elements/Button';
import {
  Container,
  ContainerHeader,
  Content,
  UnloggedUser,
  Question,
  QuestionContent,
  QuestionFooter,
  UserWhoDidQuestion,
  Actions,
  Button,
} from './styles';
import likeIcon from '../../assets/images/like.svg';
import { useAuth } from '../../hooks/useAuth';

import { database } from '../../services/firebase';

interface IParams {
  roomId: string;
}

interface IQuestion {
  key: string;
  author: {
    authorAvatar: string;
    authorId: string;
    authorName: string;
  };
  content: string;
  isAnswred: boolean;
  isHighlighted: boolean;
}

interface IFormData {
  questionContent: string;
}

const Room: FC = () => {
  const { params } = useRouteMatch<IParams>();
  const { user } = useAuth();

  const [questions, setQuestions] = useState<IQuestion[]>([]);

  useEffect(() => {
    const roomRef = database.ref(`rooms/${params.roomId}`);

    roomRef.once('value', room => {
      if (!room.val().questions) {
        return;
      }

      const parsedQuestions = Object.entries(room.val().questions).map(
        ([key, content]) => {
          const parsedContent = content as IQuestion;

          return {
            ...parsedContent,
            key,
          };
        },
      );

      setQuestions(parsedQuestions);
    });
  }, [params.roomId]);

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
      const questionsFromDatabase = await database
        .ref(`rooms/${params.roomId}/questions`)
        .get();

      const parsedQuestions = Object.entries(questionsFromDatabase.val()).map(
        ([key, content]) => {
          const questionContent = content as IQuestion;

          return {
            ...questionContent,
            key,
          };
        },
      );

      setQuestions(parsedQuestions);
      reset();
    },
    [user, params.roomId],
  );

  return (
    <>
      <Header isAdmin={false} code={params.roomId} />

      <Container>
        <ContainerHeader>
          <h1>Sala React Q&A</h1>

          <span>{questions.length} perguntas</span>
        </ContainerHeader>

        <Content>
          <Form onSubmit={handleAddNewQuestion}>
            <Textarea
              name="questionContent"
              placeholder="O que você quer perguntar?"
            />

            <UnloggedUser isHidden={!!user}>
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

          {questions.map(item => (
            <Question key={item.key}>
              <QuestionContent>
                <p>{item.content}</p>
              </QuestionContent>

              <QuestionFooter>
                <UserWhoDidQuestion>
                  <div>
                    <FiUser size={22} />
                  </div>

                  <span>{item.author.authorName}</span>
                </UserWhoDidQuestion>

                <Actions>
                  <span>16</span>

                  <Button img={likeIcon} />
                </Actions>
              </QuestionFooter>
            </Question>
          ))}
        </Content>
      </Container>
    </>
  );
};

export { Room };
