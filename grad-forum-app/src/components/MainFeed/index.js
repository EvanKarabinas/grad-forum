import React, { Component } from "react";
import Post from "../Post";
import Group from "../Group";
import Member from "../Member";
import Event from "../Event";
import "./mainFeed.css";
import GroupFeedForm from "../GroupFeedForm";
import PostFeedForm from "../PostFeedForm";
import EventFeedForm from "../EventFeedForm";
import JobOffer from "../JobOffer";
import JobOfferFeedForm from "../JobOfferFeedForm";
import JoinRequest from "../JoinRequest";

class MainFeed extends Component {
  state = {
    feed: [],
    form: ""
  };

  showGroups() {
    return this.props.feed.map(group => (
      <Group
        key={group.id}
        groupId={group.id}
        name={group.name}
        description={group.description}
        creatorName={group.first_name + " " + group.last_name}
        date={group.created_at}
        myGroups={this.props.myGroups}
        updateMyGroups={this.props.updateMyGroups}
      />
    ));
  }

  showPosts() {
    return this.props.feed.map(post => (
      <Post
        key={post.id}
        postId={post.id}
        userId={this.props.userId}
        title={post.title}
        content={post.content}
        commentsCount={post.comments_count}
        creatorName={post.first_name + " " + post.last_name}
        date={post.created_at}
      />
    ));
  }
  showJobOffers() {
    return this.props.feed.map(jobOffer => (
      <JobOffer
        key={jobOffer.id}
        jobOfferId={jobOffer.id}
        title={jobOffer.title}
        description={jobOffer.description}
        type={jobOffer.type}
        commentsCount={jobOffer.comments_count}
        creatorName={jobOffer.first_name + " " + jobOffer.last_name}
        date={jobOffer.created_at}
      />
    ));
  }

  showEvents() {
    return this.props.feed.map(event => (
      <Event
        event={event}
        key={event.id}
        userId={this.props.userId}
        eventId={event.id}
        title={event.title}
        description={event.description}
        place={event.place}
        eventDate={event.event_date}
        creatorName={event.first_name + " " + event.last_name}
        date={event.created_at}
      />
    ));
  }
  showMembers() {
    return this.props.feed.map(member => {
      if (member.verified) {
        return (
          <Member
            key={member.id}
            firstName={member.first_name}
            lastName={member.last_name}
            email={member.email}
            profilePhoto={member.profile_photo}
            date={member.created_at}
          />
        );
      }
    });
  }

  showRequests() {
    //console.log("REQUESTS : ");
    return this.props.feed.map(member => {
      //console.log(member);
      if (!member.verified) {
        return (
          <JoinRequest
            key={member.id}
            memberId={member.id}
            firstName={member.first_name}
            lastName={member.last_name}
            email={member.email}
            profilePhoto={member.profile_photo}
            date={member.created_at}
            updateRequestsFeed={this.props.updateRequestsFeed}
          />
        );
      }
    });
  }

  render() {
    let form;
    let feed;
    let feedTitle;
    let feedClassName = "";

    if (this.props.visibleContent === "groups") {
      if (this.props.visibleForm) {
        form = (
          <GroupFeedForm
            updateGroupsFeed={this.props.updateGroupsFeed}
            updateMyGroups={this.props.updateMyGroups}
          />
        );
      }
      feed = this.showGroups();
      feedTitle = <h1>Ομάδες</h1>;
    } else if (this.props.visibleContent === "posts") {
      if (this.props.visibleForm)
        form = <PostFeedForm updatePostsFeed={this.props.updatePostsFeed} />;
      feed = this.showPosts();
      feedTitle = <h1>Αναρτήσεις</h1>;
    } else if (this.props.visibleContent === "members") {
      feedClassName = "main-feed-members";
      feed = this.showMembers();
      feedTitle = <h1>Μέλη</h1>;
    } else if (this.props.visibleContent === "events") {
      if (this.props.visibleForm)
        form = <EventFeedForm updateEventsFeed={this.props.updateEventsFeed} />;
      feed = this.showEvents();
      feedTitle = <h1>Εκδηλώσεις</h1>;
    } else if (this.props.visibleContent === "jobOffers") {
      if (this.props.visibleForm)
        form = (
          <JobOfferFeedForm
            updateJobOffersFeed={this.props.updateJobOffersFeed}
          />
        );
      feed = this.showJobOffers();
      feedTitle = <h1>Αγγελίες</h1>;
    } else if (this.props.visibleContent === "requests") {
      feedClassName = "main-feed-members";
      feed = this.showRequests();
      feedTitle = <h1>Αιτήματα</h1>;
    }
    return (
      <div className="main-feed">
        {feedTitle}
        {form}
        <div className={feedClassName}>{feed}</div>
      </div>
    );
  }
}

export default MainFeed;
