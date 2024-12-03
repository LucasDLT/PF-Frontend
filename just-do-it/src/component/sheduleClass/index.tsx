import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, ClockIcon } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import styles from "./ScheduledClasses.module.css";

interface ScheduledClass {
  id: string;
  name: string;  // Asegúrate de que esta propiedad sea "name"
  day: string;
  startTime: string;
  endTime: string;
}

interface ScheduledClassesProps {
  classes: ScheduledClass[];
}

export function ScheduledClasses({ classes }: ScheduledClassesProps) {
  return (
    <Card className={styles.card}>
      <CardContent className={styles.cardContent}>
        {classes.length === 0 ? (
          <p className="text-center text-muted-foreground">
            No tienes clases agendadas por el momento.
          </p>
        ) : (
          <ScrollArea className={styles.scrollArea}>
            <div className={styles.scrollContainer}>
              {classes.map((classItem, index) => (
                <div key={classItem.id} className={styles.classItem}>
                  <div className={styles.classHeader}>
                    <div>
                      <h3 className={styles.classTitle}>{classItem.name}</h3>  {/* Usamos "name" aquí */}
                    </div>
                    <div className={styles.badgeContainer}>
                      <Badge variant="secondary" className="flex items-center space-x-1">
                        <CalendarIcon className="w-3 h-3" />
                        <span>{classItem.day}</span>
                      </Badge>
                      <Badge variant="outline" className="flex items-center space-x-1">
                        <ClockIcon className="w-3 h-3" />
                        <span>{`${classItem.startTime} - ${classItem.endTime}`}</span>
                      </Badge>
                    </div>
                  </div>
                  {index < classes.length - 1 && <Separator className={styles.separator} />}
                </div>
              ))}
            </div>
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  );
}
