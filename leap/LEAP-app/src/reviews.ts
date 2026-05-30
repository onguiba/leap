import { attachNavigationListeners } from './router';

interface Review {
  id: number;
  userId: string;
  userName: string;
  productId: number;
  rating: number;
  comment: string;
  date: string;
  verified: boolean;
}

const reviews: Review[] = [
  { id: 1, userId: "user1", userName: "Marie K.", productId: 1, rating: 5, comment: "Excellent lait bio, très frais!", date: "2024-12-15", verified: true },
  { id: 2, userId: "user2", userName: "Jean D.", productId: 1, rating: 4, comment: "Bon produit mais un peu cher", date: "2024-12-14", verified: true },
  { id: 3, userId: "user3", userName: "Sophie M.", productId: 2, rating: 5, comment: "Pain délicieux, je recommande!", date: "2024-12-13", verified: true },
  { id: 4, userId: "user4", userName: "Paul N.", productId: 3, rating: 4, comment: "Œufs de qualité", date: "2024-12-12", verified: false }
];

export function getProductReviews(productId: number): Review[] {
  return reviews.filter(r => r.productId === productId);
}

export function getAverageRating(productId: number): number {
  const productReviews = getProductReviews(productId);
  if (productReviews.length === 0) return 0;
  const sum = productReviews.reduce((acc, r) => acc + r.rating, 0);
  return Math.round((sum / productReviews.length) * 10) / 10;
}

export function renderReviewsSection(productId: number): string {
  const productReviews = getProductReviews(productId);
  const avgRating = getAverageRating(productId);
  
  return `
    <div style="background: white; padding: 25px; border-radius: 12px; margin: 20px 0; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
      <h3 style="margin: 0 0 20px 0; font-size: 1.5em;">⭐ Avis Clients</h3>
      
      <div style="display: flex; align-items: center; gap: 20px; margin-bottom: 25px; padding: 20px; background: #f8f9fa; border-radius: 8px;">
        <div style="text-align: center;">
          <div style="font-size: 3em; font-weight: bold; color: #00d084;">${avgRating}</div>
          <div style="color: #ffa500; font-size: 1.5em;">${'★'.repeat(Math.round(avgRating))}${'☆'.repeat(5 - Math.round(avgRating))}</div>
          <div style="color: #666; margin-top: 5px;">${productReviews.length} avis</div>
        </div>
        
        <div style="flex: 1;">
          ${[5,4,3,2,1].map(star => {
            const count = productReviews.filter(r => r.rating === star).length;
            const percentage = productReviews.length > 0 ? (count / productReviews.length) * 100 : 0;
            return `
              <div style="display: flex; align-items: center; gap: 10px; margin: 5px 0;">
                <span style="width: 60px;">${star} ★</span>
                <div style="flex: 1; height: 8px; background: #e0e0e0; border-radius: 4px; overflow: hidden;">
                  <div style="width: ${percentage}%; height: 100%; background: #ffa500;"></div>
                </div>
                <span style="width: 40px; text-align: right; color: #666;">${count}</span>
              </div>
            `;
          }).join('')}
        </div>
      </div>
      
      <button onclick="document.getElementById('review-form').style.display='block'" style="width: 100%; padding: 12px; background: #00d084; color: white; border: none; border-radius: 8px; cursor: pointer; font-size: 1em; margin-bottom: 20px;">
        ✍️ Laisser un avis
      </button>
      
      <div id="review-form" style="display: none; background: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
        <h4 style="margin: 0 0 15px 0;">Votre avis</h4>
        <div style="margin-bottom: 15px;">
          <label style="display: block; margin-bottom: 5px; font-weight: 600;">Note:</label>
          <div class="rating-input" style="font-size: 2em; color: #ddd; cursor: pointer;">
            <span data-rating="1">★</span>
            <span data-rating="2">★</span>
            <span data-rating="3">★</span>
            <span data-rating="4">★</span>
            <span data-rating="5">★</span>
          </div>
        </div>
        <textarea placeholder="Partagez votre expérience..." style="width: 100%; padding: 12px; border: 2px solid #ddd; border-radius: 8px; min-height: 100px; font-family: inherit; resize: vertical;"></textarea>
        <div style="display: flex; gap: 10px; margin-top: 15px;">
          <button onclick="alert('Avis enregistré! Merci pour votre retour.'); document.getElementById('review-form').style.display='none'" style="flex: 1; padding: 10px; background: #00d084; color: white; border: none; border-radius: 6px; cursor: pointer;">Publier</button>
          <button onclick="document.getElementById('review-form').style.display='none'" style="flex: 1; padding: 10px; background: #666; color: white; border: none; border-radius: 6px; cursor: pointer;">Annuler</button>
        </div>
      </div>
      
      <div style="max-height: 400px; overflow-y: auto;">
        ${productReviews.map(review => `
          <div style="border-bottom: 1px solid #e0e0e0; padding: 15px 0;">
            <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 10px;">
              <div>
                <strong>${review.userName}</strong>
                ${review.verified ? '<span style="color: #00d084; margin-left: 5px;">✓ Achat vérifié</span>' : ''}
                <div style="color: #ffa500; margin: 5px 0;">${'★'.repeat(review.rating)}${'☆'.repeat(5 - review.rating)}</div>
              </div>
              <span style="color: #999; font-size: 0.9em;">${new Date(review.date).toLocaleDateString('fr-FR')}</span>
            </div>
            <p style="margin: 0; color: #333; line-height: 1.5;">${review.comment}</p>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

export function initReviews() {
  attachNavigationListeners();
  
  // Rating input interaction
  document.querySelectorAll('.rating-input span').forEach(star => {
    star.addEventListener('click', (e) => {
      const rating = parseInt((e.target as HTMLElement).getAttribute('data-rating')!);
      document.querySelectorAll('.rating-input span').forEach((s, i) => {
        (s as HTMLElement).style.color = i < rating ? '#ffa500' : '#ddd';
      });
    });
  });
}
