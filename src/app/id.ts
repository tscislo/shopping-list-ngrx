let start = Math.floor(Math.random() * (5000));
//fake id starting at random number
export const id = () => {
    return ++start;
};