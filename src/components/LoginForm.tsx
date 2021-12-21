import { Button, Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, Grid, TextField } from '@material-ui/core';
import React from 'react';
import { useFormik } from 'formik';

const LoginForm = () => {
    const formik = useFormik({
        initialValues: {
          email: '',
          password: '',
          rememberMe: false,
        },

        onSubmit: (values) => {
          alert(JSON.stringify(values));
        },
      });

    return (
        <Grid container justify='center'>
            <Grid xs={4}>
                <form onSubmit={formik.handleSubmit}>
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
                                // деструктурируем объект который возвращает данный метод
                                // из него мы снабжаем наш элемент нужными свойствами
                                {...formik.getFieldProps('email')}
                                />

                            <TextField 
                                label='Password'
                                margin='normal'
                                type='password'
                                {...formik.getFieldProps('password')}
                                />

                            <FormControlLabel 
                                label='Remember Me'
                                control={<Checkbox name='rememberMe'/>}
                                {...formik.getFieldProps('rememberMe')}
                                />

                            <Button 
                                type='submit' 
                                variant='contained' 
                                color='primary'
                                >
                                Login</Button>
                        </FormGroup>
                    </FormControl>
                </form>
            </Grid>
        </Grid>
    );
};

export default LoginForm;