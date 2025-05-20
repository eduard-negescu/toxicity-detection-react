// PromptsListComponent.tsx
import React, { useState, useEffect } from 'react';
import api from '../api'; // Correct import path to your api.ts
import {
  Box,
  Button,
  Card,
  List,
  ListItem,
  Typography,
  Alert,
  CircularProgress,
  Divider
} from '@mui/joy';

interface Prompt {
  id: string;
  input: string;
  createdAt?: string;
  // Add other fields as needed
}

const PromptsListComponent = () => {
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPrompts = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await api.get<Prompt[]>('/prompts');
      setPrompts(response.data);
    } catch (err) {
      if (error) {
        setError(error|| 'Failed to fetch prompts');
      } else {
        setError('An unexpected error occurred');
      }
    } finally {
      
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPrompts();
  }, []);

  return (
    <Box sx={{ maxWidth: '100%', mx: 'auto', p: 2 }}>
      <Card variant="outlined">
        <Typography level="h4" component="h1" sx={{ mb: 2 }}>
          All Prompts
        </Typography>

        {error && (
          <Alert color="danger" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
            <CircularProgress />
          </Box>
        ) : (
          <List variant="outlined">
            {prompts.length > 0 ? (
              prompts.map((prompt, index) => (
                <React.Fragment key={prompt.id}>
                  <ListItem>
                    <Box sx={{ width: '100%' }}>
                      <Typography fontWeight="lg">
                        {prompt.input}
                      </Typography>
                      {prompt.createdAt && (
                        <Typography level="body2" color="neutral">
                          Created: {new Date(prompt.createdAt).toLocaleString()}
                        </Typography>
                      )}
                    </Box>
                  </ListItem>
                  {index < prompts.length - 1 && <Divider />}
                </React.Fragment>
              ))
            ) : (
              <ListItem>
                <Typography color="neutral">No prompts found</Typography>
              </ListItem>
            )}
          </List>
        )}

        <Button
          variant="soft"
          onClick={fetchPrompts}
          loading={loading}
          sx={{ mt: 2 }}
        >
          Refresh List
        </Button>
      </Card>
    </Box>
  );
};

export default PromptsListComponent;