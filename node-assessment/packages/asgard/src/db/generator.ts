import fs from "fs"
import envGlob from "../envglob"
import appRootPath from "app-root-path"
import chalk from "chalk"

namespace knexGenerator {
    export function generateKnexFile(dialect?: string) {
        const path = `${process.cwd()}/${envGlob.folder}/infrastructure/db/knex.${envGlob.type}`
        const postgresqlTemplate = `${appRootPath.path}/packages/asgard/src/db/knex.template/postgresql.ts`
        const mssqlTemplate = `${appRootPath.path}/packages/asgard/src/db/knex.template/postgresql.ts`
        if(!fs.existsSync(path)){
            switch(dialect){
                case "postgres":
                    fs.copyFile(postgresqlTemplate, path,(err) => console.log(err))
                    break
                case "mssql": 
                    fs.copyFile(mssqlTemplate, path,(err) => console.log(err))
                    break
                default:
                    fs.copyFile(postgresqlTemplate, path,(err) => console.log(err))
                    break
            }
            console.log(`${chalk.green('✓')} Knex File created at ${path}`)
        }else{
            console.log(`${chalk.green('✓')} Knex File existed`)   
        }
    }
}

export default knexGenerator