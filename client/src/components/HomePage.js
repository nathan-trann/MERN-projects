import styled from "styled-components";

const HomePage = styled.section`
  min-height: 100vh;
  background-color: var(--primary);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  nav {
    height: var(--nav-height);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .btn-container {
      display: relative;
    }

    .btn {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0 0.5rem;
      position: relative;
    }

    .dropdown {
      position: absolute;
      top: 70px;
      margin: 0 auto;
      background: var(--primary-500);
      box-shadow: var(--shadow-2);
      padding: 0.5rem;
      text-align: center;
      visibility: hidden;
      border-radius: var(--borderRadius);
    }
    .show-dropdown {
      visibility: visible;
    }
    .dropdown-btn {
      background: transparent;
      border-color: transparent;
      color: var(--white);
      letter-spacing: var(--letterSpacing);
      text-transform: capitalize;
      cursor: pointer;
    }
  }

  main {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: calc(100vh - var(--nav-height));
  }

  .home-img {
    display: none;
  }

  h1 {
    color: var(--white);
    text-transform: none;
    margin-bottom: 0;
  }

  span {
    display: block;
    color: var(--black);
    padding-left: 2rem;
    font-size: 1rem;
  }

  .form-link {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 1rem;
    margin-bottom: 1rem;
    padding: 0;
    background: none;
    box-shadow: none;
  }

  .form-input::placeholder {
    text-align: center;
  }

  .form-row {
    width: 85%;
  }

  .shorten-btn {
    width: 10rem;
    height: 2.5rem;
  }

  table {
    border-collapse: collapse;
    border-spacing: 1;
    background: white;
    border-radius: 10px;
    overflow: hidden;
    max-width: 90em;
    margin: 0 auto;
    position: relative;
  }

  table * {
    position: relative;
  }
  table td,
  table th {
    padding-left: 8px;
    text-align: left;
  }

  table td {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    max-width: 0;
  }
  table thead tr {
    height: 60px;
    background: var(--primary-500);
  }
  table tbody tr {
    height: 50px;
  }
  table tbody tr:last-child {
    border: 0;
  }

  .table-head th {
    font-size: 1.2rem;
    color: #fff;
    line-height: 1.2;
  }

  tbody tr:nth-child(even) {
    background-color: #f5f5f5;
  }
  tbody tr {
    font-family: OpenSans-Regular;
    font-size: 15px;
    color: #808080;
    line-height: 1.2;
  }
  tbody tr:hover {
    color: #555555;
    background-color: #f5f5f5;
    cursor: pointer;
  }
  .column1 {
    width: 7em;
    padding-left: 40px;
  }
  .column2 {
    width: 25em;
    word-wrap: break-word;
    word-break: break-all;
  }
  .column3 {
    width: 20em;
    position: relative;
  }
  .column4 {
    width: 6.8em;
  }

  a {
    color: var(--black);
    font-size: 1rem;
  }

  a:hover {
    color: var(--primary);
    font-weight: bold;
  }

  a:visited {
    color: none;
  }

  .copy-label {
    color: var(--primary-500);
    font-size: 1.2rem;
    display: inline-block;
    transition: var(--transition);
    position: absolute;
    left: 16rem;
    margin-left: 1rem;
  }

  .copy-label:hover {
    color: var(--primary);
    font-size: 1.3rem;
  }

  .btn-short {
    text-transform: none;
    color: white;
  }

  @media screen and (min-width: 992px) {
    .info-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      position: relative;
    }

    .home-img {
      display: block;
      width: 70%;
      position: absolute;
      right: 100%;
      top: -60%;
      transform: rotateY(180deg);
    }

    .form-link {
      display: grid;
      grid-template-columns: 3fr 1fr;
    }

    .form-input {
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
      height: 50px;
    }

    .shorten-btn {
      height: 50px;
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    }

    .form-row {
      padding: 0;
      margin: 0;
      display: flex;
      align-items: center;
      width: initial;
    }
  }
`;

export default HomePage;
