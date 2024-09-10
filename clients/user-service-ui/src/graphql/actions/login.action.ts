"use client";
import { DocumentNode, gql } from "@apollo/client";

export const loginUser: DocumentNode = gql`
  mutation loginUser($email: String!, $password: String!) {
    loginUser(
      loginUserInput: {
        email: $email
        password: $password
      }
    ) {
      userId
      refreshToken
      accessToken
    }
  }
`;
