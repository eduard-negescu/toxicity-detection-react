import { useState } from "react";
import api from "../api";
import { Button, Card, FormControl, FormLabel, Input, Snackbar } from "@mui/joy";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await api.post(
        "/users/token",
        new URLSearchParams({
          grant_type: "password",
          username,
          password,
        }),
        {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
        }
      );
      localStorage.setItem("token", response.data);
      localStorage.setItem("username", username);
      window.location.href = "/";
    } catch (error) {
      setError("Login failed. Please check your credentials and try again.");
      setOpenSnackbar(true);
      console.error("Login error:", error);
    }
  };

  return (
    <div>
      <Card 
        component="form" 
        onSubmit={handleLogin}
        sx={{
          maxWidth: 400,
          mx: 'auto',
          mt: 4,
          p: 3,
          gap: 2
        }}
      >
        <legend style={{ fontSize: '1.5rem', textAlign: 'center', marginBottom: '1rem' }}>
          Sign In
        </legend>

        <FormControl>
          <FormLabel>Username</FormLabel>
          <Input
            type="text"
            id="username"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </FormControl>

        <FormControl>
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            id="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </FormControl>

        <Button 
          type="submit" 
          color="primary" 
          variant="solid"
          fullWidth
          sx={{ mt: 2 }}
        >
          Submit
        </Button>
      </Card>

      <Snackbar
        autoHideDuration={5000}
        open={openSnackbar}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        color="danger"
        variant="soft"
        endDecorator={
          <Button
            size="sm"
            variant="soft"
            color="danger"
            onClick={() => setOpenSnackbar(false)}
          >
            Dismiss
          </Button>
        }
      >
        {error}
      </Snackbar>
    </div>
  );
};

export default LoginPage;