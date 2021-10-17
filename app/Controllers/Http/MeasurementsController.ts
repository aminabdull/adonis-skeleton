import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Measurement from 'App/Models/Measurement'

export default class MeasurementsController {
  public async store({ request, response }: HttpContextContract) {
    const input = request.only(['unitname', 'precision'])
    try {
      const measurement = await Measurement.create(input)

      return response.status(200).json({ code: 200, status: 'success', data: measurement })
    } catch (err) {
      return response.status(500).json({ code: 500, status: 'error', message: err.message })
    }
  }

  public async index({ response }: HttpContextContract) {
    const measurement = await Measurement.all()

    return response.status(200).json({ code: 200, status: 'success', data: measurement })
  }

  public async show({ params, response }: HttpContextContract) {
    try {
      const measurement = await Measurement.findBy('id', params.id)

      return response.status(200).json({ code: 200, status: 'success', data: measurement })
    } catch (err) {
      return response.status(500).json({ code: 500, status: 'error', message: err.message })
    }
  }

  public async update({ params, request, response }: HttpContextContract) {
    const input = request.only(['unitname', 'precision'])
    try {
      const measurement = await Measurement.findBy('id', params.id)
      measurement?.merge(input)

      await measurement?.save()

      return response.status(200).json({ code: 200, status: 'success', data: measurement })
    } catch (err) {
      return response.status(500).json({ code: 500, status: 'error', message: err.message })
    }
  }

  public async destroy({ params, response }: HttpContextContract) {
    try {
      const measurement = await Measurement.findBy('id', params.id)
      await measurement?.delete()

      return response.status(200).json({ code: 200, status: 'success', data: measurement })
    } catch (err) {
      return response.status(500).json({ code: 500, status: 'error', message: err.message })
    }
  }


}