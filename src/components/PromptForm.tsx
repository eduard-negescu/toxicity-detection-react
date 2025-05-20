import React, { useState, FormEvent } from 'react';
import api from '../api';
import {
  Box,
  Button,
  Card,
  FormControl,
  FormLabel,
  Input,
  Typography,
  Alert,
  CircularProgress
} from '@mui/joy';

interface ApiResponse {
  // Define the structure of your API response here
  // For example, if it returns a string:
  [key: string]: any;
}

interface ValidationError {
  detail: Array<{
    loc: (string | number)[];
    msg: string;
    type: string;
  }>;
}

const PromptForm = () => {
  const [input, setInput] = useState<string>('');
  const [response, setResponse] = useState<ApiResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResponse(null);

    try {
      const res = await api.post<ApiResponse>('/prompts/', {
        input: input
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });

      setResponse(res.data);
    } catch (err) {
      
    } 
  };

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', p: 2 }}>
      <Card variant="outlined">
        <Typography level="h4" component="h1" sx={{ mb: 2 }}>
          Post Prompt
        </Typography>
        
        <form onSubmit={handleSubmit}>
          <FormControl sx={{ mb: 2 }}>
            <FormLabel>Input *</FormLabel>
            <Input
              required
              placeholder="Enter your prompt"
              value={input}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInput(e.target.value)}
              disabled={loading}
            />
          </FormControl>
          
          <Button
            type="submit"
            variant="solid"
            color="primary"
            disabled={loading}
            endDecorator={loading && <CircularProgress size="sm" />}
          >
            {loading ? 'Posting...' : 'Post Prompt'}
          </Button>
        </form>

        {error && (
          <Alert color="danger" sx={{ mt: 2 }}>
            {error}
          </Alert>
        )}

        {response && (
          <Box sx={{ mt: 2 }}>
            <Typography component="h2" sx={{ mb: 1 }}>
              Response:
            </Typography>
            <Card variant="soft">
              <pre>{JSON.stringify(response, null, 2)}</pre>
            </Card>
          </Box>
        )}
      </Card>
    </Box>
  );
};

export default PromptForm;