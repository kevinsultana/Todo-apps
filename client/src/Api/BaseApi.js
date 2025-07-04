import React from "react";
import axios from "axios";

export const BaseApi = axios.create({
  // baseURL: "http://localhost:3001", //local host
  baseURL: "https://deeply-marmalade-viscount.glitch.me", //glitch
});
