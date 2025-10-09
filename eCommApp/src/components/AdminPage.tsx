import { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

const AdminPage = () => {
    const [salePercent, setSalePercent] = useState<number>(0);

    return (
        <div className="app">
            <Header />
            <main className="main-content">
                <div className="admin-portal">
                    <h2>Welcome to the admin portal.</h2>
                    <div style={{ marginTop: '2rem' }}>
                        <label htmlFor="salePercent">Set Sale Percent (% off for all items): </label>
                        <input
                            id="salePercent"
                            type="text"
                            value={salePercent}
                            onChange={e => setSalePercent(Number(e.target.value))}
                            style={{ marginLeft: '1rem', padding: '0.5rem', width: '80px' }}
                        />
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
