'use client'
import { gymClasses } from "@/lib/utils"
import SearchBar from "@/component/searchBar"
export default function Services(){
    return(
        <div>
            <h1>Services</h1>
                <SearchBar  gymClasses={gymClasses}/>
        </div>
    )
}