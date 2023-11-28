const contracts = require(`./data/contracts.json`)/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('contracts').del()
  await knex('contracts').insert(contracts);
  await knex.raw( `ALTER SEQUENCE contracts_id_seq RESTART WITH ${contracts.length + 1}`)

};
