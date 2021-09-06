import React, {useState, useEffect} from 'react';
import Container from '@material-ui/core/Container';
import styled from 'styled-components';
import * as Api from "../service/api"
import "firebase/firestore"
import ThreadList from "./ThreadList"
import ThreadForm from "./ThreadForm"


type PostType = {
  name: string;
  comment: string;
  created_at: any;
}

const Main = styled.main`
  background-color: #f2f3f7;
  padding: 70px 0px 100px;
`

const Thread: React.FC =  () => {

  const [posts, setPosts] = useState<Array<PostType>>([]);
  

  useEffect(()=>{
    fetch();
  }, [])

  const fetch = async() => {
    const data = await Api.bbsGet();
    setPosts(data);
  }

  return (
    <React.Fragment>
      <Main>
        <Container>
          <ThreadList posts={posts} setPosts={setPosts}/>
          <ThreadForm setPosts={setPosts} />
        </Container>
      </Main>
    </React.Fragment>
  );
}

export default Thread;