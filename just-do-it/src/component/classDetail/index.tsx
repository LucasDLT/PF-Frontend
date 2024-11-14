'use client'

import React from 'react'
import styled from 'styled-components'
import { Class } from '@/types/class'

const Container = styled.div`
  background-color: #f3f4f6;
  min-height: 100vh;
  padding: 1rem;
`;

const Card = styled.div`
  max-width: 1024px;
  margin: 0 auto;
  background-color: #ffffff;
  border-radius: 0.5rem;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

const CardContent = styled.div`
  display: flex;
  flex-direction: row;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const LeftSection = styled.div`
  width: 50%;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const RightSection = styled.div`
  padding: 1.5rem;
  width: 50%;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const Title = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  color: #e11d48;
`;

const Description = styled.p`
  margin-top: 0.5rem;
  color: #4b5563;
`;

const Location = styled.p`
  margin-top: 0.5rem;
  color: #4b5563;
`;

const Trainer = styled.p`
  margin-top: 0.5rem;
  color: #4b5563;
`;

const Capacity = styled.div`
  margin-top: 1rem;
  color: #4b5563;
`;

const Button = styled.button`
  width: 100%;
  background-color: #000;
  color: #f4f4f4;
  font-weight: 600;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: #d97706;
  }
`;

export default function ActivityDetail({ id, name, description, location, capacity, trainner, img_url }: Class) {
  return (
    <Container>
      <Card>
        <CardContent>
          <LeftSection>
            <img className="h-36 w-full object-cover" src={img_url} alt={name} />
          </LeftSection>

          <RightSection>
            <Title>{name}</Title>
            <Description>{description}</Description>
            <Location>{location}</Location>
            <Trainer>{trainner}</Trainer>

            <Capacity>
              <span>Capacidad: {capacity} personas por turno</span>
            </Capacity>

            <div className="mt-6">
              <Button>Generar Cita</Button>
            </div>
          </RightSection>
        </CardContent>
      </Card>
    </Container>
  );
}
