require('dotenv').config();

export default {
  baseURL: `http://localhost:${process.env.VUE_APP_PORT}/user`,
};
