import * as Knex from "knex";

const table_name = 'payments'

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable(table_name, t => {
        t.increments('id')
        t.enu('status', ['DECLINED', 'CONFIRMED'])
        t.timestamps()
        t.timestamp('deleted_at').defaultTo(null)
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable(table_name)
}

/* And model and migration should've put it in the main repo, my bad my bad (please ignore the websocket...) */