import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import State from 'App/Models/State'
import Database from '@ioc:Adonis/Lucid/Database'


export default class StatesController {
  public async store({ request, response }: HttpContextContract) {
    const input = request.only(['name'])
    try {
      const state = await State.create(input)

      return response.status(200).json({ code: 200, status: 'success', data: state })
    } catch (err) {
      return response.status(500).json({ code: 500, status: 'error', message: err.message })
    }
  }

  public async index({ response }: HttpContextContract) {
    const state = await Database.rawQuery('SELECT s.id as id, s.name as name, COALESCE(x.cnt,0) AS assigned  FROM public.states as s  LEFT OUTER JOIN (SELECT i.stateid, count(*) cnt FROM public.ingredients as i GROUP BY i.stateid) x ON s.id = x.stateid ORDER BY s.id DESC')

    return response.status(200).json({ code: 200, status: 'success', data: state['rows'] })
  }

  public async show({ params, response }: HttpContextContract) {
    try {
      const state = await State.findBy('id', params.id)

      return response.status(200).json({ code: 200, status: 'success', data: state })
    } catch (err) {
      return response.status(500).json({ code: 500, status: 'error', message: err.message })
    }
  }

  public async update({ params, request, response }: HttpContextContract) {
    const input = request.only(['name'])
    try {
      const state = await State.findBy('id', params.id)
      state?.merge(input)

      await state?.save()

      return response.status(200).json({ code: 200, status: 'success', data: state })
    } catch (err) {
      return response.status(500).json({ code: 500, status: 'error', message: err.message })
    }
  }

  public async destroy({ params, response }: HttpContextContract) {
    try {
      const state = await State.findBy('id', params.id)
      await state?.delete()

      return response.status(200).json({ code: 200, status: 'success', data: state })
    } catch (err) {
      return response.status(500).json({ code: 500, status: 'error', message: err.message })
    }
  }



}