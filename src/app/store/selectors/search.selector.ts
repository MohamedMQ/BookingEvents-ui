import { createFeatureSelector } from '@ngrx/store';
import { Search } from '../interfaces/search.interface';

export const selectSearchFeature = createFeatureSelector<Search>('search');
