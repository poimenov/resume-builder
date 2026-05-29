import { TextField, Box, Typography } from '@mui/material';
import { useStore } from '@nanostores/react';
import { resumeStore, updatePersonal } from '../stores/resumeStore';

export function PersonalForm() {
  const personal = useStore(resumeStore).personal;
  
  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6">Personal Information</Typography>
      <TextField
        label="First Name"
        value={personal.firstName}
        onChange={(e) => updatePersonal('firstName', e.target.value)}
        fullWidth
        margin="normal"
      />
      {/* другие поля */}
    </Box>
  );
}