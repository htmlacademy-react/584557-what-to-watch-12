import { screen, render } from '@testing-library/react';
import { getRaitingText } from '../../utils/common';
import { makeFakeFilmStub } from '../../utils/mocks';
import { Overview } from './overview';
describe('Component: Overview', () => {
  it('should render correctly', () => {
    const fakeFilm = makeFakeFilmStub();

    render(
      <Overview film={fakeFilm} />
    );

    expect(screen.getByTestId('overview')).toBeInTheDocument();
    expect(screen.getByText(String(fakeFilm.rating).replace('.', ','))).toBeInTheDocument();
    expect(screen.getByText(String(getRaitingText(fakeFilm.rating)))).toBeInTheDocument();
    expect(screen.getByText(`${fakeFilm.scoresCount} ratings`)).toBeInTheDocument();
    expect(screen.getByText(fakeFilm.description)).toBeInTheDocument();
    expect(screen.getByText(`Director: ${fakeFilm.director}`)).toBeInTheDocument();
    expect(screen.getByText(`Starring: ${fakeFilm.starring.join(', ')} and other`)).toBeInTheDocument();
  });
});
