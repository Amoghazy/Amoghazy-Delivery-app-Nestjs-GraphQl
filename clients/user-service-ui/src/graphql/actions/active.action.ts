"use client";
import { DocumentNode, gql } from "@apollo/client";

export const activeUser: DocumentNode = gql`
  mutation activeUser($activationCode: String!, $activationToken: String!) {
    activateUser(
      activationDto: {
        activationCode: $activationCode
        activationToken: $activationToken
      }
    ) {
      user {
        email
        isActive
        id
        username
      }
    }
  }
`;
