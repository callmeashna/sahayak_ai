import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  userType: {
    type: String,
    enum: ['poster', 'helper', 'both'],
    default: 'both'
  },
  location: {
    city: String,
    district: String,
    state: { type: String, default: 'Kerala' },
    pincode: String,
    coordinates: {
      type: { type: String, enum: ['Point'], default: 'Point' },
      coordinates: [Number] // [longitude, latitude]
    }
  },
  bio: {
    type: String,
    maxlength: 500
  },
  skills: [{
    type: String
  }],
  profilePicture: {
    type: String,
    default: ''
  },
  trustScore: {
    type: Number,
    default: 50,
    min: 0,
    max: 100
  },
  verificationStatus: {
    type: String,
    enum: ['pending', 'verified', 'rejected'],
    default: 'pending'
  },
  verificationNotes: String,
  completedTasks: {
    type: Number,
    default: 0
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Index for location-based queries
userSchema.index({ 'location.coordinates': '2dsphere' });

const User = mongoose.model('User', userSchema);

export default User;
