import pool from "../db";

exports.all = cb => {
  pool.query(
    "SELECT posts.id, posts.title, posts.content, posts.comments_count, posts.creator_id,posts.created_at,users.first_name, users.last_name FROM posts INNER JOIN users ON posts.creator_id = users.id ORDER BY created_at DESC",
    (error, results) => {
      if (error) {
        throw error;
      }
      return cb(results.rows);
    }
  );
};

exports.info = (id, cb) => {
  pool.query("SELECT * FROM posts WHERE id= $1", [id], (error, results) => {
    if (error) {
      throw error;
    }
    return cb(results.rows);
  });
};

exports.create = (creator_id, title, content, cb) => {
  pool.query(
    "INSERT INTO posts (creator_id, title, content, created_at, updated_at) VALUES ($1,$2,$3,NOW(),NOW())",
    [creator_id, title, content],
    (error, results) => {
      if (error) {
        throw error;
      }
      return cb();
    }
  );
};

exports.createComment = (creator_id, post_id, content, cb) => {
  pool.query(
    "INSERT INTO posts_comments (user_id, post_id, content, created_at, updated_at) VALUES ($1,$2,$3,NOW(),NOW())",
    [creator_id, post_id, content],
    (error, results) => {
      if (error) {
        throw error;
      }
      return cb();
    }
  );
};

exports.updateCommentsCount = (post_id, cb) => {
  pool.query(
    " UPDATE posts SET comments_count=comments_count+1,created_at=created_at, updated_at=NOW() WHERE id=$1",
    [post_id],
    (error, results) => {
      if (error) {
        throw error;
      }
      return cb();
    }
  );
};

exports.getComments = (post_id, cb) => {
  pool.query(
    "SELECT * FROM posts_comments WHERE post_id=$1",
    [post_id],
    (error, results) => {
      if (error) {
        throw error;
      }
      return cb(results.rows);
    }
  );
};

exports.getUpvotes = (post_id, cb) => {
  pool.query(
    "SELECT * FROM posts_upvotes WHERE post_id=$1",
    [post_id],
    (error, results) => {
      if (error) {
        throw error;
      }
      return cb(results.rows);
    }
  );
};

exports.createUpvote = (user_id, post_id, cb) => {
  pool.query(
    "INSERT INTO posts_upvotes (post_id, user_id) VALUES ($1,$2) ON CONFLICT DO NOTHING",
    [post_id, user_id],
    (error, results) => {
      if (error) {
        throw error;
      }
      return cb();
    }
  );
};

exports.deleteUpvote = (user_id, post_id, cb) => {
  pool.query(
    "DELETE FROM posts_upvotes WHERE post_id=$1 AND user_id=$2",
    [post_id, user_id],
    (error, results) => {
      if (error) {
        throw error;
      }
      return cb();
    }
  );
};
