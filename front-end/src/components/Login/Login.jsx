import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Container,
  Stack,
  Link,
  Alert,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import { styled } from "@mui/system";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Style de la page
const StyledContainer = styled(Container)(({ theme }) => ({
  display: "flex",
  height: "100vh",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledBox = styled(Box)(({ theme }) => ({
  maxWidth: 400,
  width: "100%",
  padding: theme.spacing(4),
  borderRadius: theme.shape.borderRadius,
  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
  backgroundColor: "#fff",
}));

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    axios
      .post("http://localhost:8060/login", { email, password })
      .then((response) => {
        console.log(response.data);
        localStorage.setItem("token", response.data.token); // Save JWT token in localStorage
        window.location.href = "/"; 
      })
      .catch((error) => {
        setErrorMessage("Erreur lors de la connexion");
      });
  };

  return (
    <StyledContainer maxWidth="lg">
      <Box flex={1} textAlign="center" paddingRight={4}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Bonjour, Bon retour
        </Typography>
        <Typography variant="body1" color="textSecondary"></Typography>
      </Box>

      <StyledBox>
        <Typography variant="h5" fontWeight="bold" mb={2} textAlign="center">
          Sign in to your account
        </Typography>
        <Typography variant="body2" mb={3} textAlign="center">
          Don’t have an account?{" "}
          <Link href="/register" underline="hover">
            Get started
          </Link>
        </Typography>

        {/* Display error message if login fails */}
        {errorMessage && <Alert severity="error">{errorMessage}</Alert>}

        {/* Email and Password Fields */}
        <Stack spacing={2} mb={2}>
          <TextField
            fullWidth
            label="Email address"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            InputProps={{
              endAdornment: <EmailIcon color="action" />,
            }}
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              endAdornment: <LockIcon color="action" />,
            }}
          />
        </Stack>

        {/* Forgot Password Link */}
        <Box textAlign="right" mb={2}>
          <Link href="#" underline="hover" color="primary">
            Forgot password?
          </Link>
        </Box>

        {/* Sign In Button */}
        <Button
          variant="contained"
          fullWidth
          size="large"
          onClick={handleLogin}
        >
          Sign in
        </Button>
      </StyledBox>
    </StyledContainer>
  );
};

export default LoginPage;
