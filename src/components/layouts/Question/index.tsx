import { FC, ReactNode } from 'react';

import {
  Container,
  Content,
  Footer,
  UserWhoDidQuestion,
  Actions,
} from './styled';

interface IQuestion {
  authorAvatar: string;
  authorName: string;
  content: ReactNode;
  isHighlighed?: boolean;
  isAnswered?: boolean;
}

const Question: FC<IQuestion> = ({
  authorAvatar,
  authorName,
  isAnswered,
  isHighlighed,
  children,
  content,
}) => {
  return (
    <Container isHighlighed={isHighlighed} isAnswered={isAnswered}>
      <Content>
        <p>{content}</p>
      </Content>

      <Footer>
        <UserWhoDidQuestion>
          <img src={authorAvatar} alt={authorName} />

          <span>{authorName}</span>
        </UserWhoDidQuestion>

        <Actions>{children}</Actions>
      </Footer>
    </Container>
  );
};

export { Question };
