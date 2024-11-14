'use client'
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { gymClasses } from "@/lib/utils";

export default function ActivityCarousel() {
  return (
    <Carousel>
      <CarouselContent>
        {gymClasses.map((activity, index) => (
          <CarouselItem key={index}>
            <Card className="border-none bg-black flex items-center justify-center h-full">
              <CardContent className="p-0">
                <div className="relative h-64 md:h-96 overflow-hidden rounded-t-lg	">
                  <Image
                    src={activity.img_url}
                    alt={`Imagen de ${activity.name}`}
                    className="object-cover"
                    width={500}
                    height={100}
                  />
                </div>
                <div className="p-4 bg-white dark:bg-gray-800 rounded-b-lg">
                  <h3 className="text-xl font-bold mb-2">{activity.name}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                    {activity.description}
                  </p>
                  <Badge variant="secondary">{activity.location}</Badge>
                </div>
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="left-2" />
      <CarouselNext className="right-2" />
    </Carousel>
  );
}
