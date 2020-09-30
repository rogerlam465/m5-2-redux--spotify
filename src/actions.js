// access token stuff

export const requestAccessToken = () => ({
  type: "REQUEST_ACCESS_TOKEN",
});

export const receiveAccessToken = (token) => ({
  type: "RECEIVE_ACCESS_TOKEN",
  token,
});

export const receiveAccessTokenError = () => ({
  type: "RECEIVE_ACCESS_TOKEN_ERROR",
})

// artist profile stuff

export const requestArtistProfile = (artistId) => ({
  type: "REQUEST_ARTIST_PROFILE",
  artistId,
});

export const receiveArtistProfile = (artistProfile) => ({
  type: "RECEIVE_ARTIST_PROFILE",
  artistProfile,
});

export const receiveArtistError = () => ({
  type: "RECEIVE_ACCESS_TOKEN_ERROR",
})