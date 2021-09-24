import pool from "../db";

exports.all = cb => {
  pool.query("SELECT * FROM sockets", (error, results) => {
    if (error) {
      throw error;
    }
    return cb(results.rows);
  });
};

exports.create = (user_id, socket_id, cb) => {
  pool.query(
    "INSERT INTO sockets (user_id, socket_id) VALUES ($1,$2) ON CONFLICT DO NOTHING",
    [user_id, socket_id],
    (error, results) => {
      if (error) {
        throw error;
      }
      return cb();
    }
  );
};

exports.delete = (socket_id, cb) => {
  pool.query(
    "DELETE FROM sockets WHERE socket_id=$1",
    [socket_id],
    (error, results) => {
      if (error) {
        throw error;
      }
      return cb();
    }
  );
};
exports.getSocket = (user_id, socket_id, cb) => {
  pool.query(
    "SELECT * FROM sockets WHERE user_id=$1 AND socket_id=$2",
    [user_id, socket_id],
    (error, results) => {
      if (error) {
        throw error;
      }
      return cb(results.rows);
    }
  );
};
