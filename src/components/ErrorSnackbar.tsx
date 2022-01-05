import * as React from 'react';
// import Stack from '@mui/material/Stack';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import { useDispatch, useSelector } from 'react-redux';
import { AppRootStateType } from '../bll/state/store';
import { setErrorAC } from '../bll/app-reducer/app-reducer';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function ErrorSnackbar() {
  const errorMessage = useSelector<AppRootStateType, string | null>(state => state.app.errorMessage);
  const dispatch = useDispatch();

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    dispatch(setErrorAC({value: null}));
  };

  return (
    <div>
      <Snackbar open={!!errorMessage} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" >
          {errorMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}