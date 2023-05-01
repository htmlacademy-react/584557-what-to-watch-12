import { Details } from './details';
import { render, screen } from '@testing-library/react';
import { makeFakeFilmStub } from '../../utils/mocks';
import { getRuntimeString } from '../../utils/date-time-formatters';

describe('Component: Details', () => {
  it('should render correctly', () => {
    const fakeFilm = makeFakeFilmStub();
    fakeFilm.director = 'fakeDirector';
    fakeFilm.starring = ['fakeStarring'];
    fakeFilm.genre = 'fakeGenre';
    fakeFilm.released = 2023;
    fakeFilm.runTime = 120;

    render(<Details film={fakeFilm} />);

    const directorTitleElement = screen.getByText('Director');
    const starringTitleElement = screen.getByText('Starring');
    const runTimeTitleElement = screen.getByText('Run Time');
    const genreTitleElement = screen.getByText('Genre');
    const releasedTitleElement = screen.getByText('Released');

    expect(directorTitleElement).toBeInTheDocument();
    expect(starringTitleElement).toBeInTheDocument();
    expect(runTimeTitleElement).toBeInTheDocument();
    expect(genreTitleElement).toBeInTheDocument();
    expect(releasedTitleElement).toBeInTheDocument();

    const fakeDirectorContentElement = screen.getByText('fakeDirector');
    const fakeStarringContentElement = screen.getByText(/fakeStarring/);
    const fakeRunTimeContentElement = screen.getByText('Run Time');
    const fakeGenreContentElement = screen.getByText(getRuntimeString(fakeFilm.runTime));
    const fakeReleasedContentElement = screen.getByText('2023');

    expect(fakeDirectorContentElement).toBeInTheDocument();
    expect(fakeStarringContentElement).toBeInTheDocument();
    expect(fakeRunTimeContentElement).toBeInTheDocument();
    expect(fakeGenreContentElement).toBeInTheDocument();
    expect(fakeReleasedContentElement).toBeInTheDocument();
  });
});
