import React from "react";
import "../styles/main.css";
import "../styles/dashboard.css";

import DashLink from "../components/DashLink";
import PetModule from "../components/pet/PetModule";
import { useAuth } from "../auth/useAuth";

const Dashboard = () => {
  const { isLoading } = useAuth();
  return isLoading ? null : (
    <div className="page page-dashboard flex-center-column">
      <div className="content-wrapper flex-center-column">
        <div className="pet-wrapper">
          <PetModule />
        </div>

        <DashLink title="Today's Mood" page="/daymood/new" classN="new" />
        <DashLink title="Mood Stats" page="/stats" classN="stats" />
        <DashLink title="Mood Buddies" page="/contacts" classN="contacts" />
      </div>
    </div>
  );
};

export default Dashboard;
