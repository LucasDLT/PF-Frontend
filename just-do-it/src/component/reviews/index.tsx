'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { StarIcon } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import styles from './review.module.css';
import { ReviewProps } from '@/app/servicedetail/[id]/page';

interface ReviewsComponentProps {
  reviews: ReviewProps[];
  onSubmitRating: (rating: number, reviewText: string) => void;
  membershipStatus: string | null;
}

const Reviews: React.FC<ReviewsComponentProps> = ({
  reviews,
  onSubmitRating,
  membershipStatus,
}) => {
  const [rating, setRating] = useState<number | null>(null);
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [reviewText, setReviewText] = useState<string>('');

  const handleRatingChange = (selectedRating: number) => {
    setRating(selectedRating);
  };

  const handleReviewTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    setReviewText(e.target.value);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === null || rating === 0) {
      alert('Por favor, selecciona una calificación');
      return;
    }
    if (!reviewText.trim()) {
      alert('Por favor, escribe tu reseña');
      return;
    }

    onSubmitRating(rating, reviewText);
    setReviewText('');
    setRating(null);
  };

  return (
    <Card className={styles.card}>
      <CardHeader>
        <CardTitle className={styles.cardHeader}>Reseñas</CardTitle>
      </CardHeader>
      <CardContent className={styles.cardContent}>
        {reviews.length === 0 ? (
          <p className={styles.noReviewsText}>
            No hay reseñas para esta clase.
          </p>
        ) : (
          <ul className={styles.reviewsList}>
            {reviews.map((reviewItem, index) => (
              <li key={index} className={styles.reviewItem}>
                <p className={styles.reviewText}>{reviewItem.comment}</p>
                <div className={styles.starsWrapper}>
                  {[...Array(5)].map((_, i) => (
                    <StarIcon
                      key={i}
                      className={`${styles.starIcon} ${
                        i < (reviewItem.rating ?? 0)
                          ? styles.starIconFilled
                          : ''
                      }`}
                    />
                  ))}
                  <span className={styles.ratingText}>
                    ({reviewItem.rating ?? 0}/5)
                  </span>
                </div>
              </li>
            ))}
          </ul>
        )}

        {membershipStatus === 'active' ? (
          <form onSubmit={handleSubmit} className={styles.formWrapper}>
            <div className={styles.starButtonWrapper}>
              <TooltipProvider>
                {[1, 2, 3, 4, 5].map(star => (
                  <Tooltip key={star}>
                    <TooltipTrigger asChild>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className={`${styles.starButton} ${
                          (rating ?? 0) >= star
                            ? styles.starButtonActive
                            : styles.starButtonInactive
                        }`}
                        onClick={() => handleRatingChange(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(null)}
                      >
                        <StarIcon
                          className={`h-6 w-6 ${
                            (hoverRating ?? rating ?? 0) >= star
                              ? styles.starIconActive
                              : styles.starIconInactive
                          }`}
                        />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>
                        {star} {star === 1 ? 'estrella' : 'estrellas'}
                      </p>
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

            <Button type="submit" className={styles.submitButton}>
              Enviar Reseña
            </Button>
          </form>
        ) : (
          <p className={styles.noMembershipText}>
            Debes tener una suscripcion activa para dejar una reseñas.
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default Reviews;

