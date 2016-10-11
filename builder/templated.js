const Handlebars = require('handlebars');
const BaseBuilder = require('./base');
const fs = require('fs');
const path = require('path');

Handlebars.registerHelper('capitalize', text => text.charAt(0).toUpperCase() + text.slice(1));
Handlebars.registerHelper('eq', (a, b) => a === b);
Handlebars.registerHelper('and', (a, b) => a && b);
Handlebars.registerHelper('sub', (a, b) => a - b);
Handlebars.registerHelper('join', (a, b) => a.join(b));
Handlebars.registerHelper('div', (a, b) => a / b);
Handlebars.registerHelper('hex2rgb', (hex) => {
    var bigint = parseInt(hex.substring(1), 16);
    return {r: (bigint >> 16) & 255, g: (bigint >> 8) & 255, b: bigint & 255};
});

class TemplatedBuilder extends BaseBuilder {
    constructor(colors, version, templatesDir = path.join(__dirname, '..', 'templates')) {
        super(...arguments);

        this.templatesDir = templatesDir;
        this.colorsArray = Object.keys(colors)
            .filter(name => typeof colors[name] !== 'string')
            .map(name => ({name, hex: colors[name]}));
        this.generalColors = Object.keys(colors)
            .filter(name => typeof colors[name] === 'string')
            .map(name => ({name, hex: colors[name]}));

        this.spectrum = this.colorsArray[0].hex.length - 1;
    }


    build(file, outputPaths){
        const template = fs.readFileSync(path.join(this.templatesDir, `${file}.hbs`), {encoding: 'utf8'});
        const compile = Handlebars.compile(template);

        const compiled = compile({
            version: this.version,
            colors: this.colorsArray,
            general: this.generalColors,
            spectrum: this.spectrum
        });

        outputPaths.forEach(outputPath =>
            fs.writeFileSync(path.join(outputPath), compiled));
    }
}

module.exports = TemplatedBuilder;