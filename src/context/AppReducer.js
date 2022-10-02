export default (state, {type, payload, key=""}) => {
    switch(type) {
        case 'SET_ARRAY':
            return {
                ...state,
                [key]: payload
            }
        case 'ADD_ARRAY': 
            return {
                ...state, 
                [key]: [...state[key], payload]
            }
        case 'REMOVE_ARRAY':
            return {
                ...state,
                [key]: state[key].filter(elt => elt.id != payload)
            }
        default:
            return state
    }
}