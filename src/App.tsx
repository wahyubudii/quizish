import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import SettingsPages from "./pages/HomePage";
import QuestionPages from "./pages/QuestionsPage";
import ResultScreen from "./pages/ResultsPage";
import ErrorPage from "./pages/ErrorPage";
import { Box, Container } from "@mui/material";

function App() {
  return (
    <Router>
      <Container maxWidth="sm">
        <Box textAlign="center" mt={35}>
          <Routes>
            <Route path="/" element={<SettingsPages />}/>
            <Route path="/questions" element={<QuestionPages />} />
            <Route path="/result" element={<ResultScreen />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </Box>
      </Container> 
    </Router>
  );
}

export default App;
