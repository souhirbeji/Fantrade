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
import { styled } from "@mui/system";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const handleRegister = () => {
    axios
      .post("http://localhost:8060/register", {
        name,
        email,
        password,
      })
      .then((response) => {
        console.log(response.data);
        localStorage.setItem("token", response.data.token);
        setSuccessMessage("Registration successful! Redirecting to login...");
        setErrorMessage("");
        window.location.href = "/"; 
      })
      .catch((error) => {
        if (error.response) {
          setErrorMessage(
            error.response.data.error || "Error during registration"
          );
        } else {
          setErrorMessage("An error occurred during registration");
        }
        setSuccessMessage("");
      });
  };

  return (
    <StyledContainer maxWidth="lg">
      <Box flex={1} textAlign="center" paddingRight={4}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Join the Fun
        </Typography>
        <Typography variant="body1" color="textSecondary"></Typography>
      </Box>

      <StyledBox>
        <Typography variant="h5" fontWeight="bold" mb={2} textAlign="center">
          Get started absolutely free
        </Typography>
        <Typography variant="body2" mb={3} textAlign="center">
          Already have an account?{" "}
          <Link href="/login" underline="hover">
            Sign in
          </Link>
        </Typography>

        {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
        {successMessage && <Alert severity="success">{successMessage}</Alert>}

        <Stack spacing={2} mb={2}>
          <TextField
            fullWidth
            label="Name"
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            fullWidth
            label="Email address"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            variant="outlined"
            placeholder="6+ characters"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Stack>

        {/* Bouton Register */}
        <Button
          variant="contained"
          fullWidth
          size="large"
          sx={{ mb: 2 }}
          onClick={handleRegister}
        >
          Create account
        </Button>

        {/* Conditions */}
        <Typography variant="caption" textAlign="center" display="block">
          By signing up, I agree to{" "}
          <Link href="#" underline="hover">
            Terms of service
          </Link>{" "}
          and{" "}
          <Link href="#" underline="hover">
            Privacy policy
          </Link>
          .
        </Typography>
      </StyledBox>
    </StyledContainer>
  );
};

export default RegisterPage;
