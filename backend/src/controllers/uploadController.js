const { hasCloudinaryKeys } = require('../config/cloudinary');

const buildLocalUrl = (req, file) => {
  const folder = req.uploadFolder || 'misc';
  const base = `${req.protocol}://${req.get('host')}`;
  return `${base}/uploads/${folder}/${file.filename}`;
};

// POST /api/admin/upload/:folder  (multipart field name: "file")
exports.uploadFile = async (req, res) => {
  if (!req.file) return res.status(400).json({ success: false, message: 'No file uploaded' });

  const url = hasCloudinaryKeys ? req.file.path : buildLocalUrl(req, req.file);
  res.json({
    success: true,
    url,
    public_id: req.file.filename,
    storage: hasCloudinaryKeys ? 'cloudinary' : 'local'
  });
};

exports.uploadMultiple = async (req, res) => {
  if (!req.files || req.files.length === 0) return res.status(400).json({ success: false, message: 'No files uploaded' });
  const files = req.files.map((f) => ({
    url: hasCloudinaryKeys ? f.path : buildLocalUrl(req, f),
    public_id: f.filename
  }));
  res.json({ success: true, files, storage: hasCloudinaryKeys ? 'cloudinary' : 'local' });
};
