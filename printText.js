import colors from 'colors'

function instructionText(projectName) {
    console.log('');
    console.log('instructions:');
    console.log('');
    console.log(`cd ${projectName}`);
    console.log('');
    console.log('move or copy .env.sample to .env');
    console.log('');
    console.log('npm' + colors.cyan(' run dev'), '\t\t: run the local development server');
    console.log('npm' + colors.cyan(' test'), '\t\t: run the tests');
    console.log('npm' + colors.cyan(' run test:watch'), '\t: continuously run tests as files update');
    console.log('npm' + colors.cyan(' run build'), '\t\t: build the production server');
    console.log('npm' + colors.cyan(' start'), '\t\t: run the production server');
    console.log('npm' + colors.cyan(' lint'), '\t\t: lint the source');
    console.log('');
}

function instructionTextYarn(projectName) {
    console.log('');
    console.log('instructions:');
    console.log('');
    console.log(`cd ${projectName}`);
    console.log('');
    console.log('move or copy .env.sample to .env');
    console.log('');
    console.log('yarn' + colors.cyan(' dev'), '\t\t: run the local development server');
    console.log('yarn' + colors.cyan(' test'), '\t\t: run the tests');
    console.log('yarn' + colors.cyan(' test:watch'), '\t: continuously run tests as files update');
    console.log('yarn' + colors.cyan(' build'), '\t\t: build the production server');
    console.log('yarn' + colors.cyan(' start'), '\t\t: run the production server');
    console.log('yarn' + colors.cyan(' lint'), '\t\t: lint the source');
    console.log('');
}

const truncateLog = (line, colorFn) => {
    const width = process.stdout.columns;
    if (!colorFn) {
        console.log(line.slice(0,width));
    }
    else {
        console.log(colorFn(line.slice(0,width)));
    }
}

const logo = () => {
    console.log();
    truncateLog("          ____                                                                                             ", colors.yellow);
    truncateLog("        ,'  , `.                      ,---,.                                                               ", colors.yellow);
    truncateLog("     ,-+-,.' _ |                    ,'  .' |            ,-.----.                                           ", colors.yellow);
    truncateLog("  ,-+-. ;   , ||                  ,---.'   |            \\    /  \\   __  ,-.                                ", colors.yellow);
    truncateLog(" ,--.'|'   |  ;|                  |   |   .' ,--,  ,--, |   :    |,' ,'/ /|          .--.--.    .--.--.    ", colors.yellow);
    truncateLog("|   |  ,', |  ':     .--,         :   :  |-, |'. \\/ .`| |   | .\\ :'  | |' | ,---.   /  /    '  /  /    '   ", colors.yellow);
    truncateLog("|   | /  | |  ||   /_ ./|         :   |  ;/| '  \\/  / ; .   : |: ||  |   ,'/     \\ |  :  /`./ |  :  /`./   ", colors.yellow);
    truncateLog("'   | :  | :  |,, ' , ' :         |   :   .'  \\  \\.' /  |   |  \\ :'  :  / /    /  ||  :  ;_   |  :  ;_     ", colors.yellow);
    truncateLog(";   . |  ; |--'/___/ \\: |         |   |  |-,   \\  ;  ;  |   : .  ||  | ' .    ' / | \\  \\    `. \\  \\    `.  ", colors.yellow);
    truncateLog("|   : |  | ,    .  \\  ' |         '   :  ;/|  / \\  \\  \\ :     |`-';  : | '   ;   /|  `----.   \\ `----.   \\ ", colors.yellow);
    truncateLog("|   : '  |/      \\  ;   :         |   |    \\./__;   ;  \\:   : :   |  , ; '   |  / | /  /`--'  //  /`--'  / ", colors.yellow);
    truncateLog(";   | |`-'        \\  \\  ;         |   :   .'|   :/\\  \\ ;|   | :    ---'  |   :    |'--'.     /'--'.     /  ", colors.yellow);
    truncateLog("|   ;/             :  \\  \\        |   | ,'  `---'  `--` `---'.|           \\   \\  /   `--'---'   `--'---'   ", colors.yellow);
    truncateLog("'---'               \\  ' ;        `----'                  `---`            `----'                          ", colors.yellow);
    truncateLog("                     `--`                                                                                  ", colors.yellow);
    console.log();
}

const printText = {
    instructionText,
    instructionTextYarn,
    logo
}

export default printText