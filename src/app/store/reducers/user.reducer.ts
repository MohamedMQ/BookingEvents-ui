import { createReducer, on } from '@ngrx/store';
import { userAction } from '../actions/user.action';
import { User } from '../interfaces/user.interface';

export const initialState: User = {
  id: 0,
  name: '',
  email: '',
};

export const userReducer = createReducer(
  initialState,
  on(userAction, (state, { user }) => {
    console.log('------------------', user);
    return {
      ...state,
      id: user.id,
      name: user.name,
      email: user.email,
    };
  })
);
