'use client'

import { useRouter } from 'next/navigation' 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons'

export function BackButton() {
    const Router = useRouter(); 
    return (
        <button onClick={() => Router.back()}
        className="w-9 h-9 mr-5 cursor-pointer bg-white border border-gray-200 rounded-xl flex items-center justify-center hover:border-violet-300 shadow-sm transition-colors flex-shrink-0">
            <FontAwesomeIcon icon={faAngleLeft} />
        </button>
    )
}