import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { useDispatch } from 'react-redux';

import ArtistRoute from '../ArtistRoute'

import GlobalStyles from './GlobalStyles';
import { requestAccessToken, receiveAccessToken, receiveAccessTokenError } from '../../actions';

const DEFAULT_ARTIST_ID = '0MoXIHcFwhIWnFgBfdvQ30';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(requestAccessToken());

    fetch("/spotify_access_token")
      .then((res) => res.json())
      .then((json) => {
        dispatch(receiveAccessToken(json.access_token));
      })
      .catch((err) => {
        console.log(err);
        dispatch(receiveAccessTokenError());
      });
  }, []);

  return (
    <>
      <GlobalStyles />
      <Router>
        <Switch>
          <Route path="/artists/:artistId">
            <ArtistRoute />
          </Route>
          <Redirect to={`/artists/${DEFAULT_ARTIST_ID}`} />
        </Switch>
      </Router>
    </>
  )
};

export default App;
