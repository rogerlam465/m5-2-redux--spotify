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
          <ArtistTitleWrapper>
            <ArtistImg src={currentArtist.images[0].url} alt={"Image for " + currentArtist.name} />
            <ArtistName>{currentArtist.name}</ArtistName>
          </ArtistTitleWrapper>
          <ArtistInfoWrapper>
            <p><FollowerNumHighlight>{roundNumbers(currentArtist.followers.total)}</FollowerNumHighlight> followers</p>
            <h2>tags</h2>
            <p><TagWrapper>{currentArtist.genres[0]}</TagWrapper><TagWrapper>{currentArtist.genres[1]}</TagWrapper></p>
          </ArtistInfoWrapper>
        </Wrapper>
      }
    </>
  )
}

export default ArtistRoute;

const Wrapper = styled.div`
  width: 600px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #0B0F14;
  color: white;
  padding: 60px;
  font-weight: bold;
  height: 100vh;
`

const ArtistTitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const ArtistName = styled.p`
  margin-top: -60px;
  font-size: 40px;
`
const ArtistImg = styled.img`
  border-radius: 50%;
  width: 175px;
  height: 175px;
  top: 25px;
`

const FollowerNumHighlight = styled.span`
  color: #FF4FD8;
`

const ArtistInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const TagWrapper = styled.span`
  padding: 10px;
  margin: 5px;
  background: rgba(75, 75, 75, 0.4);
  border-radius: 4px;
`