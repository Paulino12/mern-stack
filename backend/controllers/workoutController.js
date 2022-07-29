const Workout = require('../models/workoutModel')
const mongoose = require('mongoose')

// get all workouts
const getAllWorkouts = async (req, res) => {
    const workouts = await Workout.find().sort({ createdAt: -1 })
    res.status(200).json(workouts)
}

// get a single workout
const getSingleWorkout = async (req, res) => {
    const { id } = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({ error: 'No such workout' })
    }
    const foundWorkout = await Workout.findById(id)
    if(!foundWorkout){
        return res.status(404).json({ error: `No such workout` })
    }
    res.status(200).json(foundWorkout)
}

// post a new workout
const createWorkout = async (req, res) => {
    const { title, load, reps } = req.body

    let emptyFields = []
    if(!title){
        emptyFields.push('title')
    }
    if(!load){
        emptyFields.push('load')
    }
    if(!reps){
        emptyFields.push('reps')
    }
    if(emptyFields.length > 0){
        return res.status(400).json({ error: 'Please fill in all fields', emptyFields })
    }
    try {
        const workout = await Workout.create({ title, load, reps })
        res.status(200).json(workout)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// update a workout
const updateWorkout = async (req, res) => {
    const { id } = req.params
    // check id validity
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({ error: 'No such workout' })
    }
    const updatedWorkout = await Workout.findOneAndUpdate({ _id: id }, {
        ...req.body
    })
    if(!updatedWorkout){
        return res.status(404).json({ error: `No update` })
    }
    res.status(200).json(updatedWorkout)
}

// delete a workout
const deleteWorkout = async (req, res) => {
    const { id } = req.params
    // check id validity
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({ error: 'Not deleted' })
    }
    const deletedWorkout = await Workout.findOneAndDelete({ _id: id })
    if(!deletedWorkout){
        return res.status(404).json({ error: `No such workout` })
    }
    res.status(200).json(deletedWorkout)
}

module.exports = { getAllWorkouts, getSingleWorkout, createWorkout, updateWorkout, deleteWorkout }