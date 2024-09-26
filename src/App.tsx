import React from 'react';
import './App.css';

const App: React.FC = () => {
  return (
    <div className="crt">
      <header>
        <h1>Welcome to My Retro Site</h1>
      </header>
      <main>
        <section>
          <h2>About</h2>
          <p>This is a retro-themed website with a CRT shader effect.</p>
        </section>
      </main>
      <footer>
        <p>&copy; 2024 My Retro Site</p>
      </footer>
    </div>
  );
};

export default App;
