import { AppDispatch } from '../index';
import { signInRequest, signInSuccess, signInFailure, signOut } from '../slices/authSlice';
import { securedStorage } from '../../app/services/securedStorage';

const FAKE_TOKEN = 'fake-token-abcdef';

export const signInAsync = (email: string, password: string) => async (dispatch: AppDispatch) => {
  dispatch(signInRequest());
  await new Promise(res => setTimeout(res, 800));
  if (email === 'test@test.com' && password === '1234') {
    await securedStorage.setItem('token', FAKE_TOKEN);
    await securedStorage.setItem('email', email);
    dispatch(signInSuccess({ email, token: FAKE_TOKEN }));
  } else {
    dispatch(signInFailure('Неверный email или пароль'));
  }
};

export const restoreSessionAsync = () => async (dispatch: AppDispatch) => {
  dispatch(signInRequest());
  try {
    const token = await securedStorage.getItem('token');
    const email = await securedStorage.getItem('email');
    if (token && email) {
      dispatch(signInSuccess({ email, token }));
    } else {
      dispatch(signOut());
    }
  } catch (e) {
    dispatch(signOut());
  }
};

export const signOutAsync = () => async (dispatch: AppDispatch) => {
  await securedStorage.removeItem('token');
  await securedStorage.removeItem('email');
  dispatch(signOut());
};