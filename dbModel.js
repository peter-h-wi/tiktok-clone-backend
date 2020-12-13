// this is about db structures
import mongoose from "mongoose";

const tiktokSchema = mongoose.Schema({
  url: String,
  channel: String,
  song: String,
  likes: String,
  messages: String,
  description: String,
  shares: String,
});

// Collection inside the database
export default mongoose.model('tiktokVideos', tiktokSchema);
// collection of tiktokVideos has tiktokSchema structures.
// Collection -> [documents] -> Collection -> ...
// Collection is like a table, inside collection, there are document is json file.