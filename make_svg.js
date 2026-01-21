const fs = require('fs');
const path = require('path');

const src =
	'C:/Users/Sakshi Singh/.gemini/antigravity/brain/bb307b3e-2625-4ded-938a-10e492722921/aexiz_logo_transparent_1768737859831.png';
const dest = 'c:/Users/Sakshi Singh/Downloads/nyx/static/logos/aexiz.svg';

try {
	const data = fs.readFileSync(src);
	const base64 = data.toString('base64');
	const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100">
  <image href="data:image/png;base64,${base64}" width="100" height="100"/>
</svg>`;
	fs.writeFileSync(dest, svg);
	console.log('Successfully created ' + dest);
} catch (e) {
	console.error(e);
	process.exit(1);
}
