import React, {useState, useEffect} from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import axios from "axios";
import styled from 'styled-components'

const Post = styled.div`
  font-size: 20px;
  background-color: #ffffff;
  padding: 15px;
  margin-bottom: 10px;
  border-radius: 5px;
  display: inline-block;
  border-style: none solid solid none;
  border-color: #ddd;
`
const Message = styled.div`
  padding: 12px 0px;
`

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      flexGrow: 1,
    },
  }),
);

type PostType = {
  id: number;
  name: string;
  message: string;
  ip: string;
  week: string;
}

const ThreadList: React.FC =  () => {
  const [posts, setPosts] = useState<Array<PostType>>([]);
  const classes = useStyles();

  useEffect(() => {
    axios.get<Array<PostType>>('http://127.0.0.1:8000/bbs/index/')
      .then((res) => {setPosts(res.data)})
      .catch((res) => {console.log(res)})
  }, []);

  return (
    <React.Fragment>
      <div className={classes.root}>
        {posts.map((post, index) => (
          <div key={index}>
            <Post>
            <div>
              <span>{post.id}</span>
              <span>
                <b><a href="mailto:sage">{post.name}</a></b>
              </span>
              <span>2021/05/24(月) 12:55:00.32</span>
              <span>{post.ip}</span>
            </div>
            <Message>
              <span>{post.message}</span>
            </Message>
           </Post>
          </div>
        ))}
      </div>
    </React.Fragment>
  );
}

export default ThreadList;