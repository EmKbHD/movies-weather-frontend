import { gql } from "@apollo/client";

/**
 * ------------------- QUERIES START HERE -----------------------
 */

// LOGIN QUERY

export const GET_USER = gql`
  query getUser {
    me {
      firstName
      lastName
      email
      city
    }
  }
`;

// GET USER CITY WEATHER

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

// GET ALL USER MOVIES

export const FETCH_ALL_FAVORITES = gql`
  query myFavorites {
    getFavoriteMovies {
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

// SEARCH A MOVIE

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

/**
 *  --------- MUTATIONS START HERE ---------------
 */

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

// UPDATE USER PROFILE

export const UPDATE_USER_PROFILE = gql`
  mutation UpdateProfile($input: UpdateProfileInput!) {
    updateProfile(input: $input) {
      id
      firstName
      lastName
      email
      city
    }
  }
`;

// UPDATE USER PASSWORD

export const UPDATE_USER_PASSWORD = gql`
  mutation UpdatePassword($input: UpdatePasswordInput!) {
    updatePassword(input: $input) {
      success
      message
    }
  }
`;

// ADD TO FAVORITE

export const ADD_TO_FAVORITE = gql`
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

// REMOVE A FAVORITE

export const REMOVE_FAVORITE = gql`
  mutation RemoveFavorite($externalId: String!) {
    removeFavoriteMovie(externalId: $externalId)
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
