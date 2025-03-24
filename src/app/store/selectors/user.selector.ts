import { createFeatureSelector, createSelector } from '@ngrx/store';
import { User } from '../interfaces/user.interface';

export const selectUserFeature = createFeatureSelector<User>('user');

export const selectUserId = createSelector(selectUserFeature, (state) => state.id)
export const selectUserName = createSelector(selectUserFeature, (state) => state.name)
export const selectUserEmail = createSelector(selectUserFeature, (state) => state.email)
