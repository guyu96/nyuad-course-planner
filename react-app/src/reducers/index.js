const initialState = {
    readds: []
};

export default (state = initialState, action) => {
    switch(action.type) {
        case 'READD':
            return {
                readds: [
                    ...state,
                    {
                        id: action.id
                    }
                    ]
                }

        default:
            return state
    }
}
