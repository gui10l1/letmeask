import styled, { css } from 'styled-components';

interface IContainer {
  backgroundColor: string;
}

export const Container = styled.button<IContainer>`
  height: 50px;
  max-width: 320px;
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: center;

  color: #fefefe;
  font-size: 16px;

  border: 0;
  border-radius: 8px;

  margin-bottom: 32px;

  ${props =>
    css`
      background-color: ${props.backgroundColor};
    `}

  > img {
    margin-right: 8px;

    max-width: 100%;
    height: auto;
  }

  > svg {
    margin-right: 8px;
  }
`;
