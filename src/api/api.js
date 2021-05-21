import Axios from "axios";

const instance = Axios.create({
  baseURL: `https://jsonplaceholder.typicode.com/`,
  withCredentials: true,
});

export const postAPI = {
  getPosts() {
    return instance.get(`posts`).then((Response) => {
      return Response.data.slice(0, 10);
    });
  },
};
