import { useState } from 'react';
import { useRouter } from 'next/router';
import {
  Box,
  Fade,
  IconButton,
  List,
  ListItemText,
  Paper,
  useTheme,
  Typography,
  ListItemIcon,
  ListItemButton
} from '@mui/material';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import LockOpenTwoToneIcon from '@mui/icons-material/LockOpenTwoTone';
import LoginIcon from '@mui/icons-material/Login';
import PanToolTwoToneIcon from '@mui/icons-material/PanToolTwoTone';
import { usePopper } from 'react-popper';
import { useAuthContext } from 'src/contexts/AuthContext';

export default function User() {
  const { user, logout } = useAuthContext();
  const theme = useTheme();
  const navigate = useRouter();
  const [open, setOpen] = useState(false);
  const [popperElement, setPopperElement] = useState(null);
  const [referenceElement, setReferenceElement] = useState(null);
  const { styles, attributes, update } = usePopper(
    referenceElement,
    popperElement,
    {
      placement: 'top-end'
    }
  );

  const handleOpen = () => {
    setOpen(true);
    update ? update() : null;
  };

  const handleClose = (event) => {
    setOpen(false);
  };

  return (
    <>
      <IconButton
        color="primary"
        onMouseEnter={handleOpen}
        onMouseLeave={handleClose}
        ref={(e) => setReferenceElement(e)}
      >
        <AccountCircleOutlinedIcon fontSize="small" />
      </IconButton>

      <Fade in={open} timeout={500}>
        <Box
          style={styles.popper}
          sx={{ pt: 2 }}
          ref={setPopperElement}
          {...attributes.popper}
          onMouseEnter={handleOpen}
          onMouseLeave={handleClose}
        >
          <Paper
            sx={{
              borderRadius: 1,
              boxShadow: '0 0 0 0 rgba(0,123,255,0)!important',
              maxHeight: '150px',
              ':hover': {
                borderColor: 'transparent',
                boxShadow: '0 1px 7px 0 rgb(32 40 45 / 4%)'
              }
            }}
          >
            <Box>
              <List
                component="nav"
                sx={{
                  width: '100%',
                  maxWidth: 350,
                  [theme.breakpoints.down('md')]: { minWidth: '100%' },
                  '& .MuiListItemButton-root': { mt: 0.5 },
                  background: 'transparent'
                }}
              >
                {user ? (
                  <>
                    <ListItemText
                      sx={{ mt: '12px' }}
                      primary={
                        <ListItemIcon>
                          <PanToolTwoToneIcon
                            stroke={1}
                            sx={{ mx: '12px', fontSize: '24px' }}
                          />
                          <Typography sx={{ textTransform: 'capitalize' }}>
                            Hi, {user.username} !
                          </Typography>
                        </ListItemIcon>
                      }
                    />

                    <ListItemButton
                      disableRipple
                      sx={{
                        borderRadius: `30px`,
                        '&& :hover': {
                          color: theme.palette.primary.main
                        }
                      }}
                      style={{ backgroundColor: 'transparent' }}
                      onClick={() => logout()}
                    >
                      <ListItemText
                        primary={
                          <ListItemIcon>
                            <LockOpenTwoToneIcon
                              stroke={1.5}
                              sx={{ mr: '10px', fontSize: '24px' }}
                            />
                            <Typography sx={{}}>Log Out</Typography>
                          </ListItemIcon>
                        }
                      />
                    </ListItemButton>
                  </>
                ) : (
                  <ListItemButton
                    disableRipple
                    sx={{
                      borderRadius: `30px`,
                      '&& :hover': {
                        color: theme.palette.primary.main
                      }
                    }}
                    style={{ backgroundColor: 'transparent' }}
                    onClick={() => navigate.push('/auth/login')}
                  >
                    <ListItemText
                      primary={
                        <ListItemIcon>
                          <LoginIcon
                            stroke={1.5}
                            size="1rem"
                            sx={{ mr: '10px' }}
                          />
                          <Typography sx={{ mt: '3px' }}>Sign In</Typography>
                        </ListItemIcon>
                      }
                    />
                  </ListItemButton>
                )}
              </List>
            </Box>
          </Paper>
        </Box>
      </Fade>
    </>
  );
}
