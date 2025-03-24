import { createAction, props } from '@ngrx/store';
import { User } from '../interfaces/user.interface';

export const userAction = createAction(
  '[Auth] Post User',
  props<{ user: User }>()
);
