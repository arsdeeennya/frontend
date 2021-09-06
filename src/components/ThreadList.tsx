import React, { useEffect } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import styled from 'styled-components';
import Moment from 'react-moment';
import * as Api from "../service/api"
import "firebase/firestore"

type PostType = {
  name: string;
  comment: string;
  created_at: any;
}

interface PROPS {
  posts: PostType[];
  setPosts: any;
}

const Bold = styled.b`
  color: #3f51b5;
`

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      margin: theme.spacing(1),
    },
    root: {
      flexGrow: 1,
    },
  }),
);

const Post = styled.div`
  font-size: 20px;
  background-color: #ffffff;
  padding: 15px;
  margin-bottom: 10px;
  border-radius: 5px;
  border-style: none solid solid none;
  border-color: #ddd;
`
const Comment = styled.div`
  padding: 12px 0px;
`

const ThreadList: React.FC<PROPS> = (props) => {
  const classes = useStyles();

  useEffect(()=>{
    fetch();
  }, [])

  const fetch = async() => {
    const data = await Api.bbsGet();
    props.setPosts(data);
  }

  return (
    <React.Fragment>
      <div className={classes.root}>
        {props.posts.map((post:PostType , index: number) => (
          <div key={index}>
            <Post>
            <div>
              <span>{index+1}.  </span>
              <span>
                <Bold>{post.name} </Bold>
              </span>
              <Moment format="YYYY年MM月DD日 HH:mm:ss ">
                {new Date(post.created_at?.toDate()).toLocaleString()}
              </Moment>
            </div>
            <Comment>
              <span>{post.comment}</span>
            </Comment>
          </Post>
          </div>
        ))}
      </div>
    </React.Fragment>
  );
}

export default ThreadList;