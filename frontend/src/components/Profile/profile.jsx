import React from "react";
import {
  Container,
  Grid,
  Paper,
  Card,
  CardContent,
  CardMedia,
  Button,
  Typography,
  Link,
  List,
  ListItem,
  ListItemText,
  LinearProgress,
  Divider,
  Box,
  makeStyles,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(2),
  },
  card: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
  },
  media: {
    width: "150px",
    height: "150px",
    borderRadius: "50%",
  },
  listItem: {
    justifyContent: "space-between",
  },
}));

export default function ProfilePage() {
  const classes = useStyles();

  return (
    <Container className={classes.root}>
      <Grid container spacing={3}>
        {/* <Grid item lg={4}>
          <Card className={classes.card} component={Paper}>
            <CardMedia
              className={classes.media}
              image="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
              alt="avatar"
            />
            <CardContent>
              <Typography
                variant="subtitle1"
                color="textSecondary"
                gutterBottom>
                Full Stack Developer
              </Typography>
              <Typography variant="body2" color="textSecondary" gutterBottom>
                Bay Area, San Francisco, CA
              </Typography>
              <div>
                <Button variant="contained" color="primary">
                  Follow
                </Button>
                <Button variant="outlined" className={classes.marginLeft}>
                  Message
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className={classes.card} component={Paper}>
            <CardContent>
              <List>
                <ListItem className={classes.listItem}>
                  <Typography variant="body2">Website:</Typography>
                  <ListItemText>
                    <Link href="https://mdbootstrap.com">
                      https://mdbootstrap.com
                    </Link>
                  </ListItemText>
                </ListItem>
                <Divider />
                <ListItem className={classes.listItem}>
                  <Typography variant="body2">GitHub:</Typography>
                  <ListItemText>
                    <Link href="https://github.com/mdbootstrap">
                      mdbootstrap
                    </Link>
                  </ListItemText>
                </ListItem>
                <Divider />
                <ListItem className={classes.listItem}>
                  <Typography variant="body2">Twitter:</Typography>
                  <ListItemText>
                    <Link href="https://twitter.com/mdbootstrap">
                      @mdbootstrap
                    </Link>
                  </ListItemText>
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid> */}

        <Grid item lg={8}>
          <Card className={classes.card} component={Paper}>
            <CardContent>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  flexWrap: "wrap",
                }}>
                <div style={{ flex: 1 }}>
                  <Typography variant="h6">Full Name</Typography>
                  <Typography variant="body2" color="textSecondary">
                    Johnatan Smith
                  </Typography>
                </div>
              </div>
              <div>
                <div style={{ flex: 1 }}>
                  <Typography variant="h6">UserName</Typography>
                  <Typography variant="body2" color="textSecondary">
                    example@example.com
                  </Typography>
                </div>
              </div>
              <div>
                <div style={{ flex: 1 }}>
                  <Typography variant="h6">Email</Typography>
                  <Typography variant="body2" color="textSecondary">
                    example@example.com
                  </Typography>
                </div>
              </div>
              <div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "wrap",
                  }}>
                  <div style={{ flex: 1 }}>
                    <Typography variant="h6">Phone</Typography>
                    <Typography variant="body2" color="textSecondary">
                      (097) 234-5678
                    </Typography>
                  </div>
                </div>
                <div style={{ flex: 1 }}>
                  <Typography variant="h6">Mobile</Typography>
                  <Typography variant="body2" color="textSecondary">
                    (098) 765-4321
                  </Typography>
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  flexWrap: "wrap",
                }}>
                <div style={{ flex: 1 }}>
                  <Typography variant="h6">Address</Typography>
                  <Typography variant="body2" color="textSecondary">
                    Bay Area, San Francisco, CA
                  </Typography>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className={classes.card} component={Paper}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Assignment Project Status
              </Typography>
              <Typography variant="body2">Web Design</Typography>
              <LinearProgress variant="determinate" value={80} />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}
