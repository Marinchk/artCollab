
import { Router } from 'express'
import collabs from '../models/collab.js'
const routerCollab = Router()
import mongoose from 'mongoose'
const { ObjectId } = mongoose.Types
import { db } from '../db.js'
import users from '../models/user.js'
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
dotenv.config()

const key_token = process.env.KEY
const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization

    if (!token) {
        return res.status(400).json({ message: 'An authentication token is required' })
    }

    try {  
        const decoded = jwt.verify(token, key_token);
        req.user = decoded.username
        const username = decoded.username
        next()
    } catch (error) {
        res.status(400).json({ message: 'Invalid authentication token' })
    }
}

routerCollab.get('/', async(req,res)=>{
    const collabArray = await collabs.find({})
    res.status(200).json(collabArray)
})

routerCollab.get('/',authMiddleware, async(req,res)=>{
    try{
        const username = req.user
        const collabArray = await collabs.find({})
        const  myCollabs = collabArray.filter((collab) => {
            let isMyCollab = false
            collab.artistsArray.forEach((artist) =>{
                if (artist.user === username){
                    isMyCollab = true
                }
            })
            return isMyCollab
        })

        if (myCollabs.length <= 0) {
            return res.status(200).json({ message: 'You dont participate in collaborations' })
        }
       res.status(200).json(myCollabs)
    } catch (err) {
       res.status(500).json({ message: err.message })
    }
  })
  
routerCollab.get('/', authMiddleware, async (req,res)=>{
    try{
        const username = req.user
        const collabArray = await collabs.find({ owner: username })
        if (!collabArray) {
            return res.status(200).json({ message: 'You havent created a collab yet'})
        }
       res.status(200).json(collabArray)
    } catch (err) {
       res.status(500).json({ message: err.message })
    }
  })
  

routerCollab .post('/', authMiddleware, async (req, res) => {
    try {
        const owner = req.user
        const nameCollab = req.body.name
        const copy = collabs.find({name: nameCollab})
        if(copy){
            res.status(400).json( {message:'the name of the collab must be unique'})
        } 
        const collab = new collabs({
            name: req.body.name,
            description: req.body.description,
            payment: req.body.payment,
            owner: owner,
            artistsArray: req.body.artistsArray
        })

        await collab.save()

        res.status(200).json({ message: `The collab has been successfully created. Owner is: ${ owner}` })
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: err.message })
    }
})
routerCollab.delete('/removeMe/:name', authMiddleware , async (req, res) =>{
    const username = req.user 
    const owner = req.body.owner
    if(owner == username ){
        res.status(400).json({ message: `Owner of collabs cant delete hisself` })
    }
    const editCollab = await collabs.findOne({ name: req.params.name })
    if (!editCollab) {
        res.status(400).json({ message: 'An editable collab with this name was not found' })
    }
    editCollab.artistsArray = editCollab.artistsArray.filter(artist => artist.user !== username)
    await editCollab.save()
    res.status(200).json({ message: 'Artist removed successfully' })
    })


routerCollab.put('/:name', authMiddleware , async (req, res) => {
    const owner = req.user 
    const ownerCollab = req.body.owner
    if(owner !== ownerCollab ){
        res.status(400).json({ message: `You do not have permission to edit this information` })
    }
    const editCollab = await collabs.findOne({ name: req.params.name })
    if (!editCollab) {
        res.status(400).json({ message: 'An editable collabwith this name was not found' })
    }
    if (Object.keys(req.body).length === 0) {
        res.status(400).json({ message: 'There is no information to edit' })
    }
    delete req.body.name
    await Object.assign(editCollab, req.body)

    const resSave = await editCollab.save()
    if (!resSave) {
        res.status(500).json({ message: 'The collab is unchanged'})
    } else {
        res.status(200).json({ message: 'The collab has been changed' })
    }
})


routerCollab.delete('/:name', authMiddleware ,async (req, res) => {
    const deleteCollab = await collabs.findOne({ name: req.params.name })
    if (!deleteCollab) {
        res.status(400).json({ message: 'The deleted collab with the same name was not found' })
    } else {
        await collabs.deleteOne({ name: req.params.name })
        res.status(200).json({ message: 'The collab has been deleted' })
    }
})

export default routerCollab