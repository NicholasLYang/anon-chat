import React, {ButtonHTMLAttributes} from "react";
import withStyles, { WithStyles } from "react-jss";

const styles = {
  Button: {
    padding: "5px",
    margin: "5px",
    fontSize: "1.05rem",
    borderRadius: "10px"
  }
};

interface Props extends WithStyles<typeof styles> {
  className?: string;
}
const Button: React.FunctionComponent<Props & ButtonHTMLAttributes<HTMLButtonElement>> = ({
  children,
  classes,
  className,
  ...props
}) => {
  return (
    <button {...props} className={classes.Button + " " + className}>
      {children}
    </button>
  );
};

export default withStyles(styles)(Button);
