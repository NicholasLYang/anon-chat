import React from "react";
import withStyles, { WithStyles } from "react-jss";
import ConversationsList from "./ConversationsList";

const styles = {
  App: {
    display: "flex",
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
      <ConversationsList />
    </div>
  );
};

export default withStyles(styles)(App);
