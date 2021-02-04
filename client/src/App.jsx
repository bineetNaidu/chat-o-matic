import React from 'react';
import ReactDOM from 'react-dom';
import Chat from './Chat';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { WebSocketLink } from '@apollo/client/link/ws';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'shards-ui/dist/css/shards.min.css';
import './index.css';

const App = () => {
  const link = new WebSocketLink({
    uri: 'ws://localhost:4000',
    options: {
      reconnect: true,
    },
  });

  const client = new ApolloClient({
    uri: 'http://localhost:4000',
    cache: new InMemoryCache(),
    link,
  });

  return (
    <ApolloProvider client={client}>
      <Chat />
    </ApolloProvider>
  );
};

ReactDOM.render(<App />, document.getElementById('app'));
