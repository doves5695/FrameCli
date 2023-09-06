#!/usr/bin/env node

// console.log(123);

// 引入命令改变
const program = require('commander');
// 引入用于改变字体颜色
const chalk = require('chalk');
// 引入炫酷字体
const figlet = require('figlet');
// 引入改变本地文件
const fs = require('fs-extra');
// 引入git
const gitClone = require('git-clone');
// 引入交互
const inquirer = require('inquirer');
// 引入加载动态
const ora = require('ora');


// 命令的一些设置
program
    .version(`v${require('../package.json').version}`)
    .name('jingruijs').usage('<command> [options]')
    .command('create <Project-name> [description]')
    .description('Create a new project')
    // 逻辑全在action函数里面
    .action()


// 使用command之前要先解析
program.parse(process.argv);