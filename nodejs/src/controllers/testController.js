import testService from "../services/testService";

let createTestController = async (req, res) => {
  if (req.files === null) {
    return res.status(400).json({ msg: "No file uploaded" });
  }

  const file = req.files.file;

  file.mv(`D:/HocReact/tuhoc/src/img/imageUpload/${file.name}`, (err) => {
    ////
    if (err) {
      console.error(err);
      return res.status(500).send(err);
    }

    return res.json({
      fileName: file.name,
      filePath: `D:/HocReact/tuhoc/src/img/imageUpload/${file.name}`,
    });
  });
};

module.exports = {
  createTestController: createTestController,
};
