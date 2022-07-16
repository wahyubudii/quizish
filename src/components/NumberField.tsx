import { Box, FormControl, TextField } from '@mui/material'
import { useDispatch } from 'react-redux';
import { handleAmountChange } from '../redux/action';

const NumberField = () => {
  const dispatch = useDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(handleAmountChange(e.target.value));
  }
  
  return (
    <Box mt={3} width="100%">
        <FormControl fullWidth>
            <TextField onChange={handleChange} variant="outlined" label="Amount of Questions" type="number"/>
        </FormControl>
    </Box>
  )
}

export default NumberField