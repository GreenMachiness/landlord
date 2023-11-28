/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("contracts", function (table) {
    table.increments("id");
    table.integer("propertyId")
      .references("id")
      .inTable("properties")
      .notNullable()
      .onDelete("CASCADE");
    table.integer("tenantId")
      .references("id")
      .inTable("users")
      .notNullable()
      .onDelete("CASCADE");
    table.date("start").notNullable();
    table.date("end").notNullable();
    table.boolean("hasPaid").notNullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable('contracts');
};