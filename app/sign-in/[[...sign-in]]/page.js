import { Typography, Button, Toolbar, Container, AppBar, Box } from "@mui/material";
import Link from "next/link";
import { SignIn } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <Box>
      <AppBar position="static" sx={{ backgroundColor: "#3f51b5", width: '100%', height: 64 }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }} gutterBottom>
            Flashcard SaaS
          </Typography>
          <Link href="/sign-in" passHref>
            <Button color="inherit" sx={{ mr: 2, color:'#FFFFFF'}}>
              Login
            </Button>
          </Link>
          <Link href="/sign-up" passHref>
            <Button color="inherit" sx={{ ml: 2, color:'#FFFFFF' }}>
              Sign Up
            </Button>
          </Link>
        </Toolbar>
      </AppBar>
      
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minHeight="100vh"
        sx={{ mt: 0 }} // Margin top for spacing
      >
        <Typography variant="h3" gutterBottom sx={{color: "#3f51b5"}} >
          Sign In
        </Typography>
        <SignIn />
      </Box>
    </Box>
  );
}
