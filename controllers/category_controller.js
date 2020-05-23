'use strict'

var Categoria = require('../models/category')

var controller = {

    create_category: (req, res) => {
        let category = req.body.category
        Categoria.insertCategory(category).then(respuesta => {
            console.log("res insert --- -> ", respuesta.insertId)
            return res.status(200).send({
                status: 'success',
                message: 'Se ha registrado la categoría con éxito.'
            })
        }).catch(err => {
            return res.status(404).send({
                status: 'Error',
                message: 'Se ha producido un error registrando la categoria.'
            })
        })
    },
    update_category: (req, res) => {
        let category = req.body.category
        let idCategory = req.params.id
        category.cate_id = idCategory
        Categoria.updateCategory(category).then(respuesta => {
            return res.status(200).send({
                status: 'success',
                message: 'Se ha editado la categoría con éxito.'
            })
        }).catch(err => {
            return res.status(404).send({
                status: 'Error',
                message: 'Se ha producido un error editando la categoria.'
            })
        })
    },
    list_category: (req, res) => {
        Categoria.getCategories(req.body).then(respuesta => {
            return res.status(200).send({
                status: 'success',
                data: respuesta
            })
        }).catch(err => {
            return res.status(404).send({
                status: 'Error',
                message: 'Se ha producido un error listando las categorias.'
            })
        })
    },
    category_by_id: (req, res) => {
        let id = req.params.id
        Categoria.getCategoryById(id).then(respuesta => {
            return res.status(200).send({
                status: 'success',
                data: respuesta
            })
        }).catch(err => {
            return res.status(404).send({
                status: 'Error',
                message: 'Se ha producido un error listando las categorias.'
            })
        })
    },
}

module.exports = controller