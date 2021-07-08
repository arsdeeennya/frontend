import React, {useState} from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CreateIcon from '@material-ui/icons/Create';
import styled from 'styled-components'
import axios from "axios";


const Responce = styled.div`
  margin: 90px 110px 0px;
`
const Post = styled.div`
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
const Comment = styled.textarea`
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

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      margin: theme.spacing(1),
    },
  }),
);

const ThreadForm: React.FC =  () => {
  const [name, setName] = useState('');
  const [comment, setComment] = useState('');
  const classes = useStyles();

  const nameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value)
  }

  const commentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value)
  }

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const post = {
      name: name,
      message: comment
    }

    axios.post('http://127.0.0.1:8000/bbs/index/', post,{
      headers: { "Content-Type": "application/json" },
    })
    .then(res => {
      console.log(res);
    })
    .catch(res => {
      console.log(res)
    })
  }

  return (
    <React.Fragment>
      <Responce>
        <Post>レスを投稿する</Post>
        <form onSubmit={submit} >
          <Name placeholder={'名前(省略可)'} size={70} name="name" value={name} onChange={nameChange}/>
          <Comment placeholder={'コメント内容'} rows={5} cols={70} name="message" value={comment} onChange={commentChange}/>
          <Write variant="contained" color="primary" className={classes.button} endIcon={<CreateIcon/>} type='submit'>書き込む</Write>
        </form>
      </Responce>
    </React.Fragment>
  );
}

export default ThreadForm;