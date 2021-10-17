import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Inflows extends BaseSchema {
  protected tableName = 'inflows'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.integer('ingredientid').notNullable()
      table.string('reason').notNullable()
      table.bigInteger('price').notNullable()
      table.integer('quantity').notNullable()
      table.string('details').nullable()
      table.timestamps(true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
