import { Star } from 'lucide-react';

export default function StarRating({ rating, size = 14 }) {
  const full = Math.floor(rating);
  const stars = [];
  for (let i = 0; i < 5; i++) {
    stars.push(
      <Star key={i} size={size} fill={i < full ? 'var(--star)' : 'none'} color="var(--star)" />
    );
  }
  return stars;
}
