import React, { useContext } from "react";
import { GlobalContext } from "../context/globalContext";

export default function Home() {
  const { user } = useContext(GlobalContext);
  console.log(user);
  return <div>Home</div>;
}
