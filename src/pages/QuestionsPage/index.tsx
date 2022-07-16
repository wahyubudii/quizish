import { Box, Button, CircularProgress, Typography } from '@mui/material'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ResponseTransformation from '../../utils/ResponseTransformation';
import { useNavigate } from 'react-router-dom';
import { decode } from "html-entities";
import { handleScoreChange } from '../../redux/action';

interface Props {
  question_category:string 
  question_difficulty:string
  question_type:string
  amount_of_question:number
  score:number
}

const getRandomInt = (max:number) => {
  return Math.floor(Math.random() * Math.floor(max));
};

const QuestionPages = () => {
  const {
    question_category,
    question_difficulty,
    question_type,
    amount_of_question,
    score
  } = useSelector((state: Props) => state);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  let endpointUrl = `/api.php?amount=${amount_of_question}`

  if (question_category) {
    endpointUrl = endpointUrl.concat(`&category=${question_category}`);
  }
  if (question_difficulty) {
    endpointUrl = endpointUrl.concat(`&difficulty=${question_difficulty}`);
  }
  if (question_type) {
    endpointUrl = endpointUrl.concat(`&type=${question_type}`);
  }

  const { response, error, loading } = ResponseTransformation({urlApi: endpointUrl})
  const [questionIndex, setQuestionIndex] = useState<number>(0);
  const [options, setOptions] = useState<any>([]);

  useEffect(() => {
    if (response?.results.length) {
      const question = response.results[questionIndex];
      let answers = [...question.incorrect_answers];
      answers.splice(
        getRandomInt(question.incorrect_answers.length),
        0,
        question.correct_answer
      );
      setOptions(answers);
    }
  }, [response, questionIndex]);

  if (loading) {
    return (
      <Box mt={20}>
        <CircularProgress />
      </Box>
    );
  }

  const handleClickAnswer = (e: any) => {
    const question = response.results[questionIndex];
    if (e.target.textContent === question.correct_answer) {
      dispatch(handleScoreChange(score + 1));
    }

    if (questionIndex + 1 < response.results.length) {
      setQuestionIndex(questionIndex + 1);
    } else {
      navigate("/result");
    }
  };

  
  return (
    <Box>
      <Typography variant='h4'>Question {questionIndex + 1}</Typography>
      <Typography mt={5}>{response.results[questionIndex].question}</Typography>
      {options.map((data:any, id:number) => (
        <Box mt={2} key={id}>
          <Button onClick={handleClickAnswer} variant="contained">
            {decode(data)}
          </Button>
        </Box>
      ))}
      {/* <Box mt={2}>
        <Button variant='contained'>Answer 1</Button>
      </Box>
      <Box mt={2}>
        <Button variant='contained'>Answer 1</Button>
      </Box> */}
      <Box mt={5}>
        Score: {score} / {response.results.length}
      </Box>
    </Box>
  )
}

export default QuestionPages