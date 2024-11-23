'use client'
import SearchBar from "@/component/searchBar"
import styles from './service.module.css'
import { useAuth } from "@/context"

export default function Services(){
    const{classes}=useAuth()
    return(
        <main className={`${styles.servicePage} ${styles.bg}`}>
            <h1 className={styles.title}>Nuestros Servicios</h1>
            <SearchBar />
        </main>
    )
}
