// Resize local archive artwork before Next emits its static image assets.
const sharp = require("sharp");

module.exports = function thumbnail(input) {
  const done = this.async();
  sharp(input).rotate().resize({ width: 640, height: 800, fit: "inside", withoutEnlargement: true })
    .png({ palette: true, force: false })
    .jpeg({ quality: 80, force: false })
    .webp({ quality: 80, force: false })
    .toBuffer().then(output => done(null, output), done);
};
module.exports.raw = true;
