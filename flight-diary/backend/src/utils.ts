import { Weather, Visibility, DiaryEntry } from './types';

export const isWeather = (w: any): w is Weather =>
  ['sunny', 'windy', 'cloudy', 'rainy', 'stormy'].includes(w);

export const isVisibility = (v: any): v is Visibility =>
  ['great', 'good', 'ok', 'poor'].includes(v);

export const isString = (s: any): s is string => typeof s === 'string' || s instanceof String;

export const parseDiary = (obj: any): Omit<DiaryEntry, 'id'> => {
  if (!obj || !isString(obj.date) || !isWeather(obj.weather) || !isVisibility(obj.visibility) || !isString(obj.comment)) {
    throw new Error('invalid diary entry');
  }

  return {
    date: obj.date,
    weather: obj.weather,
    visibility: obj.visibility,
    comment: obj.comment
  };
};
