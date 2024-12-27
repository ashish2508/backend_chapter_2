import express from 'express'
import db from '../db.js'

const router = express.Router()

//get all todos for logged-in user
router.get('/',(req,res)=>{})

//Create a new todo
router.post('/',(req,res)=>{})

//update a todo
router.post('/:id',(req,res)=>{})

//delete a todo
router.delete('/:id',(req,res)=>{})

export default router
