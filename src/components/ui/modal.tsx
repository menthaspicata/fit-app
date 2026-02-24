'use client'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faX } from '@fortawesome/free-solid-svg-icons'
import { useRouter } from 'next/navigation'

export function Modal({name, children}: { name: string; children: React.ReactNode }) {
    const router = useRouter();

    return (
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
            bg-white border-2 border-gray-100 rounded-lg
            xl:w-1/3 p-8 shadow-xl
            md:w-1/3 xs:w-11/12">
            <button className="size-4 cursor-pointer absolute top-2 right-2 text-gray-500" 
                onClick={() => {
                    router.back()
                }}
            >
                <FontAwesomeIcon icon={faX} />
            </button>
            <h3 className="text-center mb-4">{ name }</h3> 
            { children }
            <div></div>
        </div>
    )
}