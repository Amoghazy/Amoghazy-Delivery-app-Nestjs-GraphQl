import {
  ApolloClient,
  HttpLink,
  ApolloLink,
  InMemoryCache,
} from "@apollo/client";
import Cookies from "js-cookie";
const httpLink = new HttpLink({
  uri: process.env.NEXT_PUBLIC_SERVER_URL,
});
const authMiddleware = new ApolloLink((operation, forward) => {
  operation.setContext({
    headers: {
      accesstoken: Cookies.get("accessToken"),
      refreshtoken: Cookies.get("refreshToken"),
    },
  });
  return forward(operation);
});
export const apolloClient = new ApolloClient({
  link: authMiddleware.concat(httpLink),
  cache: new InMemoryCache(),
});
