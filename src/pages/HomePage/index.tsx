import { Button, CircularProgress, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import SelectField from '../../components/SelectField'
import NumberField from '../../components/NumberField'
import { difficultyOptions, typeOptions } from '../../utils/OptionsMenu'
import ResponseTransformation from '../../utils/ResponseTransformation'

const HomePage = () => {
  const { response, error, loading, } = ResponseTransformation({ urlApi: "/api_category.php" })
  const navigate = useNavigate()
  
  if (loading) {
    return (
      <Box mt={20}>
        <CircularProgress />
      </Box>
    )
  }

  if (error) {
    return (
      <Typography variant='h6' mt={20} color="red">
        Error with endpoint
      </Typography>
    )
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); 
    navigate('/questions')
  }

  return (
    <Box>
      <Typography variant='h2' fontWeight="bold">
        Quizish
      </Typography>
      <form onSubmit={handleSubmit}>
        <SelectField options={response.trivia_categories} label="Category" />
        <SelectField options={difficultyOptions} label="Difficulty" />
        <SelectField options={typeOptions} label="Type" />
        <NumberField />
        <Box mt={3} width="100%">
          <Button fullWidth variant='contained' type='submit'>
            Get Started
          </Button>
        </Box>
      </form>
    </Box>
  )
}

export default HomePage