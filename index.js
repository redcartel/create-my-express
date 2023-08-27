#!/usr/bin/env node
import child_process from 'child_process';
import colors from 'colors';
import commandExists from 'command-exists';
import { exit } from 'process';
import { fileURLToPath } from 'url';
import fs from 'fs';
import mkdirp from 'mkdirp';
//import ora from 'ora';
import path from 'path';
import printText from './printText.js';
import { program } from 'commander';
import shell from 'shelljs';

var MODE_0755 = parseInt('0755', 8)

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function determineExecApp() {
    const execPath = process.env['npm_execpath'];
    if (!execPath) return 'npm';
    if (execPath.match('yarn\.')) {
        return 'yarn'
    }
    // else if (execPath.match('pnpm\.')) {
    //     return 'pnpm'
    // }
    else {
        return 'npm'
    }
}

function createAppName(pathName) {
    return path.basename(pathName)
        .replace(/[^A-Za-z0-9.-]+/g, '-')
        .replace(/^[-_.]+|-+$/g, '')
        .toLowerCase()
}

function isEmptyDirectory(dir) {
    const files = fs.readdirSync(dir)
    return (!files || !files.length)
}

function isYarn() {
    return determineExecApp() === 'yarn'
}

// function isPnpm() {
//     return determineExecApp() === 'pnpm'
// }

const programAction = (dir, options) => {
    const appName = options['name'] ? options['name'] : createAppName(path.resolve(dir))

    if (!commandExists.sync('git')) {
        console.error(colors.red('git is not installed or found in PATH'))
        exit(1)
    }

    if ((options.yarn || isYarn()) && !commandExists.sync('yarn')) {
        console.error(colors.red('yarn is not installed or found in PATH'))
        exit(1)
    }

    // if (options.pnpm || isPnpm() && !commandExists.sync('pnpm')) {
    //     console.error(colors.red('pnpm is not installed or found in PATH'))
    //     exit(1)
    // }

    if (!options.yarn && /*!options.pnpm &&*/ !commandExists.sync('npm')) {
        console.error(colors.red('npm is not installed or found in PATH'))
        exit(1)
    }

    if (dir !== '.') {
        console.log(colors.cyan('create ') + dir + path.sep)
        mkdirp.sync(path.join(process.cwd(), dir), MODE_0755)
    }

    if (!isEmptyDirectory(dir)) {
        console.error(colors.red('Must specify a new or empty directory'))
        exit(1)
    }

    printText.logo();

    const repoUrl = options.typescript ?
        'https://github.com/redcartel/node-express-typescript-starter-2022' :
        'https://github.com/redcartel/node-express-starter-2022'

    const branch = 'dist'

    const _path = path.join(process.cwd(), dir)

    console.log(colors.cyan('clone template'))
    child_process.execSync(`git clone --depth=1 -b ${branch} ${repoUrl} ${_path}`, { stdio: [0, 1, 2] })

    if (options.yarn || isYarn()) {
        fs.rmSync(path.join(_path, 'package-lock.json'))
        console.log(colors.cyan('install packages'))
        child_process.execSync('yarn install', {
            cwd: _path,
            stdio: [0, 1, 2]
        })
        fs.copyFileSync(path.join(__dirname, 'PROJECT_README_YARN.md'), path.join(_path, 'README.md'))
    }
    // else if (options.pnpm || isPnpm()) {
    //     fs.rmSync(path.join(_path, 'package-lock.json'))
    //     console.log(colors.cyan('install packages'))
    //     child_process.execSync('pnpm install', {
    //         cdw: _path,
    //         stdio: [0, 1, 2]
    //     })
    //     fs.copyFileSync(path.join(__dirname, 'PROJECT_README_PNPM.md'), path.join(_path, 'README.md'))
    // }
    else {
        console.log(colors.cyan('install packages'))
        child_process.execSync('npm i', { stdio: [0, 1, 2], cwd: _path })
        fs.copyFileSync(path.join(__dirname, 'PROJECT_README_NPM.md'), path.join(_path, 'README.md'))
    }

    fs.rmSync(path.join(_path, '.git'), { recursive: true })

    let packageJson = path.join(_path, 'package.json')

    console.log(colors.cyan('update files'))

    console.log('package.json')
    shell.sed('-i', '"name": ".*"', `"name": "${appName}"`, packageJson)
    shell.sed('-i', '"description": ".*"', `"description": "created with create-my-express"`, packageJson)
    shell.sed('-i', '"version": ".*"', `"version": "0.0.1"`, packageJson)
    shell.sed('-i', '"author": ".*"', `"author": ""`, packageJson)
    shell.sed('-i', '"license": ".*"', `"license": "UNLICENSED"`, packageJson)
    shell.sed('-i', '"private": .*', '"private": true', packageJson)

    // if (options.pnpm || isPnpm()) {
    //     shell.sed('-i', /"cross-env":/d, packageJson)
    //     shell.sed('-i', "cross-env", "", packageJson)
    // }

    if (options.yarn || isYarn()) {
        let dockerfile = path.join(_path, 'Dockerfile');
        shell.sed('-i', 'COPY package-lock.json.*', 'COPY yarn.lock ./', dockerfile);
        shell.sed('-i', 'RUN npm install', 'RUN yarn', dockerfile);
        shell.sed('-i', 'RUN npm run build', 'RUN yarn build', dockerfile);
    }

    // if (options.pnpm || isPnpm()) {
    //     let dockerfile = path.join(_path, 'Dockerfile');
    //     shell.sed('-i', 'COPY package-lock.json.*', 'COPY pnpm-lock.yaml ./', dockerfile);
    //     shell.sed('-i', 'RUN npm install', 'RUN pnpm install', dockerfile);
    //     shell.sed('-i', 'RUN npm run build', 'RUN pnpm build', dockerfile);
    // }

    let envSample = path.join(_path, '.env.sample')
    let envFile = path.join(_path, '.env')

    shell.cp(envSample, envFile);

    if (!options.nogit) {
        try {
            console.log(colors.cyan('initialize git repository'))
            child_process.execSync('git init -b main', { stdio: [0, 1, 2], cwd: _path })
        }
        catch (e) {
            console.error(colors.red('could not initialize git repository'))
        }
    }
    console.log(colors.green('complete!'))

    if (options.yarn || isYarn()) {
        printText.instructionTextYarn(dir)
    }
    // else if (options.pnpm || isPnpm()) {
    //     printText.instructionTextPnpm(dir)
    // }
    else {
        printText.instructionText(dir)
    }
}

program
    .name('create-my-express')
    .version('0.3.0')
    .description('Generate a minimal, production-ready express template project')
    .argument('<dir>')
    .option('-G, --nogit', 'do not initialize a git repository')
    .option('-n, --name <name>', 'project-name')
    .option('-t, --typescript', 'generate typescript project template')
    .option('-y, --yarn', 'use yarn (or run "yarn create my-express")')
    // .option('-p, --pnpm', 'use pnpm')
    .showHelpAfterError()
    .action(programAction)

program.parse()