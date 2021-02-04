import React, { useState, useRef, useEffect } from 'react';
import { Row, Col, FormInput, Button, Container } from 'shards-react';
import { useMutation } from '@apollo/client';
import Message from './Message';
import { POST_MESSAGE } from './queries';

const Chat = () => {
  const [user, setUser] = useState('Bineet');
  const [content, setContent] = useState('');
  const [postMessage] = useMutation(POST_MESSAGE);

  const spanRef = useRef();
  useEffect(() => {
    spanRef.current?.scrollIntoView();
  }, []);

  const onSend = (e) => {
    e.preventDefault();

    if (content.length > 0 && user) {
      postMessage({
        variables: { user, content },
      });
    }

    spanRef.current?.scrollIntoView();
    setContent('');
  };
  return (
    <Container className="chat">
      <div className="chat__window">
        <Message user={user} />
        <span ref={spanRef}></span>
      </div>

      <Row className="form">
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
          <Button className="form__btn" onClick={onSend}>
            Send!
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default Chat;
