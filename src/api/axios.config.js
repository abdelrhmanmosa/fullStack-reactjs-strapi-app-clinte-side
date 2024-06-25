// import axios from "axios";

// export const axiosInstant = axios.create({
//   baseURL: "http://localhost:1337",
// });

import axios from "axios";

const apiUrl = "https://fullstack-reactjs-strapi-app-ael0.onrender.com/admin/"; // استبدل 'https://your-strapi-app.render.com' بعنوان Strapi المنشور

const axiosInstance = axios.create({
  baseURL: apiUrl,
});

export default axiosInstance;
