import styled from 'styled-components';

import { Button as ButtonComponent } from '../../components/elements/Button';

export const Container = styled.main`
  max-width: 800px;
  margin: 0 auto;
`;

export const ContainerHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;

  margin-bottom: 24px;

  > h1 {
    color: var(--black);

    font-size: 24px;

    margin-right: 16px;
  }

  > span {
    padding: 8px 16px;

    font-weight: 500;

    color: #fff;

    background-color: var(--pink-dark);

    border-radius: 51px;
  }
`;

export const Content = styled.div``;

export const Question = styled.div`
  background-color: var(--details-white);

  box-shadow: 0px 2px 12px rgba(0, 0, 0, 0.04);

  border-radius: 8px;

  padding: 24px;

  & + div {
    margin-top: 8px;
  }
`;

export const QuestionContent = styled.div`
  margin-bottom: 24px;

  > p {
    color: var(--black);

    font-size: 16px;

    line-height: 24px;
  }
`;

export const QuestionFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const UserWhoDidQuestion = styled.div`
  display: flex;
  align-items: center;

  > div {
    display: flex;
    align-items: center;
    justify-content: center;

    width: 32px;
    height: 32px;

    margin-right: 8px;
    padding: 8.5px;

    border-radius: 50%;

    background-color: var(--purple);

    > svg {
      color: #fff;
    }
  }

  > span {
    color: var(--gray-dark);
  }
`;

export const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const Button = styled(ButtonComponent)`
  height: auto;
`;
