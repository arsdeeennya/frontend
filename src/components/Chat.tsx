import React from 'react';
import Container from '@material-ui/core/Container';
import styled from 'styled-components';
import ChatStart from './ChatStart';

// import ForumIcon from "@material-ui/icons/Forum";

const Main = styled.main`
  background-color: #f2f3f7;
  padding: 70px 0px 100px;
`;

const Chat: React.FC = () => {
  return (
    <React.Fragment>
      <Main>
        <Container>
          <h2>チャット</h2>
          <ChatStart />
        </Container>
      </Main>
    </React.Fragment>
  );
};

export default Chat;
