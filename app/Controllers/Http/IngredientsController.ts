import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Ingredient from 'App/Models/Ingredient'
import Database from '@ioc:Adonis/Lucid/Database'

export default class IngredientsController {
  public async store({ request, response }: HttpContextContract) {
    const input = request.only(['name','measurementid','typeid','stateid'])
    try {
      const ingredient = await Ingredient.create(input)

      return response.status(200).json({ code: 200, status: 'success', data: ingredient })
    } catch (err) {
      return response.status(500).json({ code: 500, status: 'error', message: err.message })
    }
  }

  public async index({ response }: HttpContextContract) {
    const ingredient = await Database.rawQuery('SELECT ig.id as id, ig.name as name, COALESCE(x.qty,0) AS stock FROM public.ingredients as ig LEFT OUTER JOIN (SELECT i.ingredientid, SUM(quantity) qty FROM public.inflows as i GROUP BY i.ingredientid) x ON ig.id = x.ingredientid  ORDER BY ig.id DESC')

    return response.status(200).json({ code: 200, status: 'success', data: ingredient['rows'] })
  }

  public async show({ params, response }: HttpContextContract) {
    try {
      const ingredient = await Ingredient.findBy('id', params.id)

      return response.status(200).json({ code: 200, status: 'success', data: ingredient })
    } catch (err) {
      return response.status(500).json({ code: 500, status: 'error', message: err.message })
    }
  }

  public async assignstate({ params, request, response }: HttpContextContract) {
    const input = request.only(['stateid'])
    try {
      const ingredient = await Ingredient.findBy('id', params.id)
      ingredient?.merge(input)

      await ingredient?.save()

      return response.status(200).json({ code: 200, status: 'success', data: ingredient })
    } catch (err) {
      return response.status(500).json({ code: 500, status: 'error', message: err.message })
    }
  }

  public async assigntype({ params, request, response }: HttpContextContract) {
    const input = request.only(['typeid'])
    try {
      const ingredient = await Ingredient.findBy('id', params.id)
      ingredient?.merge(input)

      await ingredient?.save()

      return response.status(200).json({ code: 200, status: 'success', data: ingredient })
    } catch (err) {
      return response.status(500).json({ code: 500, status: 'error', message: err.message })
    }
  }

  public async update({ params, request, response }: HttpContextContract) {
    const input = request.only(['name','measurementid','typeid','stateid'])
    try {
      const ingredient = await Ingredient.findBy('id', params.id)
      ingredient?.merge(input)

      await ingredient?.save()

      return response.status(200).json({ code: 200, status: 'success', data: ingredient })
    } catch (err) {
      return response.status(500).json({ code: 500, status: 'error', message: err.message })
    }
  }

  public async destroy({ params, response }: HttpContextContract) {
    try {
      const ingredient = await Ingredient.findBy('id', params.id)
      await ingredient?.delete()

      return response.status(200).json({ code: 200, status: 'success', data: ingredient })
    } catch (err) {
      return response.status(500).json({ code: 500, status: 'error', message: err.message })
    }
  }

}