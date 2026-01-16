import User from '../models/User.js';
import Task from '../models/Task.js';
import Review from '../models/Review.js';

export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateUserProfile = async (req, res) => {
  try {
    const { name, phone, location, bio, skills } = req.body;
    
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    if (name) user.name = name;
    if (phone) user.phone = phone;
    if (location) user.location = location;
    if (bio) user.bio = bio;
    if (skills) user.skills = skills;

    await user.save();

    const updatedUser = await User.findById(req.user.id).select('-password');
    res.json({ success: true, data: updatedUser });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getUserTasks = async (req, res) => {
  try {
    const { type = 'all' } = req.query; // posted, assigned, or all
    
    let filter = {};
    if (type === 'posted') {
      filter.postedBy = req.user.id;
    } else if (type === 'assigned') {
      filter.assignedTo = req.user.id;
    } else {
      filter = {
        $or: [
          { postedBy: req.user.id },
          { assignedTo: req.user.id }
        ]
      };
    }

    const tasks = await Task.find(filter)
      .populate('postedBy', 'name profilePicture')
      .populate('assignedTo', 'name profilePicture')
      .sort({ createdAt: -1 });

    res.json({ success: true, data: tasks });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getUserReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ reviewedUser: req.user.id })
      .populate('reviewer', 'name profilePicture')
      .populate('task', 'title')
      .sort({ createdAt: -1 });

    res.json({ success: true, data: reviews });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateTrustScore = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Calculate trust score based on completed tasks and reviews
    const completedTasks = await Task.countDocuments({
      assignedTo: req.user.id,
      status: 'completed'
    });

    const reviews = await Review.find({ reviewedUser: req.user.id });
    const avgRating = reviews.length > 0
      ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
      : 0;

    // Simple trust score formula (can be enhanced with Gemini AI)
    const trustScore = Math.min(100, (completedTasks * 5) + (avgRating * 10));

    user.trustScore = trustScore;
    await user.save();

    res.json({ success: true, data: { trustScore } });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
