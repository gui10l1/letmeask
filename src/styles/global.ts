import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  :root {
    --black: #29292E;
    --shadow: #050206;
    --purple: #835AFD;
    --gradient: linear-gradient(139.44deg, #485BFF 0%, #FF59F8 96.19%);
    --danger: #E73F5D;
    --gray-dark: #737380;
    --gray-medium: #A8A8B3;
    --gray-light: #DBDCDD;
    --background-white: #F8F8F8;
    --details-white: #FEFEFE;
    --pink-dark: #E559F9;
    --pink-light: #D67EE2;
    --purple-hover: #6F4BD8;
    --danger-hover: #D73754;
    --gray-medium-hover: #7E7E86;
    --gray-light-hover: #CECECE;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: 0;
  }

  body {
    background-color: var(--background-white);
  }

  body, input, textarea {
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
  }

  h1, h2, h3, h4, h5, h6, strong {
    font-family: 'Poppins', sans-serif;
    font-weight: 700;
  }

  button {
    font-family: 'Roboto', sans-serif;
    font-weight: 500;

    cursor: pointer;

    border: 0;
    background-color: transparent;
  }
`;
