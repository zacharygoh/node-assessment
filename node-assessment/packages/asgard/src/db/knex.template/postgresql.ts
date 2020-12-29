import { config } from "dotenv"
config()

export default {
    development: {
        client: 'pg',
        useNullAsDefault: true,
        connection: {
            host: process.env[`DEV_DB_HOST`],
            database: process.env[`DEV_DB_NAME`],
            user: process.env[`DEV_DB_USER`],
            password: process.env[`DEV_DB_PASSWORD`],
            port: parseInt(process.env[`DEV_DB_PORT`])
        },
        migrations: {
            directory: `${__dirname}/migrations`
        },
        seeds: {
            directory: `${__dirname}/seeds`
        }
    },
    testing: {
        client: `could've use sqlite, for easy deployment`,
        useNullAsDefault: true,
        connection: {
            host: process.env[`TEST_DB_HOST`],
            database: process.env[`TEST_DB_NAME`],
            user: process.env[`TEST_DB_USER`],
            password: process.env[`TEST_DB_PASSWORD`],
            port: parseInt(process.env[`TEST_DB_PORT`])
        },
        migrations: {
            directory: `${__dirname}/migrations`
        },
        seeds: {
            directory: `${__dirname}/seeds`
        }
    },
    production: {
        client: `could've use sqlite, for easy deployment`,
        useNullAsDefault: true,
        connection: {
            host: process.env[`PROD_DB_HOST`],
            database: process.env[`PROD_DB_NAME`],
            user: process.env[`PROD_DB_USER`],
            password: process.env[`PROD_DB_PASSWORD`],
            port: parseInt(process.env[`PROD_DB_PORT`])
        },
        migrations: {
            directory: `${__dirname}/migrations`
        },
        seeds: {
            directory: `${__dirname}/seeds`
        }
    }
}