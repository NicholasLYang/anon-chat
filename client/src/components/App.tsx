import React from "react";
import withStyles, { WithStyles } from "react-jss";
import ChatBox from "./ChatBox";

const styles = {
  App: {
    display: "flex",
    fontFamily: "proxima-nova, sans-serif",
    fontWeight: "400",
    fontStyle: "normal",
    flexDirection: "column"
  },
  header: {
    padding: "20px",
    fontSize: "0.8rem"
  }
};

type Props = WithStyles<typeof styles>;

const App: React.FC<Props> = ({ classes }) => {
  return (
    <div className={classes.App}>
      <header className={classes.header}>
        <h1> Anon Chat </h1>
      </header>
      <ChatBox />
    </div>
  );
};

export default withStyles(styles)(App);
