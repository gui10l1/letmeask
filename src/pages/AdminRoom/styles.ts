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

export const Button = styled(ButtonComponent)`
  height: auto;

  &:disabled {
    color: #aaa;

    &:hover {
      background-color: transparent;
    }
  }
`;

export const EmptyQuestions = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  margin-top: 164px;

  > img {
    margin-bottom: 16px;

    max-width: 100%;
    height: auto;
  }

  > h1 {
    font-weight: 600;

    font-size: 18px;

    color: var(--black);
  }

  > p {
    max-width: 284px;
    width: 100%;

    text-align: center;

    color: var(--gray-dark);

    margin-top: 8px;
  }
`;
