module.exports = function (app) {

    const ComentModel = app.models.coments

    app.get('/coments/:id?', async function (req, res) {
        const id = parseInt(req.params.id) || false
        if (!id) {
            const coments = await ComentModel.findAll();
            res.json(coments)
        } else {
            const coment = await ComentModel.findByPk(id);
            res.json(coment)
        }
    })

    app.post('/coments', async function (req, res) {
        const coment = await ComentModel.create(req.body)
        res.json(coment)
    })

    app.put('/coments/:id', async function (req, res) {
        const id = parseInt(req.params.id)
        const coment = await ComentModel.findByPk(id)
        coment.user = req.body.user
        coment.coment = req.body.coment
        await coment.save()
        res.json(coment)
    })

    app.delete('/coments/:id', async function (req, res) {
        const id = parseInt(req.params.id)
        const coment = await ComentModel.findByPk(id)
        await coment.destroy()
        res.json({ status: "sucess" })
    })
};