import { Box, CssBaseline, CssVarsProvider } from "@mui/joy";
import Navbar from "./components/Navbar";
import AppRoutes from "./routes";

function App() {
  return (
    <CssVarsProvider defaultMode="dark" disableTransitionOnChange>
      <CssBaseline />
      <Navbar />
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          zIndex: -1, // Ensure it stays behind content
          backgroundImage: `url('/vanishing-stripes.svg')`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      />
        <Box
          component="main"
          sx={{
            width: "100%",
            maxWidth: "1200px",
            mx: "auto",
            mt: 2,
            pt: 5,
          }}
        >
          <AppRoutes />
        </Box>
    </CssVarsProvider>
  );
}

export default App;
