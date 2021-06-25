import styled, { css } from 'styled-components';

import { Button as ButtonComponent } from '../../elements/Button';

interface IContainer {
  isHighlighed?: boolean;
  isAnswered?: boolean;
}

export const Container = styled.div<IContainer>`
  background-color: var(--details-white);

  box-shadow: 0px 2px 12px rgba(0, 0, 0, 0.04);

  border-radius: 8px;

  padding: 24px;

  ${props =>
    props.isHighlighed &&
    css`
      border: 1px solid var(--purple);

      background-color: #f4f0ff;
    `}

  ${props =>
    props.isAnswered &&
    css`
      background-color: var(--gray-light);
    `}

  & + div {
    margin-top: 8px;
  }
`;

export const Content = styled.div`
  margin-bottom: 24px;

  > p {
    color: var(--black);

    font-size: 16px;

    line-height: 24px;
  }
`;

export const Footer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const UserWhoDidQuestion = styled.div`
  display: flex;
  align-items: center;

  > img {
    width: 32px;
    height: 32px;

    margin-right: 8px;

    border-radius: 50%;
  }

  > span {
    color: var(--gray-dark);
  }
`;

export const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;

  > span {
    font-family: 'Poppins';
    font-size: 16px;

    color: var(--gray-dark);
  }

  > svg {
    cursor: pointer;
  }
`;

export const Button = styled(ButtonComponent)`
  height: auto;
`;
