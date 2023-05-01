import { getRaitingText } from './common';
import {
  fromSecToFilmDuration,
  getRuntimeString,
  toYYYYMMDD,
  toMMMMDDYYYY
} from './date-time-formatters';

describe('utils', () => {
  it('finction: getRaitingText', () => {
    expect(getRaitingText(3)).toEqual('Bad');
    expect(getRaitingText(4)).toEqual('Normal');
    expect(getRaitingText(6)).toEqual('Good');
    expect(getRaitingText(9)).toEqual('Very good');
    expect(getRaitingText(11)).toEqual('Awesome');
  });

  it('finction: fromSecToFilmDuration', () => {
    expect(fromSecToFilmDuration(150)).toEqual('02:30');
    expect(fromSecToFilmDuration(50)).toEqual('00:50');
    expect(fromSecToFilmDuration(10)).toEqual('00:10');
    expect(fromSecToFilmDuration(-10)).toEqual('00:10');
    expect(fromSecToFilmDuration(-50)).toEqual('00:50');
    expect(fromSecToFilmDuration(-150)).toEqual('02:30');
  });

  it('finction: getRuntimeString', () => {
    expect(getRuntimeString(90)).toEqual('1h 30m');
    expect(getRuntimeString(50)).toEqual('50m');
    expect(getRuntimeString(1)).toEqual('1m');
    expect(getRuntimeString(-10)).toEqual('10m');
    expect(getRuntimeString(-90)).toEqual('1h 30m');
  });

  it('finction: toYYYYMMDD', () => {
    expect(toYYYYMMDD('10-02-1989')).toEqual('1989-10-01');
    expect(toYYYYMMDD('10/02/1989')).toEqual('1989-10-01');
    expect(toYYYYMMDD('1989/02/10')).toEqual('1989-02-09');
  });

  it('finction: toMMMMDDYYYY', () => {
    expect(toMMMMDDYYYY('10.02.1989')).toEqual('October 2, 1989');
    expect(toMMMMDDYYYY('12.12.1988')).toEqual('December 12, 1988');
    expect(toMMMMDDYYYY('1.31.1987')).toEqual('January 31, 1987');
    expect(toMMMMDDYYYY('2.31.1987')).toEqual('March 3, 1987');
  });
});
