const addCloth = (req, res) => {
  res.send("Add Cloth");
};

const getCloth = (req, res) => {
  res.send("get Cloth");
};

const deleteCloth = (req, res) => {
  res.send("delete Cloth");
};

module.exports = {
  addCloth,
  getCloth,
  deleteCloth,
};
