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
    const exec = process.env.npm_execpath;
    if (!exec) return false;
    const execName = path.basename(exec);
    if (execName.indexOf('yarn') > -1) {
        return true;
    }
    return false;
}

const programAction = (dir, options) => {
    const appName = options['name'] ?? createAppName(path.resolve(dir))

    if (!commandExists.sync('git')) {
        console.error('git is not installed or found in PATH')
        exit(1)
    }

    if (options.yarn && !commandExists.sync('yarn')) {
        console.error('yarn is not installed or found in PATH');
        exit(1)
    }

    if (!options.yarn && !commandExists.sync('npm')) {
        console.error('npm is not installed or in PATH');
        exit(1)
    }

    if (dir !== '.') {
        console.log(colors.cyan('create ') + dir + path.sep)
        mkdirp.sync(path.join(process.cwd(), dir), MODE_0755)
    }

    if (!isEmptyDirectory(dir)) {
        console.error('Must specify a new or empty directory')
        exit(1)
    }

    printText.logo();

    const repoUrl = options.typescript ?
        'https://github.com/redcartel/node-express-typescript-starter-2022' :
        'https://github.com/redcartel/node-express-starter-2022'

    const branch = 'dist'

    const _path = path.join(process.cwd(), dir)

    // FIXME: this isn't really working
    //let spinner = ora().start();

    console.log(colors.cyan('clone template'))
    child_process.execSync(`git clone --depth=1 -b ${branch} ${repoUrl} ${_path}`, { stdio: [0, 1, 2] })

    //spinner.stop()

    if (options.yarn || isYarn()) {
        console.log(colors.cyan('create yarn.lock from package-lock.json'))
        child_process.execSync('yarn import', {
            cwd: _path,
            stdio: [0, 1, 2]
        })
        fs.rmSync(path.join(_path, 'package-lock.json'))
        console.log(colors.cyan('install packages'))
        child_process.execSync('yarn install --force', {
            cwd: _path,
            stdio: [0, 1, 2]
        })
        fs.copyFileSync(path.join(__dirname, 'PROJECT_README_YARN.md'), path.join(_path, 'README.md'))
    }
    else {
        console.log(colors.cyan('install packages'))
        child_process.execSync('npm i', { stdio: [0, 1, 2], cwd: _path })
        fs.copyFileSync(path.join(__dirname, 'PROJECT_README_NPM.md'), path.join(_path, 'README.md'))
    }

    fs.rmSync(path.join(_path, '.git'), { recursive: true })

    let packageJson = path.join(_path, 'package.json')

    console.log(colors.cyan('update files'))

    shell.sed('-i', '"name": ".*"', `"name": "${appName}"`, packageJson)
    shell.sed('-i', '"description": ".*"', `"description": "created with create-my-express"`, packageJson)
    shell.sed('-i', '"version": ".*"', `"version": "0.0.1"`, packageJson)
    shell.sed('-i', '"author": ".*"', `"author": ""`, packageJson)
    shell.sed('-i', '"license": ".*"', `"license": ""`, packageJson)

    console.log(colors.green('complete!'))

    if (options.yarn || isYarn()) {
        printText.instructionTextYarn(dir)
    }
    else {
        printText.instructionText(dir)
    }
}

program
    .name('create-my-express')
    .version('0.1.0')
    .description('Generate a minimal, production-ready express template project')
    .argument('<dir>')
    .option('-n, --name <name>', 'project-name')
    .option('-t, --typescript', 'generate typescript project template')
    .option('-y, --yarn', 'use yarn instead of npm')
    .showHelpAfterError()
    .action(programAction)

program.parse()