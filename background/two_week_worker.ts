import axios from "axios";
import { review_checker } from "../client/src/pages/DashboardPage/background/review_checker";

const two_week_worker = async () => {
  review_checker();
};

two_week_worker();
