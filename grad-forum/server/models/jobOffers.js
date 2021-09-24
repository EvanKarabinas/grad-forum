import pool from "../db";

exports.all = cb => {
  pool.query(
    "SELECT jobs_offers.id, jobs_offers.title, jobs_offers.description,jobs_offers.type,jobs_offers.comments_count, jobs_offers.creator_id,jobs_offers.created_at,users.first_name, users.last_name FROM jobs_offers INNER JOIN users ON jobs_offers.creator_id = users.id ORDER BY created_at DESC",
    (error, results) => {
      if (error) {
        throw error;
      }
      return cb(results.rows);
    }
  );
};

exports.info = (id, cb) => {
  pool.query(
    "SELECT * FROM jobs_offers WHERE id= $1",
    [id],
    (error, results) => {
      if (error) {
        throw error;
      }
      return cb(results.rows);
    }
  );
};

exports.create = (creator_id, title, description, type, cb) => {
  pool.query(
    "INSERT INTO jobs_offers (creator_id, title, description, type, created_at, updated_at) VALUES ($1,$2,$3,$4,NOW(),NOW())",
    [creator_id, title, description, type],
    (error, results) => {
      if (error) {
        throw error;
      }
      return cb();
    }
  );
};

exports.createComment = (creator_id, job_offer_id, content, cb) => {
  pool.query(
    "INSERT INTO jobs_offers_comments (user_id, job_offer_id, content, created_at, updated_at) VALUES ($1,$2,$3,NOW(),NOW())",
    [creator_id, job_offer_id, content],
    (error, results) => {
      if (error) {
        throw error;
      }
      return cb();
    }
  );
};

exports.updateCommentsCount = (job_offer_id, cb) => {
  pool.query(
    " UPDATE jobs_offers SET comments_count=comments_count+1,created_at=created_at, updated_at=NOW() WHERE id=$1",
    [job_offer_id],
    (error, results) => {
      if (error) {
        throw error;
      }
      return cb();
    }
  );
};

exports.getComments = (job_offer_id, cb) => {
  pool.query(
    "SELECT * FROM jobs_offers_comments WHERE job_offer_id=$1",
    [job_offer_id],
    (error, results) => {
      if (error) {
        throw error;
      }
      return cb(results.rows);
    }
  );
};
