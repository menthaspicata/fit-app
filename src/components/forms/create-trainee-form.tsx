'use client'


import { createInvite, State } from '@/lib/actions/users.actions';
import { useActionState } from 'react';


export function CreateTraineeForm() {  
    const initialState: State = {
        message: null,
        errors: {},
    };
    const [state, formAction] = useActionState(createInvite, initialState);

    return (    
        <form action={formAction} className="grid justify-center gap-4">
            {/* <input type="text" className="border rounded-sm border-gray-300 outline outline-gray-500 px-4 py-2" name="email" id="trainee-email" placeholder="Email"/> */}
            <input type="text" className="border rounded-sm border-gray-300 outline outline-gray-500 px-4 py-2" name="username" id="trainee-username" placeholder="Username"/>
            <button className="createTrainee cursor-pointer mt-4 text-white 
             h-10 items-center rounded-lg bg-cyan-500 shadow-lg shadow-cyan-500/50" type="submit">Create</button>
        </form>
    )
}