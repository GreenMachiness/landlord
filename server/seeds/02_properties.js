const properties = require(`./data/properties.json`)
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('properties').del()
  await knex('properties').insert(properties);
  await knex.raw( `ALTER SEQUENCE properties_id_seq RESTART WITH ${properties.length + 1}`)

};
