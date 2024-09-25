import { gql } from '@apollo/client';

export const RESET_PASSWORD = gql`
  mutation ResetPassword($token: String!, $password: String!) {
    resetPassword(resetPasswordDto:{token: $token, password: $password}) {
    user{
    email}
    }
  }
`;
