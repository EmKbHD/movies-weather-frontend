import { gql } from "@apollo/client";

// GraphQL QUERY for user login

export const GET_USER = gql`
  query getUser {
    me {
      firstName
      lastName
      email
    }
  }
`;

// LOGIN GraphQL MUTATION

export const LOGIN_USER = gql`
  mutation logIn($input: LogInInput!) {
    logIn(input: $input) {
      user {
        firstName
        lastName
        email
      }
      token
    }
  }
`;

// SIGNUP MUTATION

export const SIGNUP_USER = gql`
  mutation signUp($input: SignUpInput!) {
    signUp(input: $input) {
      user {
        firstName
        lastName
        email
      }
      token
    }
  }
`;

// LOGOUT MUTATION

export const LOGOUT = gql`
  mutation logout {
    logout
  }
`;
