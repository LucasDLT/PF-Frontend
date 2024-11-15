'use client'
import { gymClasses } from "@/lib/utils"
import SearchBar from "@/component/searchBar"
import styled from "styled-components"
export default function Services(){
    return(
        <ServicePage className="bg-[#100f0f] ">
            <Title>Nuestros Servicios</Title>
                <SearchBar  gymClasses={gymClasses}/>
        </ServicePage>
    )
}

export const Title= styled.h1`
  font-size: 8rem;
  color: #fff;
  text-align: left;
`;

export const ServicePage = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
`;