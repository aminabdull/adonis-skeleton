import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Measurements extends BaseSchema {
  protected tableName = 'measurements'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('unitname').notNullable()
      table.decimal('precision', 8, 3).notNullable()
      table.timestamps(true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
