"use client";

import { useTrainingStore  } from '@/store/store';
import { useEffect, useState } from 'react';
import type { ExerciseDTO } from '@/types/types';
import { useSearchStore } from '@/store/store';
import { ExerciseCard } from '@/features/exercises/exercise-card';


type Props = {
  list: ExerciseDTO[];
};

export function ExerciseList ( { list } : Props ) {
    const [filtered, setFiltered] = useState(list);
    const exercisesList= filtered;
    const { exercises, selectedIds } = useTrainingStore();
    const query = useSearchStore(state => state.query);

    useEffect(() => {
        if (query === '') {
            setFiltered(list);
        } else {
            const filteredList = list.filter(item => 
                item?.name && item.name.toLowerCase().includes(query.toLowerCase())
            );
            setFiltered(filteredList);
        }
    }, [query, list]);
    // class name for selected card - exercise-card-selected
 
       
return (
        <>
            {exercisesList.map((item) => {
                return (
                    <ExerciseCard key={item.id} item={item} />
                );
            })}
        </>
    );
}