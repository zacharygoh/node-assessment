import { config } from "dotenv"
import { path } from 'app-root-path'
config({
    path: path+`/packages/order/.env`
})

export default {
    development: {
        client: 'pg',
        useNullAsDefault: true,
        connection: {
            host: process.env.DEV_DB_HOST,
            database: process.env.DEV_DB_NAME,
            user: process.env.DEV_DB_USER,
            password: process.env.DEV_DB_PASSWORD,
            port: parseInt(process.env.DEV_DB_PORT)
        },
        migrations: {
            directory: `${__dirname}/migrations/development`
        },
        seeds: {
            directory: `${__dirname}/seeds/development`
        }
    },
    testing: {
        client: `could've use sqlite, for easy deployment`,
        useNullAsDefault: true,
        connection: {
            filename: `${__dirname}/testing.db`
        },
        migrations: {
            directory: `${__dirname}/migrations/testing`
        },
        seeds: {
            directory: `${__dirname}/seeds/testing`
        }
    },
    production: {
        client: `could've use sqlite, for easy deployment`,
        useNullAsDefault: true,
        connection: {
            host: process.env[`${process.env.ENV}_DB_HOST`],
            database: process.env[`${process.env.ENV}_DB_NAME`],
            user: process.env[`${process.env.ENV}_DB_USER`],
            password: process.env[`${process.env.ENV}_DB_PASSWORD`],
            port: parseInt(process.env[`${process.env.ENV}_DB_PORT`])
        },
        migrations: {
            directory: `${__dirname}/migrations/production`
        },
        seeds: {
            directory: `${__dirname}/seeds/production`
        }
    }
}