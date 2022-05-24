/* import uuid para gerar nome das imagens */
import { v4 as uuidv4 } from 'uuid'

import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Moment from 'App/Models/Moment'

/* Faz a movimentação da imagem */
import Application from '@ioc:Adonis/Core/Application'

export default class MomentsController {

    /* validação da imagem */
    private validationOptions = {
        types: ['image'],
        size: '2mb',
    }

    public async store({ request, response }: HttpContextContract) {
        const body = request.body()

        const image = request.file('image', this.validationOptions)

        if (image) {
            /* cria uma string que executa a versao do uuidv4 */
            const imageName = `${uuidv4()}.${image.extname}`

            await image.move(Application.tmpPath('uploads'), {
                name: imageName
            })

            body.image = imageName
        }

        /* faz a inserção no banco de dados */
        const moment = await Moment.create(body)
        /* Apos inserção, retorna status 201 - ok  */
        response.status(201)

        return {
            message: "Momento criado com sucesso!",
            data: moment
        }
    }

    public async index() {
        /* preload, tras os dados relacionados se tiver, dentro do preload, colocar o nome da outras tabela */
        const moment = await Moment.query().preload('comments')

        return {
            data: moment,
        }
    }

    public async show({ params }: HttpContextContract) {
        const moment = await Moment.findOrFail(params.id)

        /* O load faz a mesma coisa que o preload */
        await moment.load('comments')

        return {
            data: moment,
        }
    }

    public async destroy({ params }: HttpContextContract) {
        const moment = await Moment.findOrFail(params.id)

        await moment.delete()

        return {
            message: "Momento excluido com sucesso!",
            data: moment,
        }
    }

    public async update({ params, request }: HttpContextContract) {

        const body = request.body()

        const moment = await Moment.findOrFail(params.id)

        moment.name = body.name
        moment.email = body.email
        moment.data = body.data
        moment.title = body.title
        moment.description = body.description

        if (moment.image != body.image || !moment.image) {
            const image = request.file('image', this.validationOptions)
            
            /* cria uma string que executa a versao do uuidv4 */
            if (image) {
                const imageName = `${uuidv4()}.${image.extname}`

                await image.move(Application.tmpPath('uploads'), {
                    name: imageName
                })

                moment.image = imageName
            }
        }

        await moment.save()

        return {
            message: "Momento atualizado com sucesso!",
            data: moment,
        }
    }
}
