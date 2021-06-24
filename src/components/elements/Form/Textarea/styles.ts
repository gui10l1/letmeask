import styled from 'styled-components';

export const Container = styled.textarea`
  max-width: 100%;
  width: 100%;

  padding: 16px;

  background-color: var(--details-white);

  box-shadow: 0px 2px 12px rgba(0, 0, 0, 0.04);

  border: 1px solid transparent;
  border-radius: 8px;

  font-size: 16px;

  transition: border-color 0.2s;

  &:focus {
    border-color: var(--purple);
  }

  &::placeholder {
    color: var(--gray-dark);
  }
`;
