import React from 'react';
import ReactDOM from 'react-dom';
import Chat from './Chat';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'shards-ui/dist/css/shards.min.css';
import './index.css';

const App = () => {
  const client = new ApolloClient({
    uri: 'http://localhost:4000',
    cache: new InMemoryCache(),
  });
  return (
    <ApolloProvider client={client}>
      <Chat />
    </ApolloProvider>
  );
};

ReactDOM.render(<App />, document.getElementById('app'));
