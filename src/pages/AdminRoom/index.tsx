import { FC, useCallback, useEffect, useState } from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { Header } from '../../components/layouts/Header';

import {
  Container,
  ContainerHeader,
  Content,
  Button,
  EmptyQuestions,
} from './styles';
import answerIcon from '../../assets/images/answer.svg';
import checkIcon from '../../assets/images/check.svg';
import deleteIcon from '../../assets/images/delete.svg';
import emptyQuestions from '../../assets/images/empty-questions.svg';
import { Question } from '../../components/layouts/Question';
import { useRoom } from '../../hooks/useRoom';
import { database } from '../../services/firebase';
import { useAuth } from '../../hooks/useAuth';

interface IParams {
  roomId: string;
}

const AdminRoom: FC = () => {
  const { params } = useRouteMatch<IParams>();
  const { questions } = useRoom(params.roomId);
  const { user } = useAuth();
  const { push } = useHistory();

  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    async function checkPermissions() {
      const roomRef = await database.ref(`rooms/${params.roomId}`).get();

      const { authorId } = roomRef.val();

      if (authorId !== user.id) {
        setIsAdmin(false);
      } else {
        setIsAdmin(true);
      }
    }

    checkPermissions();
  }, [params.roomId, push, user.id]);

  const handleDeleteQuestion = useCallback(
    async (questionId: string) => {
      if (
        window.confirm('Tem certeza que você deseja excluir esta pergunta?')
      ) {
        await database
          .ref(`rooms/${params.roomId}/questions/${questionId}`)
          .remove();
      }
    },
    [params.roomId],
  );

  const handleHighlightQuestion = useCallback(
    async (questionId: string) => {
      const questionRef = await database
        .ref(`rooms/${params.roomId}/questions/${questionId}`)
        .get();

      const { isHighlighted } = questionRef.val();

      await database
        .ref(`rooms/${params.roomId}/questions/${questionId}`)
        .update({
          isHighlighted: !isHighlighted,
        });
    },
    [params.roomId],
  );

  const handleAnswerQuestion = useCallback(
    async (questionId: string) => {
      await database
        .ref(`rooms/${params.roomId}/questions/${questionId}`)
        .update({
          isHighlighted: false,
          isAnswered: true,
        });
    },
    [params.roomId],
  );

  return (
    <>
      <Header isAdmin code={params.roomId} />

      <Container>
        {isAdmin ? (
          <>
            <ContainerHeader>
              <h1>Sala React Q&A</h1>

              <span>{questions.length} perguntas</span>
            </ContainerHeader>

            <Content>
              {questions.length !== 0 &&
                questions.map(item => (
                  <Question
                    key={item.key}
                    authorAvatar={item.author.authorAvatar}
                    content={item.content}
                    authorName={item.author.authorName}
                    isHighlighted={item.isHighlighted}
                    isAnswered={item.isAnswered}
                  >
                    <Button
                      img={checkIcon}
                      onClick={() => handleAnswerQuestion(item.key)}
                    />

                    <Button
                      img={answerIcon}
                      onClick={() => handleHighlightQuestion(item.key)}
                      disabled={item.isAnswered}
                    />

                    <Button
                      img={deleteIcon}
                      onClick={() => handleDeleteQuestion(item.key)}
                    />
                  </Question>
                ))}

              {questions.length === 0 && (
                <EmptyQuestions>
                  <img src={emptyQuestions} alt="No questions here" />

                  <h1>Nenhuma pergunta por aqui...</h1>

                  <p>Espere até alguém fazer uma pergunta!</p>
                </EmptyQuestions>
              )}
            </Content>
          </>
        ) : (
          <span>Você não é admin desta sala!</span>
        )}
      </Container>
    </>
  );
};

export { AdminRoom };
