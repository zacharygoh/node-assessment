import inquirer from "inquirer"
import chalk from "chalk"
import fs from "fs"
import appRoot from "app-root-path"
import { execSync } from "child_process"

inquirer
.prompt([
    { type: 'input', name: 'repoName', message: "Please specify name for the new repo to resides in realms\n"},
    { type: 'confirm', name: 'websocket', message: "Do you need websocket?\n"},
    { type: 'list', name: 'db', message: "Do you need DB? if yes specify\n", choices: [
        "postgresql",
        "mssql",
        "no"
    ]}
])
.then(answers => {
    const path = `${appRoot.path}/packages/${answers.repoName.toLowerCase()}`
    if(fs.existsSync(path)){
        console.log(`${chalk.red('X')} ${answers.repoName} already existed in realms, please choose other name\n`)
    }else{
        const templatePath = `${appRoot.path}/packages/asgard/src/generator/templates`
        fs.mkdirSync(path)
        fs.copyFileSync(`${templatePath}/.env`, `${path}/.env`)
        let packageJsonContent = fs.readFileSync(`${templatePath}/package.json`, 'utf-8')
        packageJsonContent = packageJsonContent.replace('"name": ""', `"name": "@space/${answers.repoName}"`)
        fs.writeFileSync(`${path}/package.json`, packageJsonContent)
        fs.copyFileSync(`${templatePath}/tsconfig.build.json`, `${path}/tsconfig.build.json`)
        fs.copyFileSync(`${templatePath}/tsconfig.json`, `${path}/tsconfig.json`)
        const interfacePath = `${path}/src/interfaces/sample`
        fs.mkdirSync(interfacePath, {recursive: true})
        if(answers.db === "no") {
            fs.writeFileSync(`${path}/src/index.ts`, 
            `import { bootstrapApp } from "@space/asgard"\n\n` + 
            `bootstrapApp(${answers.websocket})`)
        }else {
            fs.writeFileSync(`${path}/src/index.ts`, 
            `import { bootstrapApp } from "@space/asgard"\n\n` + 
            `bootstrapApp(${answers.websocket},'${answers.db}')`)
        }
        fs.copyFileSync(`${templatePath}/http.controller.ts`, `${interfacePath}/http.controller.ts`)
        fs.copyFileSync(`${templatePath}/ws.controller.ts`, `${interfacePath}/ws.controller.ts`)
        let rootPackageJsonContent = fs.readFileSync('./package.json', 'utf8')
        rootPackageJsonContent = rootPackageJsonContent.replace(`"repo:create"`, 
        `"${answers.repoName}": "yarn workspace @space/${answers.repoName}",\n`+ 
        `\t\t"repo:create"`)
        fs.writeFileSync("./package.json", rootPackageJsonContent)
        execSync(`lerna add @space/asgard --scope=@space/${answers.repoName}`)
        execSync('lerna bootstrap')
        let vsCodeLaunchTemplate = fs.readFileSync(`${templatePath}/launch.json`, 'utf-8')
        vsCodeLaunchTemplate = vsCodeLaunchTemplate.split("{{ name }}").join(`${answers.repoName}`)
        let vsCodeLaunchFile = fs.readFileSync('.vscode/launch.json', 'utf-8')
        vsCodeLaunchFile = vsCodeLaunchFile.replace(`// {{ scaffolding purpose }}`, 
        vsCodeLaunchTemplate + "\n" + 
        "\t\t// {{ scaffolding purpose }}")
        fs.writeFileSync('.vscode/launch.json', vsCodeLaunchFile)
        console.log(`${chalk.green('✔')} ${answers.repoName} scaffolded successful! `)
    }
})
.catch(error => {
    console.log(error)
})