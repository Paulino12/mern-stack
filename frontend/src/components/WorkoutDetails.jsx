import React from 'react'
import { useWorkoutsContext } from '../hooks/useWorkoutContext'
// date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const WorkoutDetails = ({ workout: { _id, title, reps, load, createdAt }}) => {

    const { dispatch } = useWorkoutsContext()

    // const newDate = new Date(createdAt)

    const handleDelete = async () => {
        const response = await fetch(`/api/workouts/${_id}`, {
            method: 'DELETE',
        })
        const data = await response.json()

        if(response.ok){
            dispatch({ type: 'DELETE_WORKOUT', payload: data })
        }
    }

    return (
        <div className='workout-details'>
            <h4>{title}</h4>
            <p><strong>Load(kg): </strong>{load}</p>
            <p><strong>Reps: </strong>{reps}</p>
            <p>{formatDistanceToNow(new Date(createdAt), { addSuffix: true })}</p>
            <span className='material-symbols-outlined' onClick={handleDelete}>Delete</span>
        </div>
    )
}

export default WorkoutDetails