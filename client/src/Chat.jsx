import React, { useState } from 'react';
import { Row, Col, FormInput, Button, Container } from 'shards-react';
import { useMutation } from '@apollo/client';
import Message from './Message';
import { POST_MESSAGE } from './queries';

const Chat = () => {
  const [user, setUser] = useState('Bineet');
  const [content, setContent] = useState('');
  const [postMessage] = useMutation(POST_MESSAGE);

  const onSend = (e) => {
    e.preventDefault();

    if (content.length > 0 && user) {
      postMessage({
        variables: { user, content },
      });
    }

    setContent('');
  };
  return (
    <Container>
      <Message user={user} />

      <Row>
        <Col xs={2}>
          <FormInput
            label="User"
            value={user}
            onChange={(e) => setUser(e.target.value)}
          />
        </Col>

        <Col xs={8}>
          <FormInput
            label="Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            onKeyUp={(e) => {
              if (e.keyCode === 13) onSend(e);
            }}
          />
        </Col>

        <Col xs={2}>
          <Button onClick={onSend}>Send!</Button>
        </Col>
      </Row>
    </Container>
  );
};

export default Chat;
