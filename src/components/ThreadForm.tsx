import React, { Dispatch, SetStateAction } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CreateIcon from '@material-ui/icons/Create';
import styled from 'styled-components';
import { useForm, SubmitHandler } from 'react-hook-form';
import { bbsGet } from '../service/api';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { db } from '../service/firebase';

type FormInputs = {
  name: string;
  comment: string;
};

type PostType = {
  name: string;
  comment: string;
  created_at: any;
};

const Responce = styled.div`
  margin: 90px 110px 0px;
`;
const ResPost = styled.div`
  font-size: 20px;
  font-weight: 700;
  margin-top: 20px;
  border-bottom: 1px dotted #dcdcdc;
  padding-bottom: 5px;
  margin-bottom: 1em;
`;
const Name = styled.input`
  width: 100%;
  font-size: 130%;
  padding: 8px 14px;
  margin-bottom: 15px;
  display: block;
  border: 1px solid #ccc;
  border-radius: 5px;
`;
const CommentArea = styled.textarea`
  width: 100%;
  font-size: 170%;
  padding: 8px 14px;
  margin-bottom: 15px;
  display: block;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Write = styled(Button)`
  float: right;
  font-size: 20px;
`;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      margin: theme.spacing(1)
    },
    root: {
      flexGrow: 1
    }
  })
);

const ErrorMsg = styled.span`
  color: deeppink;
  font-weight: 700;
`;

const ThreadForm: React.FC<{
  setPosts: Dispatch<SetStateAction<Array<PostType>>>;
}> = props => {
  const classes = useStyles();
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors }
  } = useForm<FormInputs>();
  const onSubmit: SubmitHandler<FormInputs> = (data: FormInputs) => {
    if (data.name === '') {
      data.name = '名無しさん';
    }
    db.collection('bbs')
      .add({
        name: data.name,
        comment: data.comment,
        created_at: firebase.firestore.FieldValue.serverTimestamp()
      })
      .then(res => {
        setValue('name', '');
        setValue('comment', '');
        fetch();
      })
      .catch(res => {
        console.log(res);
      });
  };

  const fetch = async () => {
    const data = await bbsGet();
    props.setPosts(data);
  };

  return (
    <React.Fragment>
      <Responce>
        <ResPost>レスを投稿する</ResPost>
        <form onSubmit={handleSubmit(onSubmit)}>
          {errors.name && <ErrorMsg>名前が長すぎます！</ErrorMsg>}
          <Name
            {...register('name', { maxLength: 20 })}
            placeholder={'名前(省略可)'}
            size={70}
          />
          {errors.comment && <ErrorMsg>本文がありません！</ErrorMsg>}
          <CommentArea
            {...register('comment', { required: true })}
            placeholder={'コメント内容'}
            rows={5}
            cols={70}
          />
          <Write
            variant='contained'
            color='primary'
            className={classes.button}
            endIcon={<CreateIcon />}
            type='submit'
          >
            書き込む
          </Write>
        </form>
      </Responce>
    </React.Fragment>
  );
};

export default ThreadForm;
