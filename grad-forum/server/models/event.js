import pool from "../db";
exports.all = cb => {
  pool.query(
    "SELECT events.id, events.title, events.description, events.place, events.event_date at time zone 'utc' at time zone 'europe/athens' as event_date , events.creator_id,events.created_at,users.first_name, users.last_name FROM events INNER JOIN users ON events.creator_id = users.id WHERE events.event_date >=NOW() order by event_date asc",
    (error, results) => {
      if (error) {
        throw error;
      }
      return cb(results.rows);
    }
  );
};

exports.info = (id, cb) => {
  pool.query("SELECT * FROM events WHERE id= $1", [id], (error, results) => {
    if (error) {
      throw error;
    }
    return cb(results.rows);
  });
};

exports.create = (creator_id, title, description, place, event_date, cb) => {
  pool.query(
    "INSERT INTO events (creator_id, title, description,place, event_date, created_at, updated_at) VALUES ($1,$2,$3,$4,$5,NOW(),NOW())",
    [creator_id, title, description, place, event_date],
    (error, results) => {
      if (error) {
        throw error;
      }
      return cb();
    }
  );
};

exports.findEvent = (title, cb) => {
  console.log("title: " + title);
  pool.query(
    "SELECT * FROM events WHERE title= $1",
    [title],
    (error, results) => {
      if (error) {
        throw error;
      }
      return cb(results.rows);
    }
  );
};

exports.addEventAttendee = (user_id, event_id, cb) => {
  pool.query(
    "INSERT INTO events_attendances (user_id, event_id,created_at) VALUES ($1,$2,NOW())",
    [user_id, event_id],
    (error, results) => {
      if (error) {
        throw error;
      }
      return cb();
    }
  );
};

exports.deleteEventAttendee = (user_id, event_id, cb) => {
  pool.query(
    "DELETE FROM events_attendances WHERE user_id=$1 AND event_id=$2",
    [user_id, event_id],
    (error, results) => {
      if (error) {
        throw error;
      }
      return cb();
    }
  );
};

exports.findAttendees = (event_id, cb) => {
  pool.query(
    "SELECT * FROM events_attendances WHERE event_id= $1",
    [event_id],
    (error, results) => {
      if (error) {
        throw error;
      }
      return cb(results.rows);
    }
  );
};

exports.createComment = (creator_id, event_id, content, cb) => {
  pool.query(
    "INSERT INTO events_comments (user_id, event_id, content, created_at, updated_at) VALUES ($1,$2,$3,NOW(),NOW())",
    [creator_id, event_id, content],
    (error, results) => {
      if (error) {
        throw error;
      }
      return cb();
    }
  );
};

exports.updateCommentsCount = (event_id, cb) => {
  pool.query(
    " UPDATE events SET comments_count=comments_count+1,created_at=created_at, updated_at=NOW() WHERE id=$1",
    [event_id],
    (error, results) => {
      if (error) {
        throw error;
      }
      return cb();
    }
  );
};

exports.getComments = (event_id, cb) => {
  pool.query(
    "SELECT * FROM events_comments WHERE event_id=$1",
    [event_id],
    (error, results) => {
      if (error) {
        throw error;
      }
      return cb(results.rows);
    }
  );
};
