import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="home">
      <section className="hero">
        <h1>Sahayak-AI</h1>
        <p className="tagline">Hyper-Local Logistics & Trust Engine for Kerala</p>
        <p className="description">
          Find trusted help for everyday micro-tasks. From plumbing emergencies to 
          medicine pickup, connect with verified local helpers powered by AI.
        </p>
        <div className="cta-buttons">
          <Link to="/tasks" className="btn btn-primary">
            Browse Tasks
          </Link>
          <Link to="/create-task" className="btn btn-secondary">
            Post a Task
          </Link>
        </div>
      </section>

      <section className="features">
        <h2>Why Choose Sahayak-AI?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🤖</div>
            <h3>AI-Powered Matching</h3>
            <p>Google Gemini AI verifies tasks and matches you with the best helpers</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">🛡️</div>
            <h3>Trust Score System</h3>
            <p>Every helper has a verified trust score based on completed tasks and reviews</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">📍</div>
            <h3>Hyper-Local</h3>
            <p>Find help in your immediate neighborhood for quick response times</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">⚡</div>
            <h3>Instant Solutions</h3>
            <p>Post urgent tasks and get matched with available helpers within minutes</p>
          </div>
        </div>
      </section>

      <section className="categories">
        <h2>Popular Task Categories</h2>
        <div className="categories-grid">
          <div className="category-box">Home Maintenance</div>
          <div className="category-box">Healthcare Support</div>
          <div className="category-box">Delivery Services</div>
          <div className="category-box">Caregiving</div>
          <div className="category-box">Tech Support</div>
          <div className="category-box">Other Services</div>
        </div>
      </section>
    </div>
  );
}

export default Home;
