import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: ['home_maintenance', 'healthcare', 'delivery', 'caregiving', 'tech_support', 'other'],
    required: true
  },
  location: {
    address: String,
    city: String,
    district: String,
    pincode: String,
    coordinates: {
      type: { type: String, enum: ['Point'], default: 'Point' },
      coordinates: [Number] // [longitude, latitude]
    }
  },
  urgency: {
    type: String,
    enum: ['low', 'medium', 'high', 'urgent'],
    default: 'medium'
  },
  budget: {
    amount: Number,
    currency: { type: String, default: 'INR' },
    negotiable: { type: Boolean, default: true }
  },
  status: {
    type: String,
    enum: ['open', 'assigned', 'in_progress', 'completed', 'cancelled'],
    default: 'open'
  },
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  verificationStatus: {
    type: String,
    enum: ['pending', 'verified', 'flagged'],
    default: 'pending'
  },
  aiSuggestions: [{
    type: String
  }],
  matchScore: {
    type: Number,
    min: 0,
    max: 100
  },
  completedAt: Date
}, {
  timestamps: true
});

// Index for location-based queries
taskSchema.index({ 'location.coordinates': '2dsphere' });
taskSchema.index({ status: 1, createdAt: -1 });
taskSchema.index({ category: 1 });

const Task = mongoose.model('Task', taskSchema);

export default Task;
