export interface Class {
  
  id: string;
  name: string;
  description: string;
  location: string;
  capacity: number;
  current_participants: number;
  schedule: string;
  imgUrl: string;
  trainerName: string;
  rating:string;
  review:string;

}

interface CardClassProps {
  gymClass: {
    id: string;
    name: string;
    location: string;
    img_url: string;
  };
}