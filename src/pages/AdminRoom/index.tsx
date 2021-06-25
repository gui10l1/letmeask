import { FC, useCallback } from 'react';
import { useRouteMatch } from 'react-router-dom';
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

interface IParams {
  roomId: string;
}

const AdminRoom: FC = () => {
  const { params } = useRouteMatch<IParams>();
  const { questions } = useRoom(params.roomId);

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

  return (
    <>
      <Header isAdmin code={params.roomId} />

      <Container>
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
              >
                <Button img={checkIcon} />

                <Button img={answerIcon} />

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
      </Container>
    </>
  );
};

export { AdminRoom };
