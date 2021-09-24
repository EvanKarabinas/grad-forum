import User from "../models/user";
import Group from "../models/group";
import Socket from "../models/socket";

exports.users_list = (req, res) =>
  User.all(results => {
    console.log(results);
    res.send(results);
  });

exports.user_info = (req, res) => {
  var id = req.params.id;

  User.info(id, results => {
    console.log("User with id : [" + id + "] fetched successfully.");
    console.log(results);
    res.send(results);
  });
};

exports.authUser = (req, res) => {
  var username = req.body.username;
  var password = req.body.password;
  console.log("username: " + username + "password: " + password);
  User.loginUser(username, password, results => {
    //res.send(results);
    if (results.length == 1) {
      if (results[0].verified) {
        var userInfo = results[0];
        req.session.userId = userInfo.id;

        req.session.save();
        res.send("Log in successful.");
      } else {
        console.log("Login in error : Your account was not verified yet.");
        res
          .status(400)
          .send(
            "Σφάλμα σύνδεσης: Ο λογαριασμός σας δεν έχει επιβεβαιωθεί ακόμα απο τον διαχειριστή."
          );
      }
    } else {
      console.log("Login in error : Wrong username or password");
      res
        .status(400)
        .send(
          "Σφάλμα σύνδεσης: Το όνομα χρήστη ή ο κωδκός πρόσβασης είναι λάθος."
        );
    }
  });
};

exports.createUser = (req, res) => {
  var username = req.body.username;
  var password = req.body.password;
  var email = req.body.email;
  var first_name = req.body.first_name;
  var last_name = req.body.last_name;
  var profile_photo = req.file.filename;
  console.log(
    username,
    password,
    email,
    first_name,
    last_name,
    profile_photo.filename
  );
  if (username && password && email && first_name && last_name) {
    if (
      User.findUser(username, results => {
        if (results.length == 0) {
          User.create(
            username,
            password,
            email,
            first_name,
            last_name,
            profile_photo
          );

          res.redirect("/api");
        } else {
          res.redirect("/api/error");
        }
      })
    );
  } else {
    res.redirect("/api/error");
  }
};

exports.updateUser = (req, res) => {
  var id = req.params.id;
  var firstName = req.body.first_name;
  var lastName = req.body.last_name;
  var email = req.body.email;
  var old_password = req.body.old_password;
  var new_password = req.body.new_password;
  var profile_photo;

  User.info(id, users => {
    if (!req.file) {
      profile_photo = users[0].profile_photo;
    } else {
      profile_photo = req.file.filename;
    }
    console.log("USERRRRSSSSSSSSSSS");
    console.log(users);
    console.log("id " + id);
    console.log("firstName " + firstName);
    console.log("lastName " + lastName);
    console.log("email " + email);
    console.log("new_password " + new_password);
    console.log("old_password " + old_password);

    if (firstName === "" || lastName === "" || email === "") {
      return res.sendStatus(400);
    }

    if (users[0].password === old_password && new_password !== "") {
      User.updateUserAndPassword(
        id,
        firstName,
        lastName,
        email,
        new_password,
        profile_photo,
        () => {
          console.log(
            "Updated USER and PASSWORD with id: " + id + " successfully."
          );
          res.send(
            "Updated USER and PASSWORD with id: " + id + " successfully."
          );
        }
      );
    } else if (old_password === "" && new_password === "") {
      User.updateUserWithoutPassword(
        id,
        firstName,
        lastName,
        email,
        profile_photo,
        () => {
          console.log(
            "Updated USER without PASSWORD with id: " + id + " successfully."
          );
          res.send(
            "Updated USER without PASSWORD with id: " + id + " successfully."
          );
        }
      );
    } else {
      res.sendStatus(400);
    }
  });
};

exports.getUserGroups = (req, res) => {
  Group.findGroupsByUser(req.session.userId, results => {
    res.send(results);
  });
};

exports.logOutUser = (req, res) => {
  // Socket.delete(req.session.socketId, () => {
  //   console.log("Socket with id: " + req.session.socketId + " deleted.");
  //   req.session.destroy();
  //   console.log("Session destroyed.");
  //   res.send("Logout successfull");
  // });

  req.session.destroy();
  console.log("Session destroyed.");
  res.send("Logout successfull");
};

exports.verifyUser = (req, res) => {
  var member_id = req.params.id;
  User.verify(member_id, () => {
    console.log("Verified user: " + member_id + " successfully.");
    res.send("Verified user: " + member_id + " successfully.");
  });
};
