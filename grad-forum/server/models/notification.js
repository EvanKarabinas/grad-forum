import pool from "../db";

exports.all = (user_id, cb) => {
  pool.query(
    "SELECT * FROM notifications WHERE receiver_id=$1 ORDER BY created_at DESC",
    [user_id],
    (error, results) => {
      if (error) {
        throw error;
      }
      return cb(results.rows);
    }
  );
};

exports.create = (sender_id, receiver_id, type, content, cb) => {
  pool.query(
    "INSERT INTO notifications (sender_id, receiver_id, type, content,is_read, created_at) VALUES ($1,$2,$3,$4,DEFAULT,NOW())",
    [sender_id, receiver_id, type, content],
    (error, results) => {
      if (error) {
        throw error;
      }
      return cb();
    }
  );
};

exports.markAsRead = cb => {
  pool.query("UPDATE notifications SET is_read=TRUE", (error, results) => {
    if (error) {
      throw error;
    }
    return cb();
  });
};
