import pool from "../db";

exports.all = cb => {
  pool.query(
    "SELECT users.id, users.username, users.first_name, users.last_name,users.email, users.verified ,users.created_at,users.profile_photo FROM users",
    (error, results) => {
      if (error) {
        throw error;
      }
      return cb(results.rows);
    }
  );
};

exports.info = (id, cb) => {
  pool.query("SELECT * FROM users WHERE id= $1", [id], (error, results) => {
    if (error) {
      throw error;
    }
    return cb(results.rows);
  });
};

exports.loginUser = (username, password, cb) => {
  pool.query(
    "SELECT * FROM users WHERE username= $1 AND password=$2",
    [username, password],
    (error, results) => {
      if (error) {
        throw error;
      }
      return cb(results.rows);
    }
  );
};

exports.create = (
  username,
  password,
  email,
  first_name,
  last_name,
  profile_photo
) => {
  pool.query(
    "INSERT INTO users (username, password, email,first_name,last_name,profile_photo, created_at, is_admin,verified) VALUES ($1,$2,$3,$4,$5,$6,NOW(),DEFAULT,DEFAULT)",
    [username, password, email, first_name, last_name, profile_photo],
    (error, results) => {
      if (error) {
        throw error;
      }
    }
  );
};

exports.findUser = (username, cb) => {
  pool.query(
    "SELECT * FROM users WHERE username= $1",
    [username],
    (error, results) => {
      if (error) {
        throw error;
      }
      return cb(results.rows);
    }
  );
};

exports.updateUserAndPassword = (
  user_id,
  first_name,
  last_name,
  email,
  password,
  profile_photo,
  cb
) => {
  pool.query(
    "UPDATE users SET first_name=$2 , last_name=$3, email=$4, password=$5, profile_photo=$6  WHERE id= $1",
    [user_id, first_name, last_name, email, password, profile_photo],
    (error, results) => {
      if (error) {
        throw error;
      }
      return cb();
    }
  );
};

exports.updateUserWithoutPassword = (
  user_id,
  first_name,
  last_name,
  email,
  profile_photo,
  cb
) => {
  pool.query(
    "UPDATE users SET first_name= $2 , last_name= $3, email= $4 , profile_photo=$5 WHERE id= $1",
    [user_id, first_name, last_name, email, profile_photo],
    (error, results) => {
      if (error) {
        throw error;
      }
      console.log("Updated user successfull!###### with id:" + user_id);
      return cb();
    }
  );
};

exports.verify = (member_id, cb) => {
  pool.query(
    "UPDATE users SET verified=TRUE WHERE id= $1",
    [member_id],
    (error, results) => {
      if (error) {
        throw error;
      }
      return cb();
    }
  );
};
