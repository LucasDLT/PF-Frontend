import { gymClasses } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import styles from "./cardclass.module.css"; 
interface CardClassProps {
  gymClass: {
    id: string;
    name: string;
    location: string;
    imgUrl: string;
  };
}

export default function CardClass({ gymClass }: CardClassProps) {
  return (
    <div className={styles.card} key={gymClass.id}>
      <h2>{gymClass.name}</h2>
      <p>{gymClass.location}</p>
      <Image
        src={gymClass.imgUrl}
        alt={gymClass.name}
        width={500}
        height={100}
        className={styles.cardImage}
      />
      <button className={styles.cardButton}>
        <Link href={`/servicedetail/${gymClass.id}`}>Ver más</Link>
      </button>
    </div>
  );
}
