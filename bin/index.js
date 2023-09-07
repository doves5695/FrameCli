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
const path = require('path');


const Template = {
    'vue2': 'https://github.com/doves5695/vue2-Template.git',
    'vue2&ts': 'https://github.com/doves5695/vue2ts-Tempalte.git',
    'vue3': 'https://github.com/doves5695/vue3-Template.git',
    'vue3&ts': 'https://github.com/doves5695/vue3ts-Template.git',
    'react': 'https://github.com/doves5695/react-Template.git',
    'react&ts': 'https://github.com/doves5695/reactts-Template.git',
}



// 对命令提示进行修改
program.name('jingrui-cli').usage('<command> [options]');


// 打印出版本号
program.version(`v${require('../package.json').version}`)

// 命令的一些设置
program
    .command('create <program-name> [description]')
    .description('Create a new program')
    .action(async (name) => {
        //  定义一下文件名和路径的变量
        const targetPath = path.join(process.cwd(), name);
        // 判断一下是否有重名的
        if (fs.existsSync(targetPath)) {
            // 如果有就交互
            const answer = await inquirer.prompt([
                {
                    type: 'confirm',
                    message: '确定要覆盖该文件夹吗?',
                    name: 'Cover',
                    default: false
                }
            ]);
            // console.log(answer);
            // 继续去判断用户的选择
            if (answer.Cover) {
                fs.remove(targetPath);
                console.log('覆盖成功');
            } else {
                // 没选覆盖就结束重新再来
                return
            }
        }

        // 如果没有重名的也不需要else判断了直接下一步
        const answer1 = await inquirer.prompt([
            // 选择框架
            {
                type: 'list',
                message: '请选择你要使用的框架',
                name: 'type',
                choices: [
                    {
                        name: 'vue3',
                        value: 'vue3',
                    },
                    {
                        name: 'vue2',
                        value: 'vue2'
                    },
                    {
                        name: 'react',
                        value: 'react'
                    }
                ]
            },
            // 选择有没有ts+eslint+公司开发配置
            {
                type: 'list',
                message: '请选择是否使用Ts',
                name: 'Ts',
                choices: [
                    {
                        name: '是',
                        value: true
                    },
                    {
                        name: '否',
                        value: false
                    }
                ]
            }
        ]);
        // console.log(answer1);
        const key = answer1.type + (answer1.Ts ? '&ts' : '');
        const spinner = ora('正在加载...').start();
        gitClone(Template[key], name, { checkout: 'main' }, function (err) {
            if (err) {
                // console.log('下载失败稍后重试')
                spinner.fail('下载失败..., 请检查网络');
            } else {
                // console.log('下载成功');
                spinner.succeed('下载成功!');

                if (Template[key] == 'react' || Template[key] == 'react&ts') {
                    console.log(chalk.yellowBright(`现在可以尝试运行了运行你的React了`));
                    console.log(chalk.yellowBright(`\n cd ${name}`));
                    console.log(chalk.yellowBright('\n npm install'));
                } else {
                    console.log(chalk.greenBright(`现在可以尝试运行了运行你的Vue了`));
                    console.log(chalk.greenBright(`\n cd ${name}`));
                    console.log(chalk.greenBright('\n pnpm install'));
                    console.log(chalk.greenBright('\n pnpm run dev'));
                }
            }
        });
    });
// 拼接字符串来对应模版对象的属性名


// 使用command之前要先解析
program.parse(process.argv);