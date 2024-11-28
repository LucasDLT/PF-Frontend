"use client"

import React, { useState, useEffect } from 'react'
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import styles from './ScheduleSelector.module.css'

interface ScheduleItem {
  day: string;
  startTime: string;
  endTime: string;
}

interface ScheduleSelectorProps {
  onScheduleChange: (schedule: ScheduleItem[]) => void;
}

export default function ScheduleSelector({ onScheduleChange }: ScheduleSelectorProps) {
  const days = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes']
  const hours = Array.from({ length: 14 }, (_, i) => `${(i + 8)}:00`) // Desde las 08:00 hasta las 21:00

  const [selectedDay, setSelectedDay] = useState<string>('')
  const [selectedStartTime, setSelectedStartTime] = useState<string>('')
  const [selectedEndTime, setSelectedEndTime] = useState<string>('')
  const [scheduleList, setScheduleList] = useState<ScheduleItem[]>([])
  const [isDayOpen, setIsDayOpen] = useState(false)
  const [isStartTimeOpen, setIsStartTimeOpen] = useState(false)
  const [isEndTimeOpen, setIsEndTimeOpen] = useState(false)

  // Función para obtener las opciones de hora de fin basadas en la hora de inicio
  const getEndTimes = (startTime: string) => {
    const startHour = parseInt(startTime.split(':')[0], 10)
    const endTimes = []
    
    for (let i = startHour + 1; i <= 22; i++) {
      endTimes.push(`${i}:00`)
    }
    
    return endTimes
  }

  const handleAddSchedule = () => {
    if (selectedDay && selectedStartTime && selectedEndTime) {
      const scheduleItem = {
        day: selectedDay,
        startTime: selectedStartTime,
        endTime: selectedEndTime,
      }
      const updatedSchedule = [...scheduleList, scheduleItem]
      setScheduleList(updatedSchedule)
      onScheduleChange(updatedSchedule)
    }
  }

  const handleRemoveLastSchedule = () => {
    const updatedSchedule = scheduleList.slice(0, -1)  
    setScheduleList(updatedSchedule)
    onScheduleChange(updatedSchedule)
  }

  useEffect(() => {
    if (selectedStartTime) {
      setSelectedEndTime('')
    }
  }, [selectedStartTime])

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
              Agregar Horario
            </button>
          </div>

          <div className={styles.removeButtonContainer}>
            <button 
              type="button"
              onClick={handleRemoveLastSchedule} 
              className={styles.removeButton}
              disabled={scheduleList.length === 0} >
              Eliminar Horario
            </button>
          </div>
        </div>

        <div className={styles.scheduleList}>
          <Label className={styles.label}>Horarios Agregados</Label>
          {scheduleList.length > 0 ? (
            <ul>
              {scheduleList.map((schedule, index) => (
                <li key={index}>
                  {schedule.day} {schedule.startTime} - {schedule.endTime}
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
