import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class AlterTableTypes extends BaseSchema {

  public up() {
    this.schema.renameTable('type', 'types')
  }

  public down() {
      this.schema.dropTable('type')
  }

}
