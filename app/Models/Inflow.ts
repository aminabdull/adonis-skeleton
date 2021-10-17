import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Inflow extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public ingredientid: number  

  @column()
  public reason: string

  @column()
  public price: number  

  @column()
  public quantity: number 

  @column()
  public measurement: number 

  @column()
  public details: number 

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
