import { Button, Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, Grid, TextField } from '@material-ui/core';
import React from 'react';

const LoginForm = () => {
    return (
        <Grid container justify='center'>
            <Grid xs={4}>
                <FormControl>
                    <FormLabel>
                        For using this app pleace login
                        or use free account
                        <br />
                        <br />
                        
                        Email: free@samuraijs.com

                        <br />

                        Password: free
                    </FormLabel>

                    <FormGroup>
                        <TextField 
                            label='Email'
                            margin='normal'
                            />

                        <TextField 
                            label='Password'
                            margin='normal'
                            />

                        <FormControlLabel 
                            label='Remember Me'
                            control={<Checkbox name='rememberMe'/>}
                            />

                        <Button 
                            type='submit' 
                            variant='contained' 
                            color='primary'
                            >
                            Login</Button>
                    </FormGroup>
                </FormControl>
            </Grid>
        </Grid>
    );
};

export default LoginForm;