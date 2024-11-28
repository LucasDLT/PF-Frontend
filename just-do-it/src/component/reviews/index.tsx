'use client';
import { useAuth } from '@/context';
import React, { useState } from 'react';

const Reviews: React.FC = () => {
    const { userSession } = useAuth();
  const [rating, setRating] = useState<number | null>(null); 
  const [reviewText, setReviewText] = useState<string>(''); 
  const [selectedClass, setSelectedClass] = useState<string>(''); 
  const [reviews, setReviews] = useState([  
    { rating: 5, comment: 'Muy buena clase.', user_id: '6d55e703-5b29-44db-910b-d4d4dd7542f6', class_id: '5b68f434-b9c2-4e09-ab16-5084a4569336' },
    { rating: 4, comment: 'Clase interesante.', user_id: '6d55e703-5b29-44db-910b-d4d4dd7542f6', class_id: '7c78f534-b9d2-4f09-b9d6-5084a4569336' }
  ]);
  const [classes] = useState([ 
    { id: "5b68f434-b9c2-4e09-ab16-5084a4569336", name: 'Clase de Yoga' },
  ]);
  
  const PORT = process.env.NEXT_PUBLIC_APP_API_PORT;

  const handleRatingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRating(Number(e.target.value)); // Cambiar la calificación seleccionada
  };

  const handleReviewTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setReviewText(e.target.value); // Cambiar el texto de la reseña
  };

  const handleClassChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedClass(e.target.value); // Cambiar la clase seleccionada
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === null) {
      alert('Por favor, selecciona una calificación');
      return;
    }
    if (!selectedClass) {
      alert('Por favor, selecciona una clase');
      return;
    }

    // Enviar la reseña a la API
    await onSubmitRating(rating, reviewText, selectedClass);
    setReviewText('');
    setRating(null);
    setSelectedClass('');
  };

  const onSubmitRating = async (rating: number, reviewText: string, classId: string) => {
    try {
      const response = await fetch(`http://localhost:${PORT}/reviews`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          rating: rating,
          comment: reviewText,
          user_id: userSession.id, // Tomar el user_id desde el contexto
          class_id: classId, // Usar el id de la clase seleccionada
        }),
      });
      console.log(rating, reviewText, classId, userSession.id);
      
      if (!response.ok) {
        throw new Error('Error al enviar la reseña');
      }

      console.log('Reseña enviada exitosamente;', response);
      // Añadir la reseña nueva a la lista de reseñas localmente
      setReviews([...reviews, { rating, comment: reviewText, user_id: userSession.id ?? '', class_id: classId }]);
    } catch (error) {
      console.log('Error al enviar la reseña:', error);
    }
  };

  return (
    <div className="reviews-container">
      <h3>Reseñas</h3>

      {/* Mostrar las reseñas existentes */}
      <ul className="reviews-list">
        {reviews.length === 0 ? (
          <p>No hay reseñas para esta clase.</p>
        ) : (
          reviews.map((reviewItem, index) => (
            <li key={index} className="review-item">
              <p className="review-text">{reviewItem.comment}</p>
              <div className="review-rating">
                {'⭐'.repeat(reviewItem.rating)} ({reviewItem.rating}/5)
              </div>
            </li>
          ))
        )}
      </ul>

      {/* Formulario para agregar una nueva reseña */}
      <form onSubmit={handleSubmit} className="review-form">
        <div className="rating-stars">
          {[1, 2, 3, 4, 5].map((star) => (
            <label key={star}>
              <input
                type="radio"
                value={star}
                checked={rating === star}
                onChange={handleRatingChange}
              />
              {'⭐'.repeat(star)}
            </label>
          ))}
        </div>

        <textarea
          placeholder="Deja tu reseña aquí..."
          value={reviewText}
          onChange={handleReviewTextChange}
          rows={4}
          className="review-textarea"
        />
        
        {/* Selección de clase */}
        <select onChange={handleClassChange} value={selectedClass} className="class-select">
          <option value="">Selecciona una clase</option>
          {classes.map((classItem) => (
            <option key={classItem.id} value={classItem.id}>
              {classItem.name}
            </option>
          ))}
        </select>

        <button type="submit" className="submit-review-btn">
          Enviar Reseña
        </button>
      </form>
    </div>
  );
};

export default Reviews;
