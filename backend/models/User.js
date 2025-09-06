import mongoose from 'mongoose';
const UserSchema = new mongoose.Schema({
  uid: { type: String, required: true, unique: true },
  favourites: [{ type: Object }],
  watched: [{ type: Object }]
});
const User = mongoose.model('User', UserSchema);
export default User;
