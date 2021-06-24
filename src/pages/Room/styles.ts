import styled, { css } from 'styled-components';

import { Button as ButtonComponent } from '../../components/elements/Button';

interface IUnloggedUser {
  isHidden: boolean;
}

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

export const UnloggedUser = styled.div<IUnloggedUser>`
  display: flex;
  align-items: center;
  justify-content: space-between;

  margin-top: 16px;
  margin-bottom: 32px;

  > span {
    display: none;

    color: var(--gray-dark);

    font-weight: 500;

    ${props =>
      !props.isHidden &&
      css`
        display: flex;
      `}

    > a {
      color: var(--purple);

      font-weight: 500;
    }
  }

  > div {
    display: flex;
    align-items: center;

    > img {
      margin-right: 8px;

      border-radius: 50%;

      width: 35px;
      height: 35px;
    }
  }

  > button {
    ${props =>
      props.isHidden &&
      css`
        margin-left: auto;
      `}
  }
`;

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

  > span {
    font-family: 'Poppins';
    font-size: 16px;

    color: var(--gray-dark);
  }
`;

export const Button = styled(ButtonComponent)`
  height: auto;
`;
