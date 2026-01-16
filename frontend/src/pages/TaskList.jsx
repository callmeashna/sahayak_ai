import { useState, useEffect } from 'react';
import TaskCard from '../components/TaskCard';
import api from '../services/api';

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    category: '',
    urgency: '',
    status: 'open'
  });

  useEffect(() => {
    fetchTasks();
  }, [filters]);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (filters.category) params.append('category', filters.category);
      if (filters.urgency) params.append('urgency', filters.urgency);
      if (filters.status) params.append('status', filters.status);

      const response = await api.get(`/tasks?${params.toString()}`);
      setTasks(response.data.data || []);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="task-list-page">
      <h1>Available Tasks</h1>
      
      <div className="filters">
        <select
          value={filters.category}
          onChange={(e) => setFilters({ ...filters, category: e.target.value })}
        >
          <option value="">All Categories</option>
          <option value="home_maintenance">Home Maintenance</option>
          <option value="healthcare">Healthcare</option>
          <option value="delivery">Delivery</option>
          <option value="caregiving">Caregiving</option>
          <option value="tech_support">Tech Support</option>
          <option value="other">Other</option>
        </select>

        <select
          value={filters.urgency}
          onChange={(e) => setFilters({ ...filters, urgency: e.target.value })}
        >
          <option value="">All Urgencies</option>
          <option value="urgent">Urgent</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
      </div>

      {loading ? (
        <div className="loading">Loading tasks...</div>
      ) : tasks.length === 0 ? (
        <div className="no-tasks">No tasks found matching your criteria.</div>
      ) : (
        <div className="tasks-grid">
          {tasks.map((task) => (
            <TaskCard key={task._id} task={task} />
          ))}
        </div>
      )}
    </div>
  );
}

export default TaskList;
