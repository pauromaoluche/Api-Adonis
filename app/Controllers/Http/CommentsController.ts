import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Moment from 'App/Models/Moment'
import Comment from 'App/Models/Comment'

export default class CommentsController {

    public async store({ request, params, response }: HttpContextContract) {

        const body = request.body()
        const momentId = params.momentId

        await Moment.findOrFail(momentId)

        body.momentId = momentId

        const comment = await Comment.create(body)

        response.status(201)

        return {
            message: "Comentario feito com sucesso!",
            data: comment,
        }
    }

    public async destroy({ params }: HttpContextContract) {

        const comment = await Comment.findOrFail(params.id)
        await comment.delete()

        return {
            message: "Comentario de "+ comment.username + " excluido com sucesso",
            data: comment,
        }
    }

    public async update({ params, request }: HttpContextContract) {

        const body = request.body()

        const comment = await Comment.findOrFail(params.id)

        comment.username = body.name
        comment.text = body.text

        await comment.save()

        return {
            message: "Comentario atualizado com sucesso!",
            data: comment,
        }
    }
}
