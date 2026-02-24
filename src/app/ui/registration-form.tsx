'use client'

import Button from '@/app/ui/button';
import Image from "next/image";
import { State } from '@/app/lib/actions';
import { signUpAction } from '@/app/lib/actions/registration';
import { useActionState } from 'react';
import { zalandoSansExpanded } from "@/app/lib/fonts";


export default function RegistrationForm() {
    
    const initialState: State = {
        message: null,
        errors: {},
    };
    const [state, formAction] = useActionState((state: State, formData: FormData) => signUpAction(formData), initialState);

    return (
    <>
    <form action={formAction}  className="space-y-3">
      <div className="flex-1 ">
        
        <div className={`flex items-center mb-5 text-2xl ${zalandoSansExpanded.className}`}>
            <Image src='/Athlance-logo.png' width={50} height={50} alt='Athlance logo' 
            className='mr-5'/>
            Athlance
        </div>
        <h1 className="mb-3 text-2xl"> Create an account</h1>
        <div className="w-full">
            <div>
                <div className="mb-4 flex flex-col">
                    <label htmlFor="name" className='text-sm mb-2'>Name</label>
                    <input className='outline-none px-4 py-2' type="text" id="name" name="name" placeholder='Enter your name' />
                </div>
                <div className="mb-4 flex flex-col">
                    <label htmlFor="email" className='text-sm mb-2'>Email</label>
                    <input className='outline-none px-4 py-2' type="email" id="email" name="email" placeholder='Email' required />
                </div>
                <div className="mb-4 flex flex-col">
                    <label htmlFor="password" className='text-sm mb-2'>Password</label>
                    <input className='outline-none px-4 py-2' type="password" id="password" name="password" placeholder='Password' required />    
                </div>
                {/* TODO: Add confirm password field and validation */}
                {/* <div className="mb-4 flex flex-col">
                    <label htmlFor="confirmPassword" className='text-sm mb-2'>Confirm Password</label>
                    <input className='outline-none px-4 py-2' type="password" id="confirmPassword" name="confirmPassword" placeholder='Confirm password' required />    
                </div> */}
                </div>
        </div>
      </div>
      <Button type="submit" className="w-full">Sign Up</Button>
    </form>
    </>
    )
}