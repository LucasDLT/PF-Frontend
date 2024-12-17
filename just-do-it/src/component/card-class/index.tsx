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
    <div className={`${styles.card} group`}>
      <div className={styles.imageWrapper}>
        <Image
          src={gymClass.imgUrl}
          alt={gymClass.name}
          layout="fill"
          objectFit="cover"
          className={styles.cardImage}
        />
      </div>
      <div className={styles.cardContent}>
        <h2 className="text-xl font-bold mb-2 text-[#C5F32C] group-hover:text-white transition-colors">
          {gymClass.name}
        </h2>
        <p className="text-white mb-4 line-clamp-3">{gymClass.description}</p>
        <div className="mt-auto">
          <Link
            href={`/servicedetail/${gymClass.id}`}
            className={styles.cardButton}
          >
            Ver más
          </Link>
        </div>
      </div>
    </div>
  );
}
