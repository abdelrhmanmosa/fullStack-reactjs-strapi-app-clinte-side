// import axios from "axios";

// export const axiosInstant = axios.create({
//   baseURL: "http://localhost:1337",
// });


// const apiUrl = "https://fullstack-reactjs-strapi-app-ael0.onrender.com/admin/"; // استبدل 'https://your-strapi-app.render.com' بعنوان Strapi المنشور
import axios from "axios";

const axiosInstant = axios.create({
  baseURL: "https://fullstack-reactjs-strapi-app-ael0.onrender.com/admin/",
});

export default axiosInstant;
