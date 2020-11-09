// Second parameter determines if random numbers only or
// numbers and letters are generated
const rdmNbrGenerator = (characterNbr, numeronym = false) => {
  return numeronym
    ? Math.random().toString(36).substr(2, characterNbr)
    : Math.random().toString().substr(2, characterNbr);
};

export default rdmNbrGenerator;
