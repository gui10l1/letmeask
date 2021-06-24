import styled, { css } from 'styled-components';

interface IContainer {
  styleType?: 'danger' | 'success';
}

const buttonStyleTypes = {
  danger: css`
    background-color: var(--danger);

    &:hover {
      background-color: var(--danger-hover);
    }
  `,
  success: css`
    background-color: var(--purple);

    &:hover {
      background-color: var(--purple-hover);
    }
  `,
};

export const Container = styled.button<IContainer>`
  height: 50px;
  max-width: 320px;

  display: flex;
  align-items: center;
  justify-content: center;

  color: #fefefe;
  font-size: 16px;

  border: 0;
  border-radius: 8px;

  transition: background-color 0.2s;

  ${props => props.styleType && buttonStyleTypes[props.styleType]}

  ${props =>
    props.disabled &&
    css`
      opacity: 0.5;
      cursor: not-allowed;

      &:hover {
        background-color: var(--purple);
      }
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
