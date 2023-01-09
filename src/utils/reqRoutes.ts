export const reqRoutes = () => {
  if (process.env.NODE_ENV === "development") {
    return "http://localhost:5000";
  } else {
    return "";
  }
};
