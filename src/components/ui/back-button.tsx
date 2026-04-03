'use client'

import { useRouter } from 'next/navigation' 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons'

interface BackButtonProps {
  href?: string
}

export function BackButton({ href }: BackButtonProps) {
  const router = useRouter(); 

  const handleClick = () => {
    if (href) {
      router.push(href)
    } else {
      router.push('/dashboard')
    }
  }

  return (
    <button 
      onClick={handleClick}
      className="w-9 h-9 mr-5 cursor-pointer text-gray-800 dark:text-violet-50 bg-white dark:bg-slate-900 border border-gray-200 dark:border-gray-800 rounded-xl flex items-center justify-center hover:border-violet-300 dark:hover:border-gray-800 dark:hover:bg-indigo-900 shadow-sm transition-colors flex-shrink-0"
    >
      <FontAwesomeIcon icon={faAngleLeft} />
    </button>
  )
}