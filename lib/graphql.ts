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
