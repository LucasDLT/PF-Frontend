import {gymClasses} from "@/lib/utils";
import Image from "next/image";

interface CardClassProps {
    gymClass: {
        id: string;
        name: string;
        location: string;
        img_url: string
    }
}

export default function CardClass({gymClass}:CardClassProps) {

    return (
        <div>{
                <div key={gymClass.id} className="bg-white p-4 rounded-lg shadow-md mb-4">
                    <h2 className="text-lg font-semibold">{gymClass.name}</h2>
                    <p className="text-gray-600">{gymClass.location}</p>
                    <Image src={gymClass.img_url} alt={gymClass.name} width={500} height={100} className="text-gray-600"/>
                </div>
            }
        </div>
    );
}