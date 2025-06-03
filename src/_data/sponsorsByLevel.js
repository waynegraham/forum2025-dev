const fs = require("fs");
const path = require("path");

const levels = ["Platinum", "Gold", "Silver", "Bronze"];

module.exports = function () {
  const sponsors = require("./sponsors.json");

  return levels.map((level) => ({
    level,
    sponsors: sponsors
      .filter((s) => s.level === level)
      .map((sponsor) => {
        const isSvg = sponsor.logo.endsWith(".svg");

        if (isSvg) {
          const logoPath = path.join("src", sponsor.logo); // adjust if path is elsewhere
          try {
            const svgContent = fs.readFileSync(logoPath, "utf8");
            return { ...sponsor, svg: svgContent, isSvg: true };
          } catch (err) {
            console.warn(`Error reading SVG for ${sponsor.name}:`, err.message);
            return { ...sponsor, isSvg: false };
          }
        }

        return { ...sponsor, isSvg: false };
      }),
  }));
};
