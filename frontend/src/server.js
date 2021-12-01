require('dotenv').config();

const PORT = process.env.VUE_APP_PORT || 3000;

export default {
  baseURL: `http://localhost:${PORT}/user`,
};
