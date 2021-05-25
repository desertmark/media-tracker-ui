import { makeStyles, useTheme } from '@material-ui/core/styles';
import ToggleButton from '@material-ui/lab/ToggleButton';




export default function Toggle({ color, children, ...props }) {
    const theme = useTheme();
    const useStyles = makeStyles({
        selected: {
            backgroundColor: theme.palette[color].main + '!important',
            color: theme.palette[color].contrastText + '!important',
        },
    });
    const classes = useStyles();

    return <ToggleButton classes={{ selected: classes.selected }} {...props}>{children}</ToggleButton>
}
