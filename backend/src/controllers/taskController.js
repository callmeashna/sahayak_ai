import Task from '../models/Task.js';
import { verifyTaskWithGemini, matchTaskToHelper } from '../services/geminiService.js';

export const createTask = async (req, res) => {
  try {
    const { title, description, category, location, urgency, budget } = req.body;
    
    // Use Gemini AI to verify and categorize the task
    const verification = await verifyTaskWithGemini({ title, description, category });
    
    const task = new Task({
      title,
      description,
      category: verification.suggestedCategory || category,
      location,
      urgency,
      budget,
      postedBy: req.user.id,
      verificationStatus: verification.isValid ? 'verified' : 'pending',
      aiSuggestions: verification.suggestions
    });

    await task.save();
    res.status(201).json({ success: true, data: task });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getAllTasks = async (req, res) => {
  try {
    const { status, category, urgency } = req.query;
    const filter = {};
    
    if (status) filter.status = status;
    if (category) filter.category = category;
    if (urgency) filter.urgency = urgency;

    const tasks = await Task.find(filter)
      .populate('postedBy', 'name profilePicture trustScore')
      .populate('assignedTo', 'name profilePicture trustScore')
      .sort({ createdAt: -1 });

    res.json({ success: true, data: tasks });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id)
      .populate('postedBy', 'name email phone profilePicture trustScore')
      .populate('assignedTo', 'name email phone profilePicture trustScore');

    if (!task) {
      return res.status(404).json({ success: false, message: 'Task not found' });
    }

    res.json({ success: true, data: task });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ success: false, message: 'Task not found' });
    }

    // Only the task creator can update
    if (task.postedBy.toString() !== req.user.id) {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }

    Object.assign(task, req.body);
    await task.save();

    res.json({ success: true, data: task });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ success: false, message: 'Task not found' });
    }

    if (task.postedBy.toString() !== req.user.id) {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }

    await task.deleteOne();
    res.json({ success: true, message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getTasksByLocation = async (req, res) => {
  try {
    const { lat, lng, radius = 5 } = req.query; // radius in km

    if (!lat || !lng) {
      return res.status(400).json({ success: false, message: 'Location coordinates required' });
    }

    // Find tasks within radius using MongoDB geospatial query
    const tasks = await Task.find({
      'location.coordinates': {
        $near: {
          $geometry: { type: 'Point', coordinates: [parseFloat(lng), parseFloat(lat)] },
          $maxDistance: radius * 1000 // convert km to meters
        }
      },
      status: 'open'
    }).populate('postedBy', 'name profilePicture trustScore');

    res.json({ success: true, data: tasks });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const assignTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ success: false, message: 'Task not found' });
    }

    if (task.status !== 'open') {
      return res.status(400).json({ success: false, message: 'Task is not available' });
    }

    // Use Gemini AI to verify helper is suitable for this task
    const matchScore = await matchTaskToHelper(task, req.user);

    task.assignedTo = req.user.id;
    task.status = 'assigned';
    task.matchScore = matchScore;
    await task.save();

    res.json({ success: true, data: task, matchScore });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const completeTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ success: false, message: 'Task not found' });
    }

    // Only task poster can mark as complete
    if (task.postedBy.toString() !== req.user.id) {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }

    task.status = 'completed';
    task.completedAt = new Date();
    await task.save();

    res.json({ success: true, data: task });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
