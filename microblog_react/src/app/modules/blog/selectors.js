import { NAME } from './constants';

const getAll = state => state[NAME];

export const getAllEntries = state => getAll(state).entries.entriesList.entries;
export const getEditEntryForm = state => getAll(state).editEntryForm;
export const getEntriesCount = state => getAll(state).entries.entriesList.entries.length;
export const getLastEntry = state => getAll(state).entries.entriesList.entries[getEntriesCount(state)-1];
