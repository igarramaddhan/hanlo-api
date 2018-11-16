const UserSeed = require('./20181104201357-demo-user');
const PostSeed = require('./20181105030736-demo-post');
const CommentSeed = require('./20181105031412-demo-comment');
const FriendSeed = require('./20181115230614-demo-friend');
const MessageSeed = require('./20181115231337-demo-message');
module.exports = function() {
  return Promise.all([
    // Returning and thus passing a Promise here
    // Independent seeds first
    UserSeed.up()
  ])
    .then(async () => {
      // More seeds that require IDs from the seeds above
      await PostSeed.up();
      await CommentSeed.up();
      await FriendSeed.up();
      await MessageSeed.up();
    })
    .then(() => {
      console.log('********** Successfully seeded db **********');
    });
};
