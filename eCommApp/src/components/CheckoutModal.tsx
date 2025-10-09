interface CheckoutModalProps {
    onConfirm: () => void;
    onCancel: () => void;
}

const CheckoutModal = ({ onConfirm, onCancel }: CheckoutModalProps) => {
    return (
        <div className="modal-backdrop">
            <div className="modal-content">
                <h2>Are you sure?</h2>
                <p>Do you want to proceed with the checkout?</p>
                <div className="checkout-modal-actions">
                    <button onClick={onConfirm}>Continue Checkout</button>
                    <button onClick={onCancel} className="cancel-btn">Return to cart</button>
                </div>
            </div>
        </div>
    );
};

export default CheckoutModal;
