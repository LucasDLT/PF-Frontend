
export interface CardClassProps {
  gymClass: {
    id: string;
    name: string;
    location: string;
    img_url: string;
  };
}

export interface Class {
  id: string;
  name: string;
  description: string;
  location: string;
  capacity: number;
  imgUrl: string;
  trainerId: string;
  schedule: Array<{ day: string; startTime: string; endTime: string }>;

}

export interface Trainer {
  id: string;
  name: string;
}