import pool from "../db";

exports.all = cb => {
  pool.query(
    "SELECT groups.id, groups.name, groups.description, groups.creator_id,groups.created_at,users.first_name, users.last_name FROM groups INNER JOIN users ON groups.creator_id = users.id ORDER BY created_at DESC",
    (error, results) => {
      if (error) {
        throw error;
      }
      return cb(results.rows);
    }
  );
};

exports.info = (id, cb) => {
  pool.query("SELECT * FROM groups WHERE id= $1", [id], (error, results) => {
    if (error) {
      throw error;
    }
    return cb(results.rows);
  });
};

exports.create = (creator_id, name, description, cb) => {
  pool.query(
    "INSERT INTO groups (creator_id, name, description, created_at, updated_at) VALUES ($1,$2,$3,NOW(),NOW())",
    [creator_id, name, description],
    (error, results) => {
      if (error) {
        throw error;
      }
      return cb();
    }
  );
};

exports.findGroup = (name, cb) => {
  console.log("name: " + name);
  pool.query(
    "SELECT * FROM groups WHERE name= $1",
    [name],
    (error, results) => {
      if (error) {
        throw error;
      }
      return cb(results.rows);
    }
  );
};

exports.addGroupMember = (user_id, group_id, cb) => {
  pool.query(
    "INSERT INTO group_memberships (user_id, group_id,created_at) VALUES ($1,$2,NOW())",
    [user_id, group_id],
    (error, results) => {
      if (error) {
        throw error;
      }
      return cb();
    }
  );
};

exports.deleteGroupMember = (user_id, group_id, cb) => {
  pool.query(
    "DELETE FROM group_memberships WHERE user_id=$1 AND group_id=$2",
    [user_id, group_id],
    (error, results) => {
      if (error) {
        throw error;
      }
      return cb();
    }
  );
};

exports.findMembers = (group_id, cb) => {
  pool.query(
    "SELECT * FROM group_memberships WHERE group_id= $1",
    [group_id],
    (error, results) => {
      if (error) {
        throw error;
      }
      return cb(results.rows);
    }
  );
};

exports.getMessages = (group_id, cb) => {
  pool.query(
    "SELECT * FROM groups_messages WHERE group_id= $1",
    [group_id],
    (error, results) => {
      if (error) {
        throw error;
      }
      return cb(results.rows);
    }
  );
};

exports.messageInfo = (group_id, message_id, cb) => {
  pool.query(
    "SELECT * FROM groups_messages WHERE id= $1 AND group_id=$2",
    [message_id, group_id],
    (error, results) => {
      if (error) {
        throw error;
      }
      return cb(results.rows);
    }
  );
};

exports.createMessage = (creator_id, group_id, content, cb) => {
  pool.query(
    "INSERT INTO groups_messages (creator_id, group_id, content, created_at) VALUES ($1,$2,$3,NOW())",
    [creator_id, group_id, content],
    (error, results) => {
      if (error) {
        throw error;
      }
      console.log(
        "CREATED MESSAGE... GROUP: " +
          group_id +
          " CREATOR: " +
          creator_id +
          " CONTENT: " +
          content
      );
      return cb();
    }
  );
};

exports.findGroupsByUser = (user_id, cb) => {
  pool.query(
    "SELECT group_memberships.group_id, groups.name,groups.description FROM group_memberships INNER JOIN groups ON group_memberships.group_id=groups.id  WHERE  user_id=$1",
    [user_id],
    (error, results) => {
      if (error) {
        throw error;
      }
      return cb(results.rows);
    }
  );
};
