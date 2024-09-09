"use client";

import { ApolloProvider } from "@apollo/client";
import { apolloClient } from "./graphql/graphql.setup";

export default function Providers({
  children,
}: {
  children: React.ReactNode;
}): React.ReactElement {
  return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>;
}
