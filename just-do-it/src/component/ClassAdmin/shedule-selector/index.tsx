"use client"

import React, { useState } from 'react'
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import styles from './ScheduleSelector.module.css'

interface ScheduleSelectorProps {
  onScheduleChange: (schedule: string[]) => void
}

export default function ScheduleSelector({ onScheduleChange }: ScheduleSelectorProps) {
  const days = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo']
  const hours = Array.from({ length: 8 }, (_, i) => `${(i + 4) * 2}:00 - ${(i + 5) * 2}:00`)

  const [selectedSchedule, setSelectedSchedule] = useState<string[]>([])

  const handleScheduleChange = (day: string, hour: string) => {
    const scheduleItem = `${day} ${hour}`
    const newSchedule = selectedSchedule.includes(scheduleItem)
      ? selectedSchedule.filter(item => item !== scheduleItem)
      : [...selectedSchedule, scheduleItem]
    
    setSelectedSchedule(newSchedule)
    onScheduleChange(newSchedule)
  }

  return (
    <Card className={styles.card}>
      <CardContent className={styles.cardContent}>
        <Label className={styles.label}>Horarios Disponibles</Label>
        <div className={styles.grid}>
          <div className={styles.emptyHeader}></div>
          {days.map(day => (
            <div key={day} className={styles.dayHeader}>{day}</div>
          ))}
          {hours.map(hour => (
            <React.Fragment key={hour}>
              <div className={styles.hourRow}>{hour}</div>
              {days.map(day => (
                <div key={`${day}-${hour}`} className={styles.cell}>
                  <div className={styles.checkboxContainer}>
                    <Checkbox
                      checked={selectedSchedule.includes(`${day} ${hour}`)}
                      onCheckedChange={() => handleScheduleChange(day, hour)}
                      className={styles.checkbox}
                    />
                  </div>
                </div>
              ))}
            </React.Fragment>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
