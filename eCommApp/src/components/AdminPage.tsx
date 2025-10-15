import { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

const AdminPage = () => {
    const [salePercent, setSalePercent] = useState<number>(0);
    const [inputValue, setInputValue] = useState<string>('0');
    const [errorMessage, setErrorMessage] = useState<string>('');

    return (
        <div className="app">
            <Header />
            <main className="main-content">
                <div className="admin-portal">
                    <h2>Welcome to the admin portal.</h2>
                    <div style={{ marginTop: '2rem' }}>
                        {/* Display error message above the input */}
                        {errorMessage && (
                            <div style={{ color: 'red', marginBottom: '0.5rem' }}>
                                <span dangerouslySetInnerHTML={{ __html: errorMessage }} />
                            </div>
                        )}
                        <label htmlFor="salePercent">Set Sale Percent (% off for all items): </label>
                        <input
                            id="salePercent"
                            type="text"
                            value={inputValue}
                            onChange={e => setInputValue(e.target.value)}
                            style={{ marginLeft: '1rem', padding: '0.5rem', width: '80px' }}
                        />
                        <div style={{ marginTop: '1rem' }}>
                            <button
                                onClick={() => {
                                    const sanitizedValue = Number(inputValue);
                                    if (isNaN(sanitizedValue)) {
                                        setErrorMessage(`Invalid input\n"${inputValue}"\nPlease enter a valid number.`);
                                    } else {
                                        setSalePercent(sanitizedValue);
                                    }
                                }}
                                style={{ marginRight: '1rem' }}
                            >
                                Submit
                            </button>
                            <button
                                onClick={() => { setSalePercent(0); setInputValue('0'); }}
                            >
                                End Sale
                            </button>
                        </div>
                    </div>
                    <p style={{ marginTop: '1rem', color: 'green' }}>
                        {salePercent > 0 ? `All products are ${salePercent}% off!` : 'No sale active.'}
                    </p>
                    <Link to="/">
                        <button style={{ marginTop: '2rem' }}>Back to Storefront</button>
                    </Link>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default AdminPage;
