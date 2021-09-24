import React, { Component } from "react";
import MainFeed from "../MainFeed";
import "./home.css";
import HomeTopBar from "../HomeTopBar";
import LeftMenu from "../LeftMenu";
import { fetchData } from "../../utils";
import RightMenu from "../RightMenu";

class Home extends Component {
  state = {
    feed: [],
    visibleForm: false,
    visibleContent: "posts",
    myGroups: [],
    isAdmin: false
  };

  getMyGroups = () => {
    fetchData("users/1/groups").then(data => {
      this.setState({ myGroups: data });
    });
  };

  toggleForm = () => {
    this.setState({ visibleForm: !this.state.visibleForm });
  };

  componentDidMount = () => {
    this.fetchUser();
    this.updateGroupsFeed();
    this.getMyGroups();
  };

  fetchUser = () => {
    fetchData("users/" + localStorage.getItem("userId")).then(users => {
      console.log("is Admin : " + users[0].is_admin);
      this.setState({
        isAdmin: users[0].is_admin
      });
    });
  };

  updateGroupsFeed = () => {
    fetchData("groups").then(data =>
      this.setState({
        feed: data,
        visibleContent: "groups",
        visibleForm: false
      })
    );
  };
  updatePostsFeed = () => {
    fetchData("posts").then(data =>
      this.setState({ feed: data, visibleContent: "posts", visibleForm: false })
    );
  };
  updateEventsFeed = () => {
    fetchData("events").then(data =>
      this.setState({
        feed: data,
        visibleContent: "events",
        visibleForm: false
      })
    );
  };

  updateJobOffersFeed = () => {
    fetchData("jobOffers").then(data =>
      this.setState({
        feed: data,
        visibleContent: "jobOffers",
        visibleForm: false
      })
    );
  };

  updateMembersFeed = () => {
    this.setState({ visibleContent: "members", visibleForm: false });
    fetchData("users").then(data => this.setState({ feed: data }));
  };

  updateRequestsFeed = () => {
    this.setState({ visibleContent: "requests", visibleForm: false });
    fetchData("users").then(data => this.setState({ feed: data }));
  };

  render() {
    return (
      <React.Fragment>
        <HomeTopBar redirectHome={this.props.redirectHome} />
        <div className="home-container">
          <LeftMenu
            fetchGroups={this.updateGroupsFeed}
            fetchPosts={this.updatePostsFeed}
            fetchEvents={this.updateEventsFeed}
            // fetchEvents={this.createEventsFeed}
            fetchJobOffers={this.updateJobOffersFeed}
            fetchMembers={this.updateMembersFeed}
            fetchRequests={this.updateRequestsFeed}
            visibleContent={this.state.visibleContent}
            userIsAdmin={this.state.isAdmin}
          />
          <MainFeed
            feed={this.state.feed}
            visibleContent={this.state.visibleContent}
            visibleForm={this.state.visibleForm}
            updateGroupsFeed={this.updateGroupsFeed}
            updatePostsFeed={this.updatePostsFeed}
            updateEventsFeed={this.updateEventsFeed}
            updateJobOffersFeed={this.updateJobOffersFeed}
            updateRequestsFeed={this.updateRequestsFeed}
            myGroups={this.state.myGroups}
            updateMyGroups={this.getMyGroups}
            userId={this.props.userId}
          />
          <RightMenu
            toggleForm={this.toggleForm}
            myGroups={this.state.myGroups}
            updateMyGroups={this.getMyGroups}
          />
        </div>
      </React.Fragment>
    );
  }
}

export default Home;
