'use client'

import { useRouter } from 'next/navigation' 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons'

export function BackButton() {
    const Router = useRouter(); 
    return (
        <button className='justify-self-start'>
            <FontAwesomeIcon className='cursor-pointer' icon={faAngleLeft} onClick={() => Router.back()}/>
        </button>

    )
}