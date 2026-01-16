import { Link } from 'react-router-dom';

function TaskCard({ task }) {
  const getCategoryColor = (category) => {
    const colors = {
      home_maintenance: '#3b82f6',
      healthcare: '#ef4444',
      delivery: '#10b981',
      caregiving: '#f59e0b',
      tech_support: '#8b5cf6',
      other: '#6b7280'
    };
    return colors[category] || colors.other;
  };

  const getUrgencyBadge = (urgency) => {
    const badges = {
      urgent: { text: 'URGENT', color: '#dc2626' },
      high: { text: 'High', color: '#ea580c' },
      medium: { text: 'Medium', color: '#f59e0b' },
      low: { text: 'Low', color: '#10b981' }
    };
    return badges[urgency] || badges.medium;
  };

  const urgencyBadge = getUrgencyBadge(task.urgency);

  return (
    <div className="task-card">
      <div className="task-card-header">
        <h3 className="task-title">{task.title}</h3>
        <span
          className="urgency-badge"
          style={{ backgroundColor: urgencyBadge.color }}
        >
          {urgencyBadge.text}
        </span>
      </div>
      
      <p className="task-description">{task.description.substring(0, 120)}...</p>
      
      <div className="task-meta">
        <span
          className="category-badge"
          style={{ backgroundColor: getCategoryColor(task.category) }}
        >
          {task.category.replace('_', ' ')}
        </span>
        
        {task.location?.city && (
          <span className="location">📍 {task.location.city}</span>
        )}
        
        {task.budget?.amount && (
          <span className="budget">💰 ₹{task.budget.amount}</span>
        )}
      </div>
      
      {task.postedBy && (
        <div className="task-poster">
          <span>Posted by {task.postedBy.name}</span>
          <span className="trust-score">Trust: {task.postedBy.trustScore}/100</span>
        </div>
      )}
      
      <Link to={`/tasks/${task._id}`} className="view-details-btn">
        View Details →
      </Link>
    </div>
  );
}

export default TaskCard;
