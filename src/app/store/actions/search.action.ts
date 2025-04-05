import { createAction, props } from '@ngrx/store';
import { Search } from '../interfaces/search.interface';

export const searchAction = createAction(
  '[Search] Post Search',
  props<{ search: Search }>()
);
