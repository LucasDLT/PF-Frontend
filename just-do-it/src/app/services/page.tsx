'use client'
import SearchBar from "@/component/searchBar"
import styles from './service.module.css'

export default function Services(){
    return(
        <main className={styles.servicePage}>
            <div className={styles.content}>
                <h1 className={styles.title}>Nuestros Servicios</h1>
                <SearchBar />
            </div>
        </main>
    )
}

