import knex from 'knex'
import { Model } from 'objection'
import EnvGlob from '../envglob'
import chalk from "chalk"

export default class Db {
    constructor() {
        import(`${process.cwd()}/${EnvGlob.folder}/infrastructure/db/knex.${EnvGlob.type}`).then(knexfile => {
            Model.knex(knex(knexfile.default[`${process.env.NODE_ENV}`]))
            console.log(`${chalk.green('✓')} DB connected`)
        })
    }
}