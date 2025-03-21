import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PeopleIcon from '@mui/icons-material/People';
import WorkHistoryIcon from '@mui/icons-material/WorkHistory';
import EngineeringIcon from '@mui/icons-material/Engineering';
import { useNavigate } from 'react-router-dom';
import WidgetsIcon from '@mui/icons-material/Widgets';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import { Link } from 'react-router-dom';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import Snackbar from '@mui/material/Snackbar'; // Import Snackbar
import "./AsanaNavBar.css";

const AsanaNavBar = () => {
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  const [openSnackbar, setOpenSnackbar] = React.useState(false); // State for Snackbar visibility
  const navigate = useNavigate();
  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };
  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('projectsCache');
    localStorage.removeItem('userGid');
    
    navigate('/asana-internal'); // Navigate the user to the login page or home page
    setOpenSnackbar(true); // Open the Snackbar on logout
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false); // Close the Snackbar
  };


  const accessToken = localStorage.getItem('accessToken'); // Check for accessToken in localStorage
  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {accessToken ? (
          <>

            <ListItem disablePadding>
              <ListItemButton onClick={() => navigate("/asana-internal/defect-fixing")}>
                <ListItemIcon>
                  <EngineeringIcon />
                </ListItemIcon>
                <ListItemText primary="Defect Fixing" />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton onClick={() => navigate("/asana-internal/projects")}>
                <ListItemIcon>
                  <AccountTreeIcon />
                </ListItemIcon>
                <ListItemText primary="Projects" />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton onClick={() => navigate("/asana-internal/pending-tasks")}>
                <ListItemIcon>
                  <WorkHistoryIcon />
                </ListItemIcon>
                <ListItemText primary="Pending Tasks" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton onClick={() => navigate("/asana-internal/users")}>
                <ListItemIcon>
                  <PeopleIcon />
                </ListItemIcon>
                <ListItemText primary="Users" />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton onClick={handleLogout}>
                <ListItemIcon>
                  <LogoutIcon />
                </ListItemIcon>
                <ListItemText primary="Logout" />
              </ListItemButton>
            </ListItem>
          </>
        ) : (
          <ListItem disablePadding>
            <ListItemButton onClick={() => navigate("/asana-internal")}>
              <ListItemIcon>
                {/* Assuming you have a login icon or use any appropriate icon */}
                <LoginIcon />
              </ListItemIcon>
              <ListItemText primary="Login" />
            </ListItemButton>
          </ListItem>
        )}
      </List>
      <Divider />
    </Box>
  );

  return (
    <>
      <div className='NavBar'>
        <WidgetsIcon onClick={toggleDrawer('left', true)} style={{ color: "white", height: 30, width: 30, cursor: "pointer" }} />
        <Drawer
          anchor={'left'}
          open={state['left']}
          onClose={toggleDrawer('left', false)}
        >
          {list('left')}
        </Drawer>
        <Link to={`https://awsaiapp.com/`}><img className='complogo' src={"/complogo.png"} alt='company logo' /></Link>
      </div>
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        message="Thank you for visiting! We hope to see you again soon."
      />
    </>
  );
}

export default AsanaNavBar;
