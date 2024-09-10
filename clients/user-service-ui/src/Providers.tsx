"use client";

import { ApolloProvider } from "@apollo/client";
import { apolloClient } from "./graphql/graphql.setup";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Providers({
  children,
}: {
  children: React.ReactNode;
}): React.ReactElement {
  return (
    <ApolloProvider client={apolloClient}>
      {children}
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        draggable
        pauseOnHover
      />
    </ApolloProvider>
  );
}
