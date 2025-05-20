import { Box, Button, Stack, Typography } from "@mui/joy";
import { logout } from "../utils/auth";

const username = localStorage.getItem("username");

const Navbar = () => {
  return (
    <Box
      component="header"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        px: 3,
        py: 2,
        borderBottom: "1px solid",
        borderColor: "divider",
        bgcolor: "background.surface",
      }}
    >
      <Stack direction="row" alignItems="center" spacing={1.5}>
          <img
            src="/cloud-computing.png"
            alt="Logo"
            width="30"
            height="24"
            style={{ display: "inline-block" }}
          />
          <Typography level="title-lg" component="a" href="#" sx={{ 
            textDecoration: "none",
            '&:hover': { color: 'primary.200' }
          }}>
            Toxicity Detection
          </Typography>
        </Stack>
        {!username ? (
          <></>
        ) : (
          <Button
            color="danger"
            onClick={logout}
            variant="plain"
          >
            Logout
          </Button>
        )}
    </Box>
  );
};

export default Navbar;
