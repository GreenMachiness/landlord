/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('properties', function (table) {
    table.increments("id");
    table.string("address").notNullable();
    table.string("city").notNullable();
    table.string("state").notNullable();
    table.integer("zipCode").notNullable();
    table.double("rent", 8, 2).notNullable();
    table.integer("ownerId")
        .references('id')
        .inTable('users')
        .notNullable()
        .onDelete("CASCADE");
    table.boolean('isVacant');
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable('properties');
};
