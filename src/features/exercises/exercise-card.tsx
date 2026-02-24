import { clsx } from 'clsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark, faTrash } from '@fortawesome/free-solid-svg-icons'
import { useTrainingStore  } from '@/store/store';


export function ExerciseCard({ item }: { item: any }) {  
    const { updateWeight, updateReps, addSet, removeSet, toggleExercise, exercises, selectedIds } = useTrainingStore();
    const isSelected = !!selectedIds[item.id.toString()];

    return (

        <div key={item.id} 
        className={clsx("group exercise-card mb-4 grid grid-cols-2 border-s-4 border-gray-300 p-4  justify-between items-center cursor-pointer",
            isSelected ? ' exercise-card-selected' : ''
        )}>
            <div className="pointer-events-none">{item.name}</div>
                    
            {!isSelected 
            ? 
            <button className="group-[.exercise-card-selected]:hidden flex h-10 items-center rounded-lg bg-blue-500 dark:bg-dark-secondary-button px-4 text-sm font-medium text-white transition-colors hover:bg-blue-400 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-blue-500 active:bg-blue-600 aria-disabled:cursor-not-allowed aria-disabled:opacity-50 w-auto cursor-pointer justify-self-end"
            onClick={() => { toggleExercise(item.id)}}>
                +</button>
            :
            <button onClick={(e) => {toggleExercise(item.id)}}
            className="group-[.exercise-card-selected]:flex hidden h-10 items-center rounded-lg bg-red-800 dark:bg-dark-danger px-4 text-sm font-medium text-white transition-colors hover:bg-red-950 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-red-800 active:bg-red-700 aria-disabled:cursor-not-allowed aria-disabled:opacity-50 w-auto cursor-pointer justify-self-end">
                <FontAwesomeIcon icon={faTrash} />
            </button>
                }


                    <div className="pointer-events-none dark:text-dark-secondary-text">{item.muscleGroup}</div>
                   
                    <div className="hidden group-[.exercise-card-selected]:grid  col-start-1 col-end-3">
                        <ul className="exercise-card_sets flex flex-col mt-2">
                            <li className='grid grid-flow-col'>
                                <div>№</div>
                                <div>Reps</div>
                                <div>Weight</div>
                            </li>
                            { exercises.map(ex => {
                                if (ex.exerciseId === item.id.toString()) {
                                    return ex.sets.map((set, index) => (
                                        <li key={set.setNumber} className="flex w-full justify-between items-center mb-2 ">
                                            <p>{index+1}</p>
                                            <input type="number" required value={set.reps ?? 0} id={"set-" + set.setNumber} className="set border p-1"
                                            onChange={(e) => updateReps(item.id, set.setNumber, parseInt(e.target.value, 10))}
                                            />

                                            <input type="number" required value={set.weight ?? 0} id={"weight-" + set.setNumber} className="weight border p-1"
                                            onChange={(e) => updateWeight(item.id, set.setNumber, parseInt(e.target.value, 10))}
                                            />
                                            <button className="remove-set" 
                                            onClick={() => removeSet(item.id, set.setNumber)}
                                            ><FontAwesomeIcon icon={faXmark} /></button>
                                        </li>

                                        
                                    ))
                                }
                            })}
                        </ul>
                        <button onClick={(e) => {addSet(item.id)}}
                        className="flex h-10 items-center rounded-lg bg-blue-500 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-400 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-blue-500 active:bg-blue-600 aria-disabled:cursor-not-allowed aria-disabled:opacity-50 w-auto cursor-pointer justify-self-center"
                        
                        >Add set</button>
                    </div>
                </div>
    )
}