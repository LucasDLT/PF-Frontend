'use client';

import { useAuth } from '@/context';
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { StarIcon } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import styles from './review.module.css';

interface ReviewProps {
  class_id: string;
}

const Reviews: React.FC<ReviewProps> = ({ class_id }) => {
  const { userSession } = useAuth();
  const [rating, setRating] = useState<number | null>(null);
  const [reviewText, setReviewText] = useState<string>('');
  const [reviews, setReviews] = useState([
    { rating: 5, comment: 'Muy buena clase.', user_id: '6d55e703-5b29-44db-910b-d4d4dd7542f6', class_id: '5b68f434-b9c2-4e09-ab16-5084a4569336' },
    { rating: 4, comment: 'Clase interesante.', user_id: '6d55e703-5b29-44db-910b-d4d4dd7542f6', class_id: '7c78f534-b9d2-4f09-b9d6-5084a4569336' }
  ]);

  const PORT = process.env.NEXT_PUBLIC_APP_API_PORT;

  const handleRatingChange = (selectedRating: number) => {
    setRating(selectedRating);
  };

  const handleReviewTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setReviewText(e.target.value);
  };

  const handleMouseLeave = () => {
    if (rating === null) {
      setRating(0);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === null || rating === 0) {
      alert('Por favor, selecciona una calificación');
      return;
    }
    if (!class_id) {
      alert('Por favor, selecciona una clase');
      return;
    }

    await onSubmitRating(rating, reviewText, class_id);
    setReviewText('');
    setRating(null);
  };

  const onSubmitRating = async (rating: number, reviewText: string, classId: string) => {
    if (!userSession?.id) {
      alert('No estás autenticado');
      return;
    }

    try {
      const response = await fetch(`http://localhost:${PORT}/reviews`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          rating: rating,
          comment: reviewText,
          user_id: userSession.id,
          class_id: classId,
        }),
      });
      
      if (!response.ok) {
        throw new Error('Error al enviar la reseña');
      }

      console.log('Reseña enviada exitosamente', response);
      setReviews([...reviews, { rating, comment: reviewText, user_id: userSession.id ?? '', class_id: classId }]);
    } catch (error) {
      console.error('Error al enviar la reseña:', error);
    }
  };

  return (
    <Card className={styles.card}>
      <CardHeader>
        <CardTitle className={styles.cardHeader}>Reseñas</CardTitle>
      </CardHeader>
      <CardContent className={styles.cardContent}>
        {reviews.length === 0 ? (
          <p className={styles.noReviewsText}>No hay reseñas para esta clase.</p>
        ) : (
          <ul className={styles.reviewsList}>
            {reviews.map((reviewItem, index) => (
              <li key={index} className={styles.reviewItem}>
                <p className={styles.reviewText}>{reviewItem.comment}</p>
                <div className={styles.starsWrapper}>
                  {[...Array(5)].map((_, i) => (
                    <StarIcon
                      key={i}
                      className={`${styles.starIcon} ${i < reviewItem.rating ? styles.starIconFilled : ''}`}
                    />
                  ))}
                  <span className={styles.ratingText}>({reviewItem.rating}/5)</span>
                </div>
              </li>
            ))}
          </ul>
        )}

        <form onSubmit={handleSubmit} className={styles.formWrapper}>
          <div onMouseLeave={handleMouseLeave} className={styles.starButtonWrapper}>
            <TooltipProvider>
              {[1, 2, 3, 4, 5].map((star) => (
                <Tooltip key={star}>
                  <TooltipTrigger asChild>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className={`${styles.starButton} ${
                        (rating !== null ? rating >= star : false)
                          ? styles.starButtonActive
                          : styles.starButtonInactive
                      }`}
                      onMouseEnter={() => setRating(star)}
                      onClick={() => setRating(star)}
                    >
                      <StarIcon className={`h-6 w-6 ${
                        (rating !== null ? rating >= star : false)
                          ? styles.starIconActive
                          : styles.starIconInactive
                      }`} />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{star} {star === 1 ? 'estrella' : 'estrellas'}</p>
                  </TooltipContent>
                </Tooltip>
              ))}
            </TooltipProvider>
          </div>

          <Textarea
            placeholder="Deja tu reseña aquí..."
            value={reviewText}
            onChange={handleReviewTextChange}
            rows={4}
            className={styles.textarea}
          />

          <Button 
            type="submit" 
            className={styles.submitButton}
          >
            Enviar Reseña
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default Reviews;

