import BaseSchema from '@ioc:Adonis/Lucid/Schema'
import { reactionsTypes } from 'App/Utils'

export default class Reactions extends BaseSchema {
  protected tableName = 'reactions'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.enu('type', reactionsTypes)
      table
        .integer('user_id')
        .unsigned()
        .references('users.id')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table
        .integer('post_id')
        .unsigned()
        .references('posts.id')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}