import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  task: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Task',
    required: true
  },
  reviewer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  reviewedUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  comment: {
    type: String,
    maxlength: 1000
  },
  aspects: {
    punctuality: { type: Number, min: 1, max: 5 },
    quality: { type: Number, min: 1, max: 5 },
    communication: { type: Number, min: 1, max: 5 },
    professionalism: { type: Number, min: 1, max: 5 }
  }
}, {
  timestamps: true
});

// Ensure one review per user per task
reviewSchema.index({ task: 1, reviewer: 1 }, { unique: true });

const Review = mongoose.model('Review', reviewSchema);

export default Review;
