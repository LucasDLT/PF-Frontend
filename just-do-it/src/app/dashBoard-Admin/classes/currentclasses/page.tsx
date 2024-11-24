"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { MapPin } from "lucide-react";

import { ImageUploader } from "@/component/ClassAdmin/imageUpdate";
import MyMap from "@/component/GoogleMaps/index";
import ScheduleSelector from "@/component/ClassAdmin/shedule-selector";
import { ClassPreview } from "@/component/ClassAdmin/CardPreview";
import styles from "./AdminClassCreator.module.css";

export default function AdminClassCreator() {
  const [classData, setClassData] = useState({
    name: "",
    description: "",
    image: "",
    location: "",
    mapUrl: "",
    teacher: "",
    schedule: [] as string[],
    capacity: 0,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setClassData({ ...classData, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (uploadedImageUrl: string) => {
    setClassData({ ...classData, image: uploadedImageUrl });
  };

  const generateMapLink = () => {
    const encodedLocation = encodeURIComponent(classData.location);
    const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodedLocation}`;
    setClassData({ ...classData, mapUrl });
  };

  const handleScheduleChange = (schedule: string[]) => {
    setClassData({ ...classData, schedule });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Datos de la clase:", classData);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Crear Nueva Clase</h1>
      <div className={styles.grid}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <Label htmlFor="name" className={styles.label}>Nombre de la Clase</Label>
            <Input id="name" name="name" value={classData.name} onChange={handleInputChange} required />
          </div>
          <div className={styles.formGroup}>
            <Label htmlFor="description" className={styles.label}>Descripción</Label>
            <Textarea id="description" name="description" value={classData.description} onChange={handleInputChange} required />
          </div>
          <ImageUploader onImageUpload={handleImageUpload} />
          <div className={styles.formGroup}>
            <Label htmlFor="location" className={styles.label}>Ubicación</Label>
            <div className={styles.flexRow}>
              <Input id="location" name="location" value={classData.location} onChange={handleInputChange} required />
              <Button type="button" onClick={generateMapLink} className={styles.button}>
                <MapPin className={styles.icon} /> Generar Link
              </Button>
            </div>
          </div>
          <MyMap
            eventLocation={classData.location}
            eventAddress={classData.location}
            setEventAddress={(address) => setClassData({ ...classData, location: address })}
            setEventLocation={(location) => setClassData({ ...classData, location })}
            mapUrl={classData.mapUrl}
          />
          <div className={styles.formGroup}>
            <Label htmlFor="teacher" className={styles.label}>Profesor</Label>
            <Select onValueChange={(value) => setClassData({ ...classData, teacher: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar profesor" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="prof1">Profesor 1</SelectItem>
                <SelectItem value="prof2">Profesor 2</SelectItem>
                <SelectItem value="prof3">Profesor 3</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className={styles.fullWidth}>
            <ScheduleSelector onScheduleChange={handleScheduleChange} />
          </div>
          <div className={styles.formGroup}>
            <Label htmlFor="capacity" className={styles.label}>Capacidad Máxima</Label>
            <Input id="capacity" name="capacity" type="number" min="1" value={classData.capacity} onChange={handleInputChange} required />
          </div>
          <Button type="submit" className={styles.submitButton}>Crear Clase</Button>
        </form>
        <div className={styles.preview}>
          <ClassPreview classData={classData} />
        </div>
      </div>
    </div>
  );
}
