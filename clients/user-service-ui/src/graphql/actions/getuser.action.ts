import { DocumentNode, gql } from "@apollo/client";

const GET_USER: DocumentNode = gql`
  query{
  getLoginUser{
 user{
  id
  email
  username
  address
  avatar{
  url
  }
  phone
  createdAt
  updatedAt
}
   refreshToken
    accessToken
  }
}
   

`;
export default GET_USER