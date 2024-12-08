import Image from "next/image";
import Link from "next/link";
import styles from "./cardclass.module.css"; 
interface CardClassProps {
  gymClass: {
    id: string;
    name: string;
    location: string;
    imgUrl: string;
    description: string;
  };
}

export default function CardClass({ gymClass }: CardClassProps) {
  return (
    <div className={styles.card} key={gymClass.id}>
      <Image
        src={gymClass.imgUrl}
        alt={gymClass.name}
        width={500}
        height={100}
        className={styles.cardImage}
      />
      <div className={styles.cardContent} >
      <h2>{gymClass.name}</h2>
      <p>{gymClass.description}</p>
      <button className={styles.cardButton}>
        <Link href={`/servicedetail/${gymClass.id}`}>Ver más</Link>
      </button>
      </div>
    </div>
  );
}
