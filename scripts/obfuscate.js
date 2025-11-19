const fs = require('fs');
const path = require('path');

// Try to require javascript-obfuscator
let JavaScriptObfuscator;
try {
    JavaScriptObfuscator = require('javascript-obfuscator');
} catch (e) {
    console.error('Error: javascript-obfuscator not found.');
    console.error('Please run: npm install --save-dev javascript-obfuscator');
    process.exit(1);
}

const distDir = path.join(__dirname, '../dist'); // Path to the 'dist' folder
const outputDir = path.join(__dirname, '../dist-obfuscated'); // Output folder for obfuscated files

// Make sure the output directory exists
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir);
}

function obfuscateFile(filePath) {
    console.log(`Obfuscating: ${filePath}`);
    const sourceCode = fs.readFileSync(filePath, 'utf8');
    
    // High obfuscation preset for maximum security
    const obfuscationResult = JavaScriptObfuscator.obfuscate(sourceCode, {
        compact: true,
        controlFlowFlattening: true,
        controlFlowFlatteningThreshold: 1,
        deadCodeInjection: true,
        deadCodeInjectionThreshold: 1,
        debugProtection: true,
        debugProtectionInterval: 4000,
        disableConsoleOutput: true,
        identifierNamesGenerator: 'hexadecimal',
        log: false,
        numbersToExpressions: true,
        renameGlobals: false,
        selfDefending: true,
        simplify: true,
        splitStrings: true,
        splitStringsChunkLength: 5,
        stringArray: true,
        stringArrayCallsTransform: true,
        stringArrayEncoding: ['rc4'],
        stringArrayIndexShift: true,
        stringArrayRotate: true,
        stringArrayShuffle: true,
        stringArrayWrappersCount: 4
    });

    const obfuscatedCode = obfuscationResult.getObfuscatedCode();
    const outputFilePath = path.join(outputDir, path.basename(filePath));
    fs.writeFileSync(outputFilePath, obfuscatedCode, 'utf8');
    console.log(`Obfuscation completed: ${filePath}`);
}

// Read and obfuscate all JS files in the 'dist' directory
fs.readdirSync(distDir).forEach((file) => {
    const filePath = path.join(distDir, file);
    if (fs.lstatSync(filePath).isDirectory()) return; // Skip directories

    if (file.endsWith('.js')) {
        obfuscateFile(filePath);
    }
});

console.log('Obfuscation process completed for all JavaScript files!');
