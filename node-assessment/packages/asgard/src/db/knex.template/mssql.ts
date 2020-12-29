import { config } from "dotenv"
config()

export default {
    development: {
        client: 'mssql',
        useNullAsDefault: true,
        connection: {
            server: process.env[`IBIZ_DEV_DB_HOST`],
            database: process.env[`IBIZ_DEV_DB_NAME`],
            user: process.env[`IBIZ_DEV_DB_USER`],
            password: process.env[`IBIZ_DEV_DB_PASSWORD`],
            port: parseInt(process.env[`IBIZ_DEV_DB_PORT`])
        },
        migrations: {
            directory: `${__dirname}/migrations`
        },
        seeds: {
            directory: `${__dirname}/seeds`
        }
    },
    testing: {
        client: 'mssql',
        useNullAsDefault: true,
        connection: {
            server: process.env[`IBIZ_TEST_DB_HOST`],
            database: process.env[`IBIZ_TEST_DB_NAME`],
            user: process.env[`IBIZ_TEST_DB_USER`],
            password: process.env[`IBIZ_TEST_DB_PASSWORD`],
            port: parseInt(process.env[`IBIZ_TEST_DB_PORT`])
        },
        migrations: {
            directory: `${__dirname}/migrations`
        },
        seeds: {
            directory: `${__dirname}/seeds`
        }
    },
    production: {
        client: 'mssql',
        useNullAsDefault: true,
        connection: {
            server: process.env[`IBIZ_PROD_DB_HOST`],
            database: process.env[`IBIZ_PROD_DB_NAME`],
            user: process.env[`IBIZ_PROD_DB_USER`],
            password: process.env[`IBIZ_PROD_DB_PASSWORD`],
            port: parseInt(process.env[`IBIZ_PROD_DB_PORT`])
        },
        migrations: {
            directory: `${__dirname}/migrations`
        },
        seeds: {
            directory: `${__dirname}/seeds`
        }
    }
}
