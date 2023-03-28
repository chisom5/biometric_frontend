import {
  ApolloClient,
  ApolloLink,
  InMemoryCache,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { BatchHttpLink } from "@apollo/client/link/batch-http";
import { createUploadLink } from "apollo-upload-client";

const httpOptions = {
  uri: `http://0.0.0.0:7070/graphql/`,
  credentials: "include",
};

const authLink = setContext((_, { headers, context }) => {
  const token = JSON.parse(localStorage.getItem("auth-token"));
  return {
    headers: {
      ...headers,
      authorization: token ? `JWT ${token}` : "",
    },
    ...context,
  };
});

const httpLink = ApolloLink.split(
  (operation) => operation.getContext().hasUpload,
  new BatchHttpLink(httpOptions),
  createUploadLink(httpOptions)
);

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
  defaultOptions: {
    query: {
      errorPolicy: "all",
    },
    mutate: {
      errorPolicy: "all",
    },
  },
});

export default client;
