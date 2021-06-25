/* eslint-disable no-alert */
import { FC, useCallback } from 'react';
import { useRouteMatch } from 'react-router-dom';
import { FiCheckCircle, FiTrash2, FiMessageCircle } from 'react-icons/fi';
import Loader from 'react-loader-spinner';

import { Header } from '../../components/layouts/Header';
import { Container, ContainerHeader, Content, EmptyQuestions } from './styles';
import { Question } from '../../components/layouts/Question';
import { useRoom } from '../../hooks/useRoom';
import { database } from '../../services/firebase';
import emptyQuestions from '../../assets/images/empty-questions.svg';

interface IParams {
  roomId: string;
}

const AdminRoom: FC = () => {
  const { params } = useRouteMatch<IParams>();
  const { questions, loading } = useRoom(params.roomId);

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

      <Container isLoading={loading}>
        {loading ? (
          <Loader type="TailSpin" width={100} height={100} color="#835AFD" />
        ) : (
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
                    <FiCheckCircle
                      size={22}
                      color={item.isAnswered ? '#835AFD' : '#ccc'}
                      onClick={() => handleAnswerQuestion(item.key)}
                    />

                    <FiMessageCircle
                      size={22}
                      color={item.isHighlighted ? '#835AFD' : '#ccc'}
                      onClick={
                        !item.isAnswered
                          ? () => handleHighlightQuestion(item.key)
                          : undefined
                      }
                    />

                    <FiTrash2
                      size={22}
                      color="#ccc"
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
        )}
      </Container>
    </>
  );
};

export { AdminRoom };
