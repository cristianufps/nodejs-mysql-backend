'use strict'

var Categoria = require('../models/category')
const db = require('../config/bd')
var controller = {

    create_category: async(req, res) => {
        var con = await db.getConnection();
        let category = req.body.category

        try {
            let respuesta = await Categoria.insertCategory(con, category)
            if (respuesta) {
                console.log("res insert --- -> ", respuesta.insertId)
                return res.status(200).send({
                    status: 'success',
                    message: 'Se ha registrado la categoría con éxito.'
                })
            }
        } catch (error) {
            return res.status(404).send({
                status: 'Error',
                message: 'Se ha producido un error registrando la categoria.'
            })
        } finally {
            console.log("--------- FINALLY create_category --------")
            if (con != null) {
                con.end().then(e => { con = null })
            }
        }

    },
    update_category: async(req, res) => {
        var con = await db.getConnection();
        let category = req.body.category
        let idCategory = req.params.id
        category.cate_id = idCategory

        try {
            let respuesta = await
            Categoria.updateCategory(con, category)
            if (respuesta) {
                return res.status(200).send({
                    status: 'success',
                    message: 'Se ha editado la categoría con éxito.'
                })
            }

        } catch (error) {
            return res.status(404).send({
                status: 'Error',
                message: 'Se ha producido un error editando la categoria.'
            })
        } finally {
            console.log("--------- FINALLY update_category --------")
            if (con != null) {
                con.end().then(e => { con = null })
            }
        }
    },
    list_category: async(req, res) => {
        var con = await db.getConnection();
        try {
            let response = await Categoria.getCategories(con, req.body)
            if (response) {
                return res.status(200).send({
                    status: 'success',
                    data: response
                })
            }
        } catch (error) {
            return res.status(404).send({
                status: 'Error',
                message: 'Se ha producido un error listando las categorias.'
            })
        } finally {
            console.log("--------- FINALLY list_category --------")
            if (con != null) {
                con.end().then(e => { con = null })
            }
        }
    },
    category_by_id: async(req, res) => {
        var con = await db.getConnection();
        let id = req.params.id
        try {
            let response = await Categoria.getCategoryById(con, id)
            if (response) {
                return res.status(200).send({
                    status: 'success',
                    data: response
                })
            }
        } catch (error) {
            return res.status(404).send({
                status: 'Error',
                message: 'Se ha producido un error listando las categorias.'
            })
        } finally {
            console.log("--------- FINALLY list_category --------")
            if (con != null) {
                con.end().then(e => { con = null })
            }
        }

    },
}

module.exports = controller