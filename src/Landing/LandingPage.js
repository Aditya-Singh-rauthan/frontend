import { useSelector } from "react-redux";
import Loading from "../Error/Loading";
import LandingHeader from "./LandingHeader";
import "./LandingPage.css";
import Quote from "./Quote";

export default function LandingPage() {
  const auth = useSelector(state=>state.user)
  if(auth.loading){
    return <Loading/>
  }
  return (
    <div className="landingPage">
      <LandingHeader />
      <Quote/>
    </div>
  );
}
