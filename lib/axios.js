"use client";

import Axios from "axios";

export const baseBackUrl = process.env.NEXT_PUBLIC_API_URL;

export const axios = Axios.create({
  baseURL: baseBackUrl,
  headers: {
    "X-Requested-With": "XMLHttpRequest",
  },
  withCredentials: true,
  withXSRFToken: true,
});


