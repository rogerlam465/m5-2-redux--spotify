const initialState = {
  currentArtist: null,
  status: 'idle'
}

export default function artistReducer(state = initialState, action) {
  switch (action.type) {
    case 'REQUEST_ARTIST_PROFILE': {
      return {
        ...state,
        artistId: action.artistId,
        status: 'loading'
      }
    }
    case 'RECEIVE_ARTIST_PROFILE': {
      return {
        ...state,
        currentArtist: action.artistProfile,
        status: 'idle',
      }
    }
    case 'RECEIVE_ARTIST_PROFILE_ERROR': {
      return {
        ...state,
        status: 'error',
      }
    }
    default: {
      return state;
    }
  }
}