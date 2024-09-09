"use client"
import { DocumentNode, gql } from "@apollo/client";

export const registerUser: DocumentNode = gql`
  mutation registerUser(
    $email: String!
    $password: String!
    $username: String!
    $phone: String!
  ) {
    createUser(
      createUserInput: {
        email: $email
        password: $password
        username: $username
        phone: $phone
      }
    ) {
      activationToken
    }
  }
`;
