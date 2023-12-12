export const logger = (store) => (next) => (action) => {
    next(action);
};
export const error = (store) => (next) => (action) => {
    try {
        next(action);
    } catch(e) {
        console.error('ERROR in action firing: ', e);
    }
};