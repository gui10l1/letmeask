import styled from 'styled-components';

export const Container = styled.header`
  padding: 0 164px 0 160px;
  margin-bottom: 64px;

  height: 89px;
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: space-between;

  border-bottom: 2px solid #e2e2e2;

  > img {
    max-width: 100px;
    height: auto;
  }
`;

export const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 9px;
`;

export const CodeButton = styled.div`
  height: 40px;

  display: flex;
  align-items: center;

  > button {
    display: flex;
    align-items: center;
    justify-content: center;

    padding: 10px 12px;

    background-color: var(--purple);

    border: 2px solid var(--purple);
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
  }

  > span {
    padding: 11px 16px 12px 12px;

    border: 2px solid var(--purple);
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;

    font-weight: 500;
  }
`;

export const FinishRoomButton = styled.button`
  background-color: #fff;

  height: 46px;

  padding: 12px 24px;

  font-size: 16px;

  color: var(--purple);

  border: 2px solid var(--purple);
  border-radius: 8px;
`;
