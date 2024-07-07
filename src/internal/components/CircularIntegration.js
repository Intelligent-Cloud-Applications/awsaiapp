import React, { useState, useEffect, useRef } from 'react';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { green } from '@mui/material/colors';
import Fab from '@mui/material/Fab';
import CheckIcon from '@mui/icons-material/Check';
import SaveIcon from '@mui/icons-material/Save';

export default function CircularIntegration({ onClick }) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const timer = useRef();

  const buttonSx = {
    ...(success && {
      bgcolor: green[500],
      '&:hover': {
        bgcolor: green[700],
      },
    }),
  };

  useEffect(() => {
    const currentTimer = timer.current;
    return () => {
      clearTimeout(currentTimer);
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
            setLoading(false);
          })
          .catch(() => {
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
          aria-label="save"
          color="primary"
          sx={buttonSx}
          onClick={handleButtonClick}
        >
          {success ? <CheckIcon /> : <SaveIcon />}
        </Fab>
        {loading && (
          <CircularProgress
            size={68}
            sx={{
              color: green[500],
              position: 'absolute',
              top: -6,
              left: -6,
              zIndex: 1,
            }}
          />
        )}
      </Box>
    </Box>
  );
}
