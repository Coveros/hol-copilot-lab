import Header from './Header';
import Footer from './Footer';

const HomePage = () => {
    return (
        <div className="app">
            <Header />
            <main className="main-content">
                <p><h2>Welcome to the The Daily Harvest!</h2></p>
                <p>Check out our products page for some great deals.</p>
            </main>
            <Footer />
        </div>
    );
};

export default HomePage;
