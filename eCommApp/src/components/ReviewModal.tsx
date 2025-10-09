import { Product, Review } from '../types';

interface ReviewModalProps {
    product: Product | null;
    onClose: () => void;
    onSubmit: (review: Review) => void;
}

const ReviewModal = ({ product, onClose, onSubmit }: ReviewModalProps) => {
    if (!product) return null;

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const author = (e.currentTarget.elements.namedItem('author') as HTMLInputElement).value;
        const comment = (e.currentTarget.elements.namedItem('comment') as HTMLTextAreaElement).value;
        onSubmit({ author, comment, date: new Date().toISOString() });
        e.currentTarget.reset();
    };

    return (
        <div className="modal-backdrop" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <h2>Reviews for {product.name}</h2>
                <div className="reviews-list">
                    {product.reviews.length > 0 ? (
                        product.reviews.map((review, index) => (
                            <div key={index} className="review">
                                <p><strong>{review.author}</strong> ({new Date(review.date).toLocaleDateString()}):</p>
                                <p dangerouslySetInnerHTML={{ __html: review.comment }} />
                            </div>
                        ))
                    ) : (
                        <p>No reviews yet.</p>
                    )}
                </div>
                <form onSubmit={handleSubmit} className="review-form">
                    <h3>Leave a Review</h3>
                    <input type="text" name="author" placeholder="Your name" required />
                    <textarea name="comment" placeholder="Your review" required />
                    <button type="submit">Submit</button>
                </form>
                <button onClick={onClose} className="close-button">Close</button>
            </div>
        </div>
    );
};

export default ReviewModal;
