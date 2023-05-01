import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen, fireEvent, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import React from 'react';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { NameSpace } from '../../const';
import HistoryRouter from '../../hocs/history-route/history-route';
import { fromSecToFilmDuration } from '../../utils/date-time-formatters';
import { makeFakeFilmStub } from '../../utils/mocks';
import Player from './player';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const fakeFilm = makeFakeFilmStub();

let store = mockStore({
  [NameSpace.ActiveFilm]: {
    data: {
      film: fakeFilm
    },
    isLoading: false,
    error: false
  }
});

const history = createMemoryHistory();

describe('Page: Player', () => {
  const playMock = jest.fn(() => Promise.resolve());
  window.HTMLMediaElement.prototype.play = playMock;

  const pauseMock = jest.fn();
  window.HTMLMediaElement.prototype.pause = pauseMock;

  afterEach(() => {
    jest.clearAllMocks();
  });
  afterAll(() => {
    jest.resetAllMocks();
  });

  it('should render correctly', async () => {
    const mockRequestFullscreen = jest.fn();
    window.HTMLElement.prototype.requestFullscreen = mockRequestFullscreen;

    const mockExitFullscreen = jest.fn();
    Document.prototype.exitFullscreen = mockExitFullscreen;

    const { rerender } = render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Player />
        </HistoryRouter>
      </Provider>
    );

    const { videoLink, name, runTime, backgroundImage } = fakeFilm;

    const videoElement: HTMLVideoElement = screen.getByTestId('video');
    expect(videoElement).toBeInTheDocument();
    expect(videoElement.poster).toEqual(backgroundImage);
    expect(videoElement.src).toEqual(`${videoLink }/`);

    expect(screen.getByTestId('player-page')).toBeInTheDocument();
    expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
    expect(screen.queryByText('Video Load Error!')).not.toBeInTheDocument();

    expect(screen.getByRole('progressbar')).toBeInTheDocument();
    expect(screen.getByText(name)).toBeInTheDocument();
    expect(screen.getByText('Exit')).toBeInTheDocument();
    expect(screen.getByText('Toggler')).toBeInTheDocument();

    expect(screen.getByText('Play')).toBeInTheDocument();
    expect(screen.queryByText('Pause')).not.toBeInTheDocument();

    await act(async () => await userEvent.click(screen.getByTestId('play-btn')));
    fireEvent.play(videoElement);
    expect(playMock).toBeCalledTimes(1);
    expect(screen.queryByText('Play')).not.toBeInTheDocument();
    expect(screen.getByText('Pause')).toBeInTheDocument();

    await act(async () => await userEvent.click(screen.getByTestId('play-btn')));
    fireEvent.pause(videoElement);
    expect(pauseMock).toBeCalledTimes(1);
    expect(screen.getByText('Play')).toBeInTheDocument();
    expect(screen.queryByText('Pause')).not.toBeInTheDocument();

    expect(screen.getByText(`-${fromSecToFilmDuration(runTime)}`)).toBeInTheDocument();

    const fullScrennToggleBtnElement = screen.getByTestId('full-screen-btn');
    expect(screen.getByText('Full screen')).toBeInTheDocument();
    expect(screen.queryByText('Turn off fullscreen mode')).not.toBeInTheDocument();

    await act(async () => await userEvent.click(fullScrennToggleBtnElement));
    expect(screen.queryByText('Full screen')).not.toBeInTheDocument();
    expect(screen.getByText('Turn off fullscreen mode')).toBeInTheDocument();
    expect(mockRequestFullscreen).toBeCalled();

    await act(async () => await userEvent.click(fullScrennToggleBtnElement));
    expect(screen.getByText('Full screen')).toBeInTheDocument();
    expect(screen.queryByText('Turn off fullscreen mode')).not.toBeInTheDocument();
    expect(mockExitFullscreen).toBeCalled();

    fireEvent.loadStart(videoElement);
    expect(screen.getByTestId('animated-spinner')).toBeInTheDocument();

    fireEvent.canPlay(videoElement);
    expect(screen.queryByTestId('animated-spinner')).not.toBeInTheDocument();

    fireEvent.waiting(videoElement);
    expect(screen.getByTestId('animated-spinner')).toBeInTheDocument();

    fireEvent.error(videoElement);
    expect(screen.getByText('Video Load Error!')).toBeInTheDocument();

    store = mockStore({
      [NameSpace.ActiveFilm]: {
        data: null,
        isLoading: true,
        error: false
      }
    });

    rerender(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Player />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();
    expect(screen.queryByTestId('player-page')).not.toBeInTheDocument();
    expect(screen.queryByText('Video Load Error!')).not.toBeInTheDocument();

    store = mockStore({
      [NameSpace.ActiveFilm]: {
        data: null,
        isLoading: false,
        error: true
      }
    });

    rerender(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Player />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
    expect(screen.queryByTestId('player-page')).not.toBeInTheDocument();
  });
});
