import { FC } from 'react';
import { FiUser } from 'react-icons/fi';
import { useRouteMatch } from 'react-router-dom';
import { Header } from '../../components/layouts/Header';

import {
  Container,
  ContainerHeader,
  Content,
  Question,
  QuestionContent,
  QuestionFooter,
  UserWhoDidQuestion,
  Actions,
  Button,
} from './styles';
import answerIcon from '../../assets/images/answer.svg';
import checkIcon from '../../assets/images/check.svg';
import deleteIcon from '../../assets/images/delete.svg';

interface IParams {
  roomId: string;
}

const AdminRoom: FC = () => {
  const { params } = useRouteMatch<IParams>();

  return (
    <>
      <Header isAdmin code={params.roomId} />

      <Container>
        <ContainerHeader>
          <h1>Sala React Q&A</h1>

          <span>4 perguntas</span>
        </ContainerHeader>

        <Content>
          <Question>
            <QuestionContent>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam,
                facilis porro possimus culpa, unde cupiditate sint quaerat
                consectetur excepturi exercitationem nulla expedita asperiores
                molestiae odit esse dolore aliquid. Soluta, deleniti.
              </p>
            </QuestionContent>

            <QuestionFooter>
              <UserWhoDidQuestion>
                <div>
                  <FiUser size={22} />
                </div>

                <span>Guilherme Ribeiro Soares</span>
              </UserWhoDidQuestion>

              <Actions>
                <Button img={checkIcon} />

                <Button img={answerIcon} />

                <Button img={deleteIcon} />
              </Actions>
            </QuestionFooter>
          </Question>
        </Content>
      </Container>
    </>
  );
};

export { AdminRoom };
