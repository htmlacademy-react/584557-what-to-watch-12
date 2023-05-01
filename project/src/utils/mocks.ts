import { TUserData } from './../types/user';
import { TComment, TComments } from './../types/comment';
import faker from 'faker';
import { fetchActiveFilmAction } from '../store/api-actions';
import { TFilm, TFilms } from './../types/film';

export const makeFakeFilmStub = (): TFilm => ({
  'name': faker.company.companyName(),
  'posterImage': faker.image.abstract(),
  'previewImage': faker.image.abstract(),
  'backgroundImage': faker.image.abstract(),
  'backgroundColor': 'rgb(16, 104, 53)',
  'description': faker.lorem.paragraph(),
  'rating': faker.datatype.float(0.1),
  'scoresCount': faker.datatype.number(),
  'director': `${faker.name.firstName() } ${ faker.name.lastName()}`,
  'starring': faker.random.arrayElements([
    `${faker.name.firstName() } ${ faker.name.lastName()}`,
    `${faker.name.firstName() } ${ faker.name.lastName()}`,
    `${faker.name.firstName() } ${ faker.name.lastName()}`,
    `${faker.name.firstName() } ${ faker.name.lastName()}`,
    `${faker.name.firstName() } ${ faker.name.lastName()}`
  ],3),
  'runTime': faker.datatype.number(),
  'genre': faker.datatype.string(),
  'released': faker.datatype.number(),
  'id': faker.datatype.number(),
  'isFavorite': faker.datatype.boolean(),
  'videoLink': faker.internet.url(),
  'previewVideoLink': faker.internet.url()
});
export const makeFakeFilmsStub = (): TFilms => new Array(4).fill(null).map(makeFakeFilmStub);

export const makeFakeFilms = () => ({
  type: fetchActiveFilmAction.fulfilled.type,
  payload: makeFakeFilmsStub()
});

export const makeFakeCommentStub = (): TComment => ({
  'id': faker.datatype.number(),
  'user': {
    'id': faker.datatype.number(),
    'name': faker.name.firstName()
  },
  'rating': faker.datatype.float(0.1),
  'comment': faker.lorem.paragraph(),
  'date': faker.date.past().toString()
});

export const makeFakeCommentsStub = (): TComments => new Array(3).fill(null).map(makeFakeCommentStub);

export const makeUserDataStub = (): TUserData => ({
  avatarUrl: faker.internet.url(),
  email: faker.internet.email(),
  id: faker.datatype.number(),
  name: `${faker.name.firstName() } ${ faker.name.lastName()}`,
  token: faker.datatype.string(),
});
