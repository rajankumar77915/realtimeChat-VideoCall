import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useEffect } from 'react';


const theme = createTheme();

const dummy_data={
  "P_id": 1,
  "useName": "rajan123",
  "password": "1234"
};
export default function SignIn() {
  const[validate,SetValidate]=React.useState(0)
  // const[data,Setdata]=React.useState({})
  const getObj = (data) => {
    

    axios.post(`http://127.0.0.1:8000/verify/`,data).then(response => {
        console.log('get successfully:', response.data);
        SetValidate(response.data);
    })
        .catch(error => { console.error('Error    user:', error);
      });
}



const navigate = useNavigate();
useEffect(() => {
  if (validate != 0) {
    localStorage.setItem('user', JSON.stringify(validate));
    // localStorage.clear();
    navigate(`/app1/?id=${validate}`);
  }
  
}, [validate]);

const handleSubmit =  (event) => {
  event.preventDefault();
  const data1 = new FormData(event.currentTarget);
  data1.append('P_id', 1);
  
  // Setdata(data1);

  console.log({
    email: data1.get('useName'),
    password: data1.get('password'),
  });
  
   getObj(data1);
  console.log("inside handle");
  console.log(validate);
  
  
  // if (validate === true) {
  //   navigate('/app1/?p_id=1');
  
  // }
};



  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="useName"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="http://localhost:3000/form" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
