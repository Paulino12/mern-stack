import React from 'react'
import { useState } from 'react'
import { useWorkoutsContext } from '../hooks/useWorkoutContext'

const WorkoutForm = () => {

    const { dispatch } = useWorkoutsContext()

    const [title, setTitle] = useState('')
    const [load, setLoad] = useState('')
    const [reps, setReps] = useState('')
    const [error, setError] = useState(null)
    const [emptyFields, setEpmtyFields] = useState([])

    const handleSubmit = async (e) => {
        e.preventDefault()
        const workout = { title, load, reps }
        const response = await fetch('/api/workouts', {
            method: 'POST',
            body: JSON.stringify(workout),
            headers: {
                "content-type": 'application/json'
            }
        })
        const data = await response.json()
        if(!response.ok){
            setError(data.error)
            setEpmtyFields(data.emptyFields)
        }
        if(response.ok){ 
            setTitle('')
            setLoad('')
            setReps('')
            setError(null)
            setEpmtyFields([])
            dispatch({ type: 'CREATE_WORKOUT', payload: data })
         }
    }

    return (
        <form className='create' onSubmit={handleSubmit}>
            <h3>Add a New Workout</h3>
            <label>Exercise Title:</label>
            <input
            className={emptyFields.includes('title') ? 'error' : ''}
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            placeholder="Title" />

            <label>Load (in KG):</label>
            <input
            className={emptyFields.includes('load') ? 'error' : ''}
            type="number"
            onChange={(e) => setLoad(e.target.value)}
            value={load}
            placeholder="Load" />

            <label>Reps:</label>
            <input
            className={emptyFields.includes('reps') ? 'error' : ''}
            type="number"
            onChange={(e) => setReps(e.target.value)}
            value={reps}
            placeholder="Title" />

            <button>Add Workout</button>

            { error && <div className='error'>{error}</div>}
        </form>
    )
}

export default WorkoutForm