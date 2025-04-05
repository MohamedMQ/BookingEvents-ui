import { createReducer, on } from '@ngrx/store';
import { Search } from '../interfaces/search.interface';
import { searchAction } from '../actions/search.action';

export const initialState: Search = {
  searchTerm: '',
};

export const searchReducer = createReducer(
  initialState,
  on(searchAction, (state, { search }) => {
    return {
      searchTerm: search.searchTerm
    };
  })
);
