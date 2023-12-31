import React from "react";
import { BASE_URL } from "../../services/rootServices";
import { useParams } from "react-router-dom";
import {
  Container,
  Grid,
  Paper,
  Card,
  CardContent,
  Typography,
  LinearProgress,
  makeStyles,
} from "@material-ui/core";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";

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
    backgroundColor: "rgba(228, 228, 228, 0.947)", // Dark background color

  },
  media: {
    width: "150px",
    height: "150px",
    borderRadius: "50%",
  },
  listItem: {
    justifyContent: "space-between",
  },
  progress: {
    marginTop: theme.spacing(2),
  },
}));

export default function ProfilePage() {
  const classes = useStyles();
  const { userId } = useParams();

  const [totalProblems, setTotalProblems] = useState(0);
  const [solvedProblems, setSolvedProblems] = useState(0);
  const [progressPercentage, setProgressPercentage] = useState(0);

  useEffect(() => {
    console.log(userId);

    // Fetch total questions available
    axios
      .get(`${BASE_URL}/progress`)
      .then((response) => {
        const { totalQuestions } = response.data;
        console.log(totalQuestions);
        setTotalProblems(totalQuestions);
      })
      .catch((error) => {
        console.error("Error fetching total questions:", error);
      });

    // Fetch total problems solved by the user
    axios
      .get(`${BASE_URL}/user/${userId}/solvedCounts`)
      .then((response) => {
        const { solvedCount } = response.data.data;
        console.log(solvedCount);

        // Update the state and calculate progress percentage
        setSolvedProblems(solvedCount);
      })
      .catch((error) => {
        console.error("Error fetching user submission counts:", error);
      });
  }, [userId]); // Add userId as a dependency to useEffect

  useEffect(() => {
    // Calculate progress percentage here, since solvedProblems has been updated
    if (totalProblems > 0) {
      const percentage = (solvedProblems / totalProblems) * 100;
      setProgressPercentage(percentage);
    }
  }, [solvedProblems, totalProblems]);

  return (
    <Container className={classes.root}>
      <Grid
        container
        spacing={3}
        className="profile_grid_container"
        style={{ display: "flex", margin: "auto", justifyContent: "center" }}>
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
              <div className={classes.progress}>
                <Typography variant="h6">Progress</Typography>
                <LinearProgress
                  variant="determinate"
                  value={progressPercentage}
                />
                <Typography variant="body2" color="textSecondary">
                  {solvedProblems} out of {totalProblems} problems solved
                </Typography>
              </div>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}
