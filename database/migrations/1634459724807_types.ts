import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Types extends BaseSchema {
  protected tableName = 'type'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('name').notNullable()
      table.timestamps(true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
