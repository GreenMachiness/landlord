/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
   return knex.schema.createTable('users', function(table) {
    table.increments('id');
    table.string('firstName').notNullable();
    table.string('lastName').notNullable();
    table.string('username').notNullable().unique()
    table.integer('age').notNullable();
    table.string('email').notNullable();
    table.string('password').notNullable();
    table.bigInteger('phoneNumber').notNullable();
    table.enu('permission', ['admin', 'owner', 'tenant'])
    table.timestamp('created_at').defaultTo(knex.fn.now())
    table.timestamp('updated_at').defaultTo(knex.fn.now())
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('users');
};
