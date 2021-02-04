import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import Chat from './Chat';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { WebSocketLink } from '@apollo/client/link/ws';
import { Button } from 'shards-react';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'shards-ui/dist/css/shards.min.css';
import './index.css';

const App = () => {
  const [darkMode, setDarkMode] = useState(true);

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
      <main
        className="App"
        style={{
          filter: darkMode ? 'invert(1) hue-rotate(-175deg)' : 'none',
        }}
      >
        <header className="header">
          <h1 className="welcome">Chat-O-Matic</h1>

          <Button
            id="darkModeBtnToggler"
            theme="dark"
            onClick={() => setDarkMode(!darkMode)}
          >
            Toggle Dark mode: ({darkMode ? 'On' : 'Off'})
          </Button>
        </header>
        <Chat />
      </main>
    </ApolloProvider>
  );
};

ReactDOM.render(<App />, document.getElementById('app'));
