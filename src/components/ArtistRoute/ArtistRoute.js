import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchArtistProfile, roundNumbers } from '../../helpers/api-helpers';
import { requestArtistProfile, receiveArtistProfile, receiveArtistError } from '../../actions';
import styled from 'styled-components';

const ArtistRoute = () => {
  const dispatch = useDispatch();

  let { artistId } = useParams();

  const accessToken = useSelector((state) => state.auth.token);

  useEffect(() => {
    if (!accessToken) {
      return;
    }

    dispatch(requestArtistProfile(artistId));

    // if I follow the pattern for App.js, I should do the fetch here.
    // but why? wouldn't it be more semantic to put the fetch in the reducer?

    fetchArtistProfile(accessToken, artistId)
      .then(artistInfo => {
        dispatch(receiveArtistProfile(artistInfo));
      })
      .catch((err) => {
        dispatch(receiveArtistError());
      });

  }, [accessToken])

  const currentArtist = useSelector((state) => {
    return state.artists.currentArtist
  });

  console.log("line 39", currentArtist);

  // info we need:
  // artist name
  // num. of followers (rounded to k, m)
  // genre tag

  return (
    <>
      {!currentArtist &&
        <div>Loading...</div>
      }
      {currentArtist &&
        <Wrapper>
          <img src={currentArtist.images[0].url} />
          <h1>{currentArtist.name}</h1>
          <h2>Followers</h2>
          <p>{roundNumbers(currentArtist.followers.total)}</p>
          <h2>Tags</h2>
          <p>{currentArtist.genres[0]}, {currentArtist.genres[1]}</p>
        </Wrapper>
      }
    </>
  )
}

export default ArtistRoute;

const Wrapper = styled.div`

`