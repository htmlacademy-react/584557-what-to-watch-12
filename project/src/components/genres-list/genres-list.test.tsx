import { configureMockStore } from '@jedmao/redux-mock-store';
import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { act } from 'react-dom/test-utils';
import { Provider } from 'react-redux';
import { NameSpace } from '../../const';
import { changeGenre } from '../../store/films/films';
import { makeFakeFilmsStub } from '../../utils/mocks';
import HistoryRouter from '../../hocs/history-route/history-route';
import { GenresList } from './genres-list';

const history = createMemoryHistory();
const mockStore = configureMockStore();
const fakeFilms = makeFakeFilmsStub();

const store = mockStore({
  [NameSpace.Films]: {
    data: fakeFilms,
    activeGenre: fakeFilms[2].genre,
    isLoading: false,
    error: false
  }
});
describe('Component: GenresList', () => {
  it('should render correctly', async () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <GenresList />
        </HistoryRouter>
      </Provider>
    );

    const listElement = screen.getByTestId('genres-list');
    const listItemsElements = screen.getAllByTestId('genres-list-item');
    expect(listElement).toBeInTheDocument();
    expect(listItemsElements.some((listItemElement) => listItemElement.classList.contains('catalog__genres-item--active'))).toEqual(true);
    expect(screen.getByText(fakeFilms[0].genre)).toBeInTheDocument();
    expect(screen.getByText(fakeFilms[1].genre)).toBeInTheDocument();
    expect(screen.getByText(fakeFilms[2].genre)).toBeInTheDocument();
    expect(screen.getByText(fakeFilms[3].genre)).toBeInTheDocument();

    const link = screen.getAllByRole('link')[1];

    await act(async () => await userEvent.click(link));

    const actions = store.getActions().map(({type}) => (type as string));

    expect(actions).toEqual([
      changeGenre.type
    ]);

    expect(listItemsElements.some((listItemElement) => listItemElement.classList.contains('catalog__genres-item--active'))).toEqual(true);
  });
});
