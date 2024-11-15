import {gymClasses} from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";

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
                <Card key={gymClass.id} >
                    <h2 >{gymClass.name}</h2>
                    <p>{gymClass.location}</p>
                    <Image src={gymClass.img_url} alt={gymClass.name} width={500} height={100}/>
                    <button><Link href={`/clases/${gymClass.id}`}>Ver más</Link></button>
                </Card>
          
    );
}

export const Card = styled.div`
  max-width: 1024px;
  max-height: 21rem;
  margin: 1rem;
  background-color: #edede81f;
  backdrop-filter: blur(3px);
  border-radius: 0.5rem;
  overflow: hidden;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  img{
    border-radius: 0.5rem;
    margin-top: 1rem;
    margin-bottom: 1rem;
    border: 3px solid #1b1a19;
  }
  button{
    border-radius: 0.5rem;
    background-color: #fbbf24;
    color: #ffffff;
    border: none;
    padding: 0.5rem 1rem;
    cursor: pointer;
    transition: background-color 0.3s ease-in-out;
    margin-top: 0.3rem;

  }
  button:hover{
    background-color: #f0cb6e;
    border: none;
    cursor: pointer;
    color: #000000;
    border: 1px solid #1b1a19;
    transition: all ease-in-out 0.4s;

  }
  
`;