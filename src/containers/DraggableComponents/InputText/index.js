import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import AccountCircle from '@mui/icons-material/AccountCircle';

export default function InputWithIcon() {
  return (
    <Box sx={{'& > :not(style)': {m: 1}}}>
      <Box sx={{display: 'flex', alignItems: 'flex-end'}}>
        <AccountCircle sx={{color: 'action.active', mr: 1, my: 0.5}} />
        <TextField id="input-with-sx" label="With sx" variant="standard" style={{width: '100%'}} />
      </Box>
    </Box>
  );
}

