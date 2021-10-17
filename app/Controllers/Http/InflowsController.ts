import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Inflow from 'App/Models/Inflow'
import Database from '@ioc:Adonis/Lucid/Database'

export default class InflowController {
  public async store({ request, response }: HttpContextContract) {
    const input = request.only(['ingredientid','reason','price','quantity','details'])
    try {
      const inflows = await Inflow.create(input)

      return response.status(200).json({ code: 200, status: 'success', data: inflows })
    } catch (err) {
      return response.status(500).json({ code: 500, status: 'error', message: err.message })
    }
  }

  public async index({ response }: HttpContextContract) {
    const inflows = await Database.rawQuery("SELECT i.id, i.ingredientid, i.reason, i.price, i.quantity, i.details, m.unitname FROM public.inflows as i Left Join ingredients as ig ON i.ingredientid = ig.id Left Join measurements as m ON ig.measurementid = m.id")


    return response.status(200).json({ code: 200, status: 'success', data: inflows["rows"] })
  }

  public async reason({ response }: HttpContextContract) {
    const reason = await Database.rawQuery("SELECT 'Purchase' AS reason UNION ALL SELECT 'Recount' UNION ALL SELECT reason FROM public.inflows Group BY reason ORDER BY reason")

    return response.status(200).json({ code: 200, status: 'success', data: reason['rows'] })
  }

  public async show({ params, response }: HttpContextContract) {
    try {
      const inflows = await Inflow.findBy('id', params.id)

      return response.status(200).json({ code: 200, status: 'success', data: inflows })
    } catch (err) {
      return response.status(500).json({ code: 500, status: 'error', message: err.message })
    }
  }

  public async update({ params, request, response }: HttpContextContract) {
    const input = request.only(['ingredientid','reason','price','quantity','details'])
    try {
      const inflows = await Inflow.findBy('id', params.id)
      inflows?.merge(input)

      await inflows?.save()

      return response.status(200).json({ code: 200, status: 'success', data: inflows })
    } catch (err) {
      return response.status(500).json({ code: 500, status: 'error', message: err.message })
    }
  }

  public async destroy({ params, response }: HttpContextContract) {
    try {
      const inflows = await Inflow.findBy('id', params.id)
      await inflows?.delete()

      return response.status(200).json({ code: 200, status: 'success', data: inflows })
    } catch (err) {
      return response.status(500).json({ code: 500, status: 'error', message: err.message })
    }
  }
}  