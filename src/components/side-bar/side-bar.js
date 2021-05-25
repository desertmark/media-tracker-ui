import { List, ListItem, Drawer, ListItemIcon, ListItemText, useTheme, Box, Divider, Avatar } from "@material-ui/core";
import { useLoginState } from "../../app/login/login.context";
import Text from "../text/text";
import './side-bar.css';


export default function SideBar({ open, onClose, items, onItemClick }) {
  const theme = useTheme();
  const { currentUser, isAuthenticated } = useLoginState();
  return (
    <Drawer achor="left" open={open} onClose={onClose}>
      <Box bgcolor={theme.palette.primary.main} className="sidebar__content">
        {isAuthenticated &&
          <Box py={4} px={2} display="flex" alignItems="center">
            <Avatar alt={currentUser.displayName[0]} src={currentUser.photoURL} />
            <Box ml={2}>
              <Text color={theme.palette.primary.contrastText} weight="bold">{currentUser.displayName}</Text>
            </Box>
          </Box>
        }
        <Divider light={true}/>
        <List>
          {items.map((item) =>
            <ListItem button key={item.key} onClick={() => onItemClick(item.key)}>
              <ListItemIcon>
                <Box color={theme.palette.primary.contrastText}><item.icon /></Box>
              </ListItemIcon>
              <ListItemText primaryTypographyProps={{ color: 'textSecondary' }} primary={item.text} />
            </ListItem>
          )}
        </List>
      </Box>
    </Drawer>
  );
}