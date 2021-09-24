import JobOffer from "../models/jobOffers";
import Notification from "../models/notification";
import User from "../models/user";
import io from "../utils/socketUtil";

exports.allJobOffers = (req, res) =>
  JobOffer.all(results => {
    res.send(results);
  });

exports.jobOfferInfo = (req, res) => {
  var jobOfferId = req.params.id;
  console.log(jobOfferId);
  JobOffer.info(jobOfferId, results => {
    res.send(results);
  });
};

exports.createJobOffer = (req, res) => {
  var creator_id = req.session.userId;
  var title = req.body.title;
  var description = req.body.description;
  var type = req.body.type;
  JobOffer.create(creator_id, title, description, type, () => {
    console.log("Job offer created succesfully");
    User.all(users => {
      let user;
      for (user of users) {
        if (user.id != creator_id) {
          Notification.create(creator_id, user.id, "jobOffer", title, () => {
            console.log("Notification created successfully.");
          });
        }
      }
    });
    io.sendNotificationToAll(creator_id);
    res.send("Job offer created succesfully");
  });
};

exports.createjobOfferComment = (req, res) => {
  var creator_id = req.session.userId;
  var jobOffer_id = req.params.id;
  var content = req.body.content;
  JobOffer.createComment(creator_id, jobOffer_id, content, () => {
    JobOffer.updateCommentsCount(jobOffer_id, () => {
      JobOffer.info(jobOffer_id, jobOffers => {
        if (creator_id != jobOffers[0].creator_id) {
          Notification.create(
            creator_id,
            jobOffers[0].creator_id,
            "jobOffer-comment",
            jobOffers[0].title,
            () => {
              console.log("Notification created successfully.");
            }
          );
          io.sendNotificationToUser(creator_id, jobOffers[0].creator_id);
        }
      });
      res.send("Comment created successfully.");
    });
  });
};

exports.getJobOfferComments = (req, res) => {
  var jobOffer_id = req.params.id;
  JobOffer.getComments(jobOffer_id, results => {
    res.send(results);
  });
};
