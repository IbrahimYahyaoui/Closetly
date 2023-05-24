const User = require("../Models/userModel");
const uuid = require("uuid");

const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// handel upload to cloudinary
async function handleUpload(file) {
  const folder = `clothes/`;
  const res = await cloudinary.uploader.upload(file, {
    folder,
    resource_type: "auto",
    transformation: [{ height: "0.3", width: "0.3", crop: "pad" }],
  });
  return res;
}

const addCloth = async (req, res) => {
  const { name, category, id } = req.body;
  try {
    // check if file is already in the database

    if (!req.file) {
      return res.status(400).json({ error: "Please upload a file" });
    }
    const b64 = Buffer.from(req.file.buffer).toString("base64");

    let dataURI = "data:" + req.file.mimetype + ";base64," + b64;

    const cldRes = await handleUpload(dataURI);
    const imageUrl = cldRes.secure_url;

    // Check if cloth already exists in user's inventory
    const existingCloth = await User.findOne({
      _id: id,
      "inventory.name": name,
      "inventory.category": category,
      "inventory.ClothBaseName": req.file.originalname,
    });

    if (existingCloth) {
      return res.status(400).json({ error: "Cloth already exists" });
    }

    // Add cloth to user's inventory
    const clothId = uuid.v4();
    // we save the Cloth name to avoid duplicates
    const ClothBaseName = req.file.originalname;
    const user = await User.updateOne(
      { _id: id },
      {
        $push: {
          inventory: {
            clothId,
            image: imageUrl,
            name,
            category,
            ClothBaseName,
          },
        },
      }
    );

    res
      .status(200)
      .json({ clothId, image: imageUrl, name, category, ClothBaseName });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "Something went wrong" });
  }
};

const getCloths = (req, res) => {
  const { id } = req.body;
  try {
    if (!id) {
      return res.status(400).json({ error: "Please provide a user id" });
    }
    User.findById(id).then((user) => {
      const inventory = user.inventory;

      res.status(200).json(inventory);
    });
  } catch (error) {
    console.log(error);
  }
};

const deleteCloth = (req, res) => {
  const { id, clothId } = req.body;
  // console.log(req.body);
  try {
    User.updateOne(
      { _id: id },
      {
        $pull: {
          inventory: { clothId: clothId },
        },
      }
    ).then((result) => {
      res.status(200).json(clothId);
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "Something went wrong" });
  }
};

module.exports = {
  addCloth,
  getCloths,
  deleteCloth,
};
