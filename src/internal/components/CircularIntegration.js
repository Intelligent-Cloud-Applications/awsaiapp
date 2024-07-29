import React, { useState, useEffect, useRef } from 'react';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { red, green, blue } from '@mui/material/colors';
import Fab from '@mui/material/Fab';
import CheckIcon from '@mui/icons-material/Check';
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';
import EditNoteIcon from '@mui/icons-material/EditNote';

export default function CircularIntegration({ onClick, actionType }) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const timer = useRef();

  let buttonSx = {};

  if (actionType === 'save') {
    buttonSx = {
      ...(success && {
        bgcolor: green[500],
        '&:hover': {
          bgcolor: green[700],
        },
      }),
    };
  } else if (actionType === 'delete') {
    buttonSx = {
      bgcolor: red[500],
      '&:hover': {
        bgcolor: red[700],
      },
    };
  } else if (actionType === 'edit') {
    buttonSx = {
      bgcolor: blue[500],
      '&:hover': {
        bgcolor: blue[700],
      },
    };
  }

  useEffect(() => {
    const time = timer.current;
    return () => {
      clearTimeout(time);
    };
  }, []);

  const handleButtonClick = () => {
    if (!loading) {
      setSuccess(false);
      setLoading(true);
      const onClickPromise = onClick();

      if (onClickPromise instanceof Promise) {
        onClickPromise
          .then(() => {
            setSuccess(true);
          })
          .catch(() => {
            // Handle error if needed
          })
          .finally(() => {
            setLoading(false);
          });
      } else {
        setLoading(false);
      }
    }
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ m: 1, position: 'relative' }}>
        <Fab
          aria-label={actionType}
          color="primary"
          sx={buttonSx}
          onClick={handleButtonClick}
          size='small'
        >
          {actionType === 'save' ? (success ? <CheckIcon /> : <SaveIcon />) : actionType === 'delete' ? <DeleteIcon /> : <EditNoteIcon />}
        </Fab>
        {loading && (
          <CircularProgress
            size={48}
            sx={{
              color: actionType === 'delete' ? red[500] : actionType === 'edit' ? blue[500] : green[500],
              position: 'absolute',
              top: -4,
              left: -4,
              zIndex: 1,
            }}
          />
        )}
      </Box>
    </Box>
  );
}
