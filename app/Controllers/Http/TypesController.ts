import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Type from 'App/Models/Type'
import Database from '@ioc:Adonis/Lucid/Database'

export default class TypeController {
  public async store({ request, response }: HttpContextContract) {
    const input = request.only(['name'])
    try {
      const type = await Type.create(input)

      return response.status(200).json({ code: 200, status: 'success', data: type })
    } catch (err) {
      return response.status(500).json({ code: 500, status: 'error', message: err.message })
    }
  }

  public async index({ response }: HttpContextContract) {
    const type = await Database.rawQuery('SELECT t.id as id, t.name as name, COALESCE(x.cnt,0) AS assigned FROM public.types as t LEFT OUTER JOIN (SELECT i.typeid, count(*) cnt FROM public.ingredients as i GROUP BY i.typeid) x ON t.id = x.typeid ORDER BY t.id DESC')

    return response.status(200).json({ code: 200, status: 'success', data: type['rows'] })
  }

  public async show({ params, response }: HttpContextContract) {
    try {
      const type = await Type.findBy('id', params.id)

      return response.status(200).json({ code: 200, status: 'success', data: type })
    } catch (err) {
      return response.status(500).json({ code: 500, status: 'error', message: err.message })
    }
  }

  public async update({ params, request, response }: HttpContextContract) {
    const input = request.only(['name'])
    try {
      const type = await Type.findBy('id', params.id)
      type?.merge(input)

      await type?.save()

      return response.status(200).json({ code: 200, status: 'success', data: type })
    } catch (err) {
      return response.status(500).json({ code: 500, status: 'error', message: err.message })
    }
  }

  public async destroy({ params, response }: HttpContextContract) {
    try {
      const type = await Type.findBy('id', params.id)
      await type?.delete()

      return response.status(200).json({ code: 200, status: 'success', data: type })
    } catch (err) {
      return response.status(500).json({ code: 500, status: 'error', message: err.message })
    }
  }


}