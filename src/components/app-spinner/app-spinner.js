import { Backdrop, CircularProgress, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

export function AppSpinner({ isOpen }) {
  const classes = useStyles();
  return (
    <Backdrop className={classes.backdrop} open={isOpen}>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
}