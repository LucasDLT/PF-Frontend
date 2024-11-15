'use client'
import { gymClasses } from "@/lib/utils"
import SearchBar from "@/component/searchBar"
export default function Services(){
    return(
        <div className="bg-black">
            <h1>Services</h1>
                <SearchBar  gymClasses={gymClasses}/>
        </div>
    )
}

