import * as Knex from "knex";

const table_name = 'orders'

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable(table_name, t => {
        t.increments('id')
        t.string('order_no')
        t.enu('status', ['CREATED', 'CONFIRMED', 'DELIVERED', 'CANCELLED'])
        t.integer('payment_id')
        t.timestamps()
        t.timestamp('deleted_at').defaultTo(null)
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable(table_name)
}

/* I know I know, should've utilize the helper's system and loop the enum */