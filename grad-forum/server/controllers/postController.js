import Post from "../models/post";
import Notification from "../models/notification";
import User from "../models/user";
import io from "../utils/socketUtil";

exports.allPosts = (req, res) =>
  Post.all(results => {
    res.send(results);
  });

exports.postInfo = (req, res) => {
  var postId = req.params.id;
  console.log(postId);
  Post.info(postId, results => {
    res.send(results);
  });
};

exports.createPost = (req, res) => {
  var creator_id = req.session.userId;
  var title = req.body.title;
  var content = req.body.content;

  Post.create(creator_id, title, content, () => {
    User.all(users => {
      let user;
      for (user of users) {
        if (user.id != creator_id) {
          Notification.create(creator_id, user.id, "post", title, () => {
            console.log("Notification created successfully.");
          });
        }
      }
    });
    io.sendNotificationToAll(creator_id);
    res.send("Post created successfully.");
  });
};

exports.createPostComment = (req, res) => {
  var creator_id = req.session.userId;
  var post_id = req.params.id;
  var content = req.body.content;
  Post.createComment(creator_id, post_id, content, () => {
    Post.updateCommentsCount(post_id, () => {
      Post.info(post_id, posts => {
        if (creator_id != posts[0].creator_id) {
          Notification.create(
            creator_id,
            posts[0].creator_id,
            "post-comment",
            posts[0].title,
            () => {
              console.log("Notification created successfully.");
            }
          );
          io.sendNotificationToUser(creator_id, posts[0].creator_id);
        }
      });

      res.send("Comment created successfully.");
    });
  });
};

exports.getPostComments = (req, res) => {
  var post_id = req.params.id;
  Post.getComments(post_id, results => {
    res.send(results);
  });
};

exports.getPostUpvotes = (req, res) => {
  var post_id = req.params.id;
  Post.getUpvotes(post_id, results => {
    res.send(results);
  });
};

exports.createPostUpvote = (req, res) => {
  var user_id = req.session.userId;
  var post_id = req.params.id;
  Post.createUpvote(user_id, post_id, () => {
    Post.info(post_id, posts => {
      if (user_id != posts[0].creator_id) {
        Notification.create(
          user_id,
          posts[0].creator_id,
          "like",
          posts[0].title,
          () => {
            console.log("Notification created successfully.");
          }
        );
        io.sendNotificationToUser(user_id, posts[0].creator_id);
      }
    });

    res.send("Upvoted post successfully.");
  });
};

exports.deletePostUpvote = (req, res) => {
  var user_id = req.session.userId;
  var post_id = req.params.id;
  Post.deleteUpvote(user_id, post_id, () => {
    console.log("Upvote deleted successfully.");
    res.send("Upvote deleted successfully.");
  });
};
