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

// Get city weather

export const GET_CITY_WEATHER = gql`
  query GetCurrentWeather($city: String!) {
    getCurrentWeather(city: $city) {
      cityName
      temperature
      icon
      timestamp
    }
  }
`;

// Get All Favorites Movies

export const FETCH_ALL_FAVORITES = gql`
  query GetFavorites($email: String!) {
    getFavoriteMovies(email: $email) {
      id
      movieId
      title
      year
      poster
      createdAt
    }
  }
`;

// Search a Movie

export const SEARCH_MOVIE = gql`
  query SearchMovies($query: String!) {
    searchMovies(query: $query) {
      movies {
        id
        title
        year
        poster
        type
        externalId
      }
      totalResults
    }
  }
`;

// SIGNUP MUTATION

export const SIGNUP_USER = gql`
  mutation Signup($input: SignUpInput!) {
    signup(input: $input) {
      user {
        firstName
        lastName
        city
        email
      }
      token
    }
  }
`;

// ADD FAVORITE MOVIE

export const ADD_FAVORITE_MOVIE = gql`
  mutation AddFavorite($externalId: String!) {
    addFavoriteMovie(externalId: $externalId) {
      userId
      movie {
        externalId
        title
        year
        type
        poster
      }
      createdAt
    }
  }
`;

// LOGOUT MUTATION

export const LOGOUT = gql`
  mutation logout {
    logout
  }
`;
