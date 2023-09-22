const mongoose = require('mongoose');

mongoose.set('strictQuery', false);

mongoose.connect(process.env.MONGODB_SRV).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.log('Error connecting to MongoDB:', err.message);
});

const PersonSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    minlength: 3,
  },
  number: {
    type: String,
    required: [true, 'User phone number required'],
    minlength: 8,
    validate: {
      validator: (v) => {
        return /^\d{2,3}-\d{5,6}(\d+)$/.test(v);
      },
      message: (props) => {
        return `${props.value} is not a valid phone number!`;
      }
    },
  },
});

PersonSchema.set('toJSON', {
  transform: (_, ret) => {
    ret.id = ret._id.toString();
    delete ret._id;
    delete ret.__v;
  }
});

module.exports = mongoose.model('Person', PersonSchema);
