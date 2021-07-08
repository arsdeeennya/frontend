import React, {useState, useEffect} from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import axios from "axios";
import Button from '@material-ui/core/Button';
import CreateIcon from '@material-ui/icons/Create';
import Container from '@material-ui/core/Container';
import styled from 'styled-components';
import { useForm, SubmitHandler } from "react-hook-form";
import Moment from 'react-moment';

type FormInputs = {
  name: string,
  message: string,
};

const Responce = styled.div`
  margin: 90px 110px 0px;
`
const ResPost = styled.div`
  font-size: 20px;
  font-weight: 700;
  margin-top: 20px;
  border-bottom: 1px dotted #dcdcdc;
  padding-bottom: 5px;
  margin-bottom: 1em;
`
const Name = styled.input`
  width: 100%;
  font-size: 130%;
  padding: 8px 14px;
  margin-bottom: 15px;
  display: block;
  border: 1px solid #ccc;
  border-radius: 5px;
`
const MessageArea = styled.textarea`
  width: 100%;
  font-size: 170%;
  padding: 8px 14px;
  margin-bottom: 15px;
  display: block;
  border: 1px solid #ccc;
  border-radius: 5px;
`

const Write = styled(Button)`
  float: right;
  font-size: 20px;
`

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
const Message = styled.div`
  padding: 12px 0px;
`

const ErrorMsg = styled.span`
  color: deeppink;
  font-weight: 700;
`

type PostType = {
  id: number;
  name: string;
  message: string;
  ip: string;
  week: string;
  created_at: string;
}

const Main = styled.main`
  background-color: #f2f3f7;
  padding: 70px 0px 100px;
`

const Thread: React.FC =  () => {
  const { register, setValue, handleSubmit, formState: { errors } } = useForm<FormInputs>();

  const [posts, setPosts] = useState<Array<PostType>>([]);
  
  const onSubmit: SubmitHandler<FormInputs> = (data: FormInputs, e: any) => {
    if(data.name === ''){
      data.name = '名無しさん'
    }
    axios.post('http://127.0.0.1:8000/bbs/index/', data,{
      headers: { "Content-Type": "application/json" },
    })
    .then(res => {
      setPosts(prevPosts => [...prevPosts,res.data])
      setValue('name', '')
      setValue('message', '')
      e.target.reset();
    })
    .catch(res => {
      console.log(res)
    })
  };

  const classes = useStyles();

  useEffect(() => {
    axios.get<Array<PostType>>('http://127.0.0.1:8000/bbs/index/')
      .then((res) => setPosts(res.data));
  }, []);

  return (
    <React.Fragment>
      <Main>
        <Container>
          <div className={classes.root}>
            {posts.map((post, index) => (
              <div key={index}>
                <Post>
                <div>
                  <span>{post.id}.  </span>
                  <span>
                    <Bold>{post.name} </Bold>
                  </span>
                  <Moment format="YYYY年MM月DD日 HH:mm:ss ">
                    {post.created_at}
                  </Moment>
                  <span>ID:{post.ip}</span>
                </div>
                <Message>
                  <span>{post.message}</span>
                </Message>
              </Post>
              </div>
            ))}
          </div>
          <Responce>
            <ResPost>レスを投稿する</ResPost>
            <form onSubmit={handleSubmit(onSubmit)}>
              {errors.name && <ErrorMsg>名前が長すぎます！</ErrorMsg>}
              <Name {...register("name", { maxLength: 20 })} placeholder={'名前(省略可)'} size={70} />
              {errors.message && <ErrorMsg>本文がありません！</ErrorMsg>}
              <MessageArea {...register("message", { required: true })} placeholder={'コメント内容'} rows={5} cols={70} />
              <Write variant="contained" color="primary" className={classes.button} endIcon={<CreateIcon/>} type='submit'>書き込む</Write>
            </form>
          </Responce>
        </Container>
      </Main>
    </React.Fragment>
  );
}

export default Thread;