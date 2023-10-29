import { NgModule } from "@angular/core";
import { ApolloClientOptions, InMemoryCache, split } from "@apollo/client/core";
import { WebSocketLink } from "@apollo/client/link/ws";
import { getMainDefinition } from "@apollo/client/utilities";
import { APOLLO_OPTIONS, ApolloModule } from "apollo-angular";
import { HttpLink } from "apollo-angular/http";

const httpUri = "https://fruit-of-lips-hasura.onrender.com/v1/graphl";
const wsUri = "wss://fruit-of-lips-hasura.onrender.com/v1/graphql";

export function createApollo(httpLink: HttpLink): ApolloClientOptions<any> {
  const http = httpLink.create({
    uri: httpUri,
  });

  const ws = new WebSocketLink({
    uri: wsUri,
    options: {
      reconnect: true,
    },
  });

  const link = split(
    ({ query }) => {
      const mainDefinition = getMainDefinition(query);

      return (
        mainDefinition.kind === "OperationDefinition" &&
        mainDefinition.operation === "subscription"
      );
    },
    ws,
    http
  );

  return {
    link,
    headers: {
      "X-Hasura-Role": "view",
    },
    cache: new InMemoryCache({ addTypename: false }),
    defaultOptions: {
      query: { fetchPolicy: "network-only", errorPolicy: "all" },
      watchQuery: { fetchPolicy: "network-only", errorPolicy: "ignore" },
    },
  };
}

@NgModule({
  exports: [ApolloModule],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: (httpLink: HttpLink) => createApollo(httpLink),
      deps: [HttpLink],
    },
  ],
})
export class GraphQLModule {}
