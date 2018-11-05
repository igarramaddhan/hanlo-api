const UserSeed = require('./20181104201357-demo-user');
const PostSeed = require('./20181105030736-demo-post');
const CommentSeed = require('./20181105031412-demo-comment');
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
    })
    .then(() => {
      console.log('********** Successfully seeded db **********');
    });
};
