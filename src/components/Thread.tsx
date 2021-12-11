import React, { useState } from 'react';
import Container from '@material-ui/core/Container';
import styled from 'styled-components';
import ThreadList from './ThreadList';
import ThreadForm from './ThreadForm';

type PostType = {
  name: string;
  comment: string;
  created_at: any;
};

const Main = styled.main`
  background-color: #f2f3f7;
  padding: 70px 0px 100px;
`;

const Thread: React.FC = () => {
  const [posts, setPosts] = useState<Array<PostType>>([]);

  return (
    <React.Fragment>
      <Main>
        <Container>
          <h2>掲示板</h2>
          <ThreadList posts={posts} setPosts={setPosts} />
          <ThreadForm setPosts={setPosts} />
        </Container>
      </Main>
    </React.Fragment>
  );
};

export default Thread;
