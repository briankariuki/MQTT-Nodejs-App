import React, { Component } from "react";
import DashboardBanner from "../components/DashboardBanner";
import PublishMessage from "../components/PublishMessage";
import ShowMessages from "../components/ShowMessages";
class Dashboard extends Component {
  componentDidMount() {
    document.title = "Dashboard | Polar WebApp";
  }
  render() {
    return (
      <div>
        <div className="max-w-screen-xl lg:w-4/5 w-9/10 mx-auto mt-4 mb-20">
          <div className="lg:w-3/5 mx-auto">
            <DashboardBanner />
            <div className="mt-10">
              <PublishMessage />
            </div>
            <div className="mt-10">
              <ShowMessages />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
