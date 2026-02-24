"use client";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { filterExercises } from '@/app/lib/actions';
import { useState } from "react";
import { useSearchStore } from '@/app/store/store';
import type { ExerciseDTO } from '@/app/types/types';


   
export function Search({ placeholder }: { placeholder?: string }) {
    const { query, setQuery } = useSearchStore();
    async function onSearch(query: string) {
        setQuery(query);
    }
   

    return (
        <>
            <label htmlFor="searchExercise" className="mt-6 mb-4 flex relative">
                <FontAwesomeIcon icon={faMagnifyingGlass} className="absolute left-3 top-4" />
                <input className="outline-none px-6 py-3 pl-9" type="search"
                    onChange={(e) => {
                        onSearch(e.target.value);
                    }}
                name="search-exercise" id="searchExercise" placeholder={placeholder}/>
            </label>
           
        </>
    )
}