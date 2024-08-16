'use client';

import { Typography, Container, AppBar, Toolbar, Button, Box, Grid } from "@mui/material";
import Head from 'next/head';
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import { loadStripe } from '@stripe/stripe-js'; // Make sure this is imported

// Make sure to replace with your actual Stripe public key
const stripePromise = loadStripe('your-publishable-key-here'); 

export default function Home() {

  const handleSubmit = async () => {
    try {
      const checkoutSession = await fetch('/api/checkout_session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Origin': 'http://localhost:3000', // Corrected 'Origin' header
        },
      });

      if (!checkoutSession.ok) {
        throw new Error('Network response was not ok');
      }

      const checkoutSessionJson = await checkoutSession.json();

      const stripe = await stripePromise; // Use the loaded Stripe instance

      const { error } = await stripe.redirectToCheckout({
        sessionId: checkoutSessionJson.id,
      });

      if (error) {
        console.warn(error.message);
      }

    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <>
      <Head>
        <title>Flashcard SaaS</title>
        <meta name="description" content='Create flashcards from your text' />
      </Head>

      <AppBar position="static" sx={{ width: '100%' }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>Flashcard SaaS</Typography>
          <SignedOut>
            <Button color="inherit" href="/sign-in">Login</Button>
            <Button color="inherit" href="/sign-up">Sign Up</Button>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </Toolbar>
      </AppBar>
      
      <Container maxWidth={false} 
      sx={{ 
        mt: 2, 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center', 
        minHeight: 'calc(100vh - 64px)' // Subtracting the height of the AppBar (which is usually 64px)
      }}>
        <Box sx={{
          textAlign: 'center',
          my: 4,
        }}>
          <Typography variant="h2" gutterBottom>Welcome to Flashcard SaaS</Typography>
          <Typography variant="h5" gutterBottom>
            The easiest way to make flashcards from your text!
          </Typography>
          <Button variant="contained" color="primary" sx={{ mt: 2 }}>Get Started</Button>
        </Box>
        
        <Box sx={{ my: 6, width: '100%', display: 'flex', justifyContent: 'center' }}>
          <Box sx={{ maxWidth: 1200, width: '100%' }}>
            <Typography variant="h4" gutterBottom textAlign="center">Features</Typography>
            <Grid container spacing={4} justifyContent="center">
              <Grid item xs={12} md={4}>
                <Typography variant="h6" gutterBottom textAlign="center">Easy Text Input</Typography>
                <Typography textAlign="center">
                  Simply input your text and let our software do the rest. 
                  Creating flashcards has never been easier.
                </Typography>
              </Grid>
              <Grid item xs={12} md={4}>
                <Typography variant="h6" gutterBottom textAlign="center">Smart Flashcards</Typography>
                <Typography textAlign="center">
                  Our AI intelligently breaks down your text into concise flashcards, perfect for studying.
                </Typography>
              </Grid>
              <Grid item xs={12} md={4}>
                <Typography variant="h6" gutterBottom textAlign="center">Accessible Anywhere</Typography>
                <Typography textAlign="center">
                  Access your flashcards from any device, at any time. Study on the go with ease.
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Box>

        <Box sx={{my:6, textAlign:'center'}}>
          <Typography variant="h4" gutterBottom>Pricing</Typography>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Box sx={{
                p: 3,
                border: "1px solid",
                borderColor: 'grey.300',
                borderRadius: 2,
                height: '100%',  // Ensures the box takes up the full height available
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between' // Ensures content is evenly distributed
              }}>
                <Typography variant='h5' gutterBottom>Basic</Typography>
                <Typography variant='h6' gutterBottom>$5 / month</Typography>
                <Typography>
                  Access to basic flashcard features and limited storage.
                </Typography>
                <Button variant="contained" color='primary' sx={{mt:2}}>Choose Basic</Button>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{
                p: 3,
                border: "1px solid",
                borderColor: 'grey.300',
                borderRadius: 2,
                height: '100%',  // Ensures the box takes up the full height available
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between' // Ensures content is evenly distributed
              }}>
                <Typography variant='h5' gutterBottom>Pro</Typography>
                <Typography variant='h6' gutterBottom>$10 / month</Typography>
                <Typography>
                  Unlimited flashcards and storage, with priority support.
                </Typography>
                <Button variant="contained" color='primary' sx={{mt:2}} onClick={handleSubmit}>Choose Pro</Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
}
