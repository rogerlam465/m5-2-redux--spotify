const initialState = {
    currentArtist: null,
    status: 'idle'
}

export default function artistReducer(state = initialState, action) {
    switch (action.type) {
        default: {
            return state;
        }
    }
}