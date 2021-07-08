import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import styled from 'styled-components';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import CommentIcon from '@material-ui/icons/Comment';
import ForumIcon from '@material-ui/icons/Forum';

const Main = styled.main`
  background-color: #f2f3f7;
  padding: 70px 0px 50px;
`
const CC = styled(CardContent)`
  &:hover {
    transform: translate(0, 3px);
  }
`
const Description = styled(Typography)`
  margin-bottom: 100px;
`
const LinkMS = styled(Link)`
  text-decoration: none;
`
const CardMS = styled(Card)`
  background-color: #3f51b5;
  color: white;
  border-radius: 50px;
`
const IconTitle = styled(Typography)`
  text-align: center;
  font-size: 27px;
`

const Home: React.FC =  () => {
  const useStyles = makeStyles((theme) => ({
    icon: {
      marginRight: theme.spacing(2),
    },
    heroContent: {
      padding: theme.spacing(8, 0, 6),
    },
    heroButtons: {
      marginTop: theme.spacing(4),
    },
    cardGrid: {
      paddingTop: theme.spacing(8),
      paddingBottom: theme.spacing(8),
    },
    card: {
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
    },
    cardMedia: {
      paddingTop: '56.25%',
    },
    footer: {
      backgroundColor: theme.palette.background.paper,
      padding: theme.spacing(6),
    },
  }));
  const classes = useStyles();
  const cards= [{title: '掲示板', icon: <CommentIcon fontSize="large"/>, url: '/thread'},
                {title: 'チャット', icon: <ForumIcon fontSize="large"/>, url: '/chat'}];
  
  return (
    <React.Fragment>
      <Main>
        <div className={classes.heroContent}>
          <Container maxWidth="lg">
            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
              海外移住ちゃんねる
            </Typography>
            <Description variant="h5" align="center" color="textSecondary" paragraph>
              日本から飛び出して暮らしてみたい<br/>そんな人たちが集まるコミィニティサイトです<br/>
            </Description>
            <Grid container spacing={4}>
              {cards.map((card, index: number) => (
                  <Grid item key={index} xs={12} sm={6} md={4}>
                    <LinkMS to={card.url}>
                      <CardMS className={classes.card}>
                        <CC style={{padding: 15}}>
                          <IconTitle variant="h5">
                            {card.icon}{card.title}
                          </IconTitle>
                        </CC>
                      </CardMS>
                    </LinkMS>
                  </Grid>
              ))}
            </Grid>
          </Container>
        </div>
      </Main>
    </React.Fragment>
  );
}
export default Home;