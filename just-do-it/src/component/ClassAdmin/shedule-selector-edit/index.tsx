"use client"

import React, { useState, useEffect, useCallback } from 'react'
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import styles from './shedule-selector-edit.module.css'

interface Schedule {
  id: string;
  day: string;
  startTime: string;
  endTime: string;
}

interface ScheduleSelectorProps {
  schedules: Schedule[];
  onScheduleChange: (updatedSchedule: Schedule[]) => void;
  updateSchedule: (classId: string, scheduleId: string, updatedSchedule: Schedule) => Promise<void>; // Nueva propiedad
}

export default function ScheduleSelector({ onScheduleChange, schedules }: ScheduleSelectorProps) {
  const days = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes']
  const hours = Array.from({ length: 14 }, (_, i) => `${(i + 8).toString().padStart(2, '0')}:00`)

  const [selectedDay, setSelectedDay] = useState<string>('')
  const [selectedStartTime, setSelectedStartTime] = useState<string>('')
  const [selectedEndTime, setSelectedEndTime] = useState<string>('')
  const [scheduleList, setScheduleList] = useState<Schedule[]>(schedules)
  const [isDayOpen, setIsDayOpen] = useState(false)
  const [isStartTimeOpen, setIsStartTimeOpen] = useState(false)
  const [isEndTimeOpen, setIsEndTimeOpen] = useState(false)
  const [editScheduleId, setEditScheduleId] = useState<string | null>(null) // Para identificar el horario que se va a editar

  useEffect(() => {
    setScheduleList(schedules);
  }, [schedules]);

  const getEndTimes = useCallback((startTime: string) => {
    const startHour = parseInt(startTime.split(':')[0], 10)
    return hours.filter(time => parseInt(time.split(':')[0], 10) > startHour)
  }, [hours])

  const handleAddSchedule = useCallback(() => {
    if (selectedDay && selectedStartTime && selectedEndTime) {
      const newScheduleItem: Schedule = {
        id: editScheduleId || `${selectedDay}-${selectedStartTime}-${selectedEndTime}`,
        day: selectedDay,
        startTime: selectedStartTime,
        endTime: selectedEndTime,
      }
      const updatedSchedule = editScheduleId
        ? scheduleList.map(schedule => schedule.id === editScheduleId ? newScheduleItem : schedule)
        : [...scheduleList, newScheduleItem];

      setScheduleList(updatedSchedule);
      onScheduleChange(updatedSchedule);

      setSelectedDay('');
      setSelectedStartTime('');
      setSelectedEndTime('');
      setEditScheduleId(null); // Resetear el ID de edición
    }
  }, [selectedDay, selectedStartTime, selectedEndTime, scheduleList, onScheduleChange, editScheduleId])

  const handleRemoveSchedule = useCallback((index: number) => {
    const updatedSchedule = scheduleList.filter((_, i) => i !== index);
    setScheduleList(updatedSchedule);
    onScheduleChange(updatedSchedule);
  }, [scheduleList, onScheduleChange])

  const handleEditSchedule = useCallback((schedule: Schedule) => {
    setSelectedDay(schedule.day);
    setSelectedStartTime(schedule.startTime);
    setSelectedEndTime(schedule.endTime);
    setEditScheduleId(schedule.id); // Establecer el ID del horario que se va a editar
  }, [])

  return (
    <Card className={styles.card}>
      <CardContent className={styles.cardContent}>
        <Label className={styles.label}>Seleccionar Horario</Label>

        <div className={styles.selectors}>
          <div className={styles.selectorGroup}>
            <Label>Día</Label>
            <div className={styles.customSelect} onClick={() => setIsDayOpen(!isDayOpen)}>
              <div className={styles.selectedValue}>
                {selectedDay || 'Seleccionar Día'}
              </div>
              {isDayOpen && (
                <div className={styles.optionsContainer}>
                  {days.map((day) => (
                    <div 
                      key={day} 
                      className={styles.optionItem} 
                      onClick={() => {
                        setSelectedDay(day)
                        setIsDayOpen(false)
                      }}>
                      {day}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className={styles.selectorGroup}>
            <Label>Hora de Inicio</Label>
            <div className={styles.customSelect} onClick={() => setIsStartTimeOpen(!isStartTimeOpen)}>
              <div className={styles.selectedValue}>
                {selectedStartTime || 'Seleccionar Hora de Inicio'}
              </div>
              {isStartTimeOpen && (
                <div className={styles.optionsContainer}>
                  {hours.map((hour) => (
                    <div 
                      key={hour} 
                      className={styles.optionItem} 
                      onClick={() => {
                        setSelectedStartTime(hour)
                        setIsStartTimeOpen(false)
                      }}>
                      {hour}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className={styles.selectorGroup}>
            <Label>Hora de Fin</Label>
            <div className={styles.customSelect} onClick={() => setIsEndTimeOpen(!isEndTimeOpen)}>
              <div className={styles.selectedValue}>
                {selectedEndTime || 'Seleccionar Hora de Fin'}
              </div>
              {isEndTimeOpen && (
                <div className={styles.optionsContainer}>
                  {getEndTimes(selectedStartTime).map((hour) => (
                    <div 
                      key={hour} 
                      className={styles.optionItem} 
                      onClick={() => {
                        setSelectedEndTime(hour)
                        setIsEndTimeOpen(false)
                      }}>
                      {hour}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className={styles.addButtonContainer}>
            <button 
              type="button"
              onClick={handleAddSchedule} 
              className={styles.addButton}
              disabled={!selectedDay || !selectedStartTime || !selectedEndTime}>
              {editScheduleId ? 'Actualizar Horario' : 'Agregar Horario'}
            </button>
          </div>
        </div>

        <div className={styles.scheduleList}>
          <Label className={styles.label}>Horarios Agregados</Label>
          {scheduleList.length > 0 ? (
            <ul>
              {scheduleList.map((schedule, index) => (
                <li key={schedule.id} className={styles.scheduleItem}>
                  {schedule.day} {schedule.startTime} - {schedule.endTime}
                  <button 
                    type="button" 
                    onClick={() => handleRemoveSchedule(index)}
                    className={styles.removeButton}
                  >
                    Eliminar
                  </button>
                  <button 
                    type="button" 
                    onClick={() => handleEditSchedule(schedule)}
                    className={styles.editButton}
                  >
                    Editar
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p>No hay horarios agregados aún.</p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
