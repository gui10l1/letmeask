import styled from 'styled-components';

export const Container = styled.div`
  display: flex;

  height: 100vh;
`;

export const ImageWrapper = styled.aside`
  flex: 1;

  padding: 123px 133px 122px 83px;

  background-color: var(--purple);

  display: flex;
  flex-direction: column;
  justify-content: flex-end;

  > h1 {
    color: #fff;
    font-size: 36px;

    max-width: 440px;

    line-height: 46px;

    margin-bottom: 16px;
  }

  > span {
    font-size: 24px;
    line-height: 32px;

    max-width: 459px;

    color: var(--background-white);

    opacity: 0.7;
  }
`;

export const Content = styled.main`
  max-width: calc(100% / 2);
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  > img {
    margin-bottom: 56px;

    max-width: 100%;
    height: auto;
  }

  > div {
    display: flex;
    align-items: center;

    max-width: 320px;
    width: 100%;

    margin-bottom: 32px;

    > span:nth-child(odd) {
      flex: 1;

      display: block;

      border-top: 1px solid #a8a8b3;
    }

    > span:nth-child(even) {
      color: #a8a8b3;

      display: block;

      margin: 0 16px;
    }
  }

  > form {
    display: flex;
    flex-direction: column;

    max-width: 320px;

    width: 100%;

    > input {
      height: 50px;

      border: 1px solid #a8a8b3;
      border-radius: 8px;

      padding: 0 16px;

      font-size: 16px;

      margin-bottom: 16px;
    }
  }
`;
