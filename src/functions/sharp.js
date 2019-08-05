const fs = require("fs");
const path = require("path");
const glob = require("globby");
const sharp = require("sharp");

(async () => {
  (await glob("static/instagram/images/*.webp")).map(image =>
    sharp(image)
      .resize(500)
      .jpeg({
        lossless: false,
        quality: 90,
        force: true,
        reductionEffort: 6
      })
      .toFile(
        path.join(
          "static/instagram/images/", //path.dirname(image),
          path.format({
            root: "/",
            name: path.basename(image, ".webp"),
            ext: ".jpg"
          })
        )
      )
  );
})();
