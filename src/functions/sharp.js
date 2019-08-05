const fs = require("fs");
const path = require("path");
const glob = require("globby");
const sharp = require("sharp");

(async () => {
  (await glob("static/instagram/images/*.png")).map(image =>
    sharp(image)
      .resize(500)
      .webp({ quality: 90 })
      .toFile(
        path.join(
          path.dirname(image),
          path.format({
            root: "/",
            name: path.basename(image, ".png"),
            ext: ".webp"
          })
        )
      )
  );
})();
