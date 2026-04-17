const { PostRepository } = require("../repository");
const { StatusCodes } = require("http-status-codes");
const postRepository = new PostRepository();
const AppError = require("../utils/errors/app-error");

async function createPost(data) {
  try {
    console.log("Inside the service");
    console.log(data);
    const post = await postRepository.create(data);
    return post;
  } catch (error) {
    console.log("This is Service Error:", error);

    // Handle Mongoose ValidationError
    if (error.name === "ValidationError") {
      const explanation = Object.values(error.errors).map((err) => err.message);
      throw new AppError(
        explanation,
        "ValidationError",
        StatusCodes.BAD_REQUEST
      );
    }

    throw new AppError(
      "Cannot create a new post object",
      "InternalServerError",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}
async function getPosts() {
  try {
    // console.log("This is inside the getpost data");
    const posts = await postRepository.getAll();
    return posts;
  } catch (error) {
    throw new AppError(
      "Cannot get data of all posts",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}
async function destroyPost(id) {
  try {
    const airplanes = await postRepository.destroy(id);
    return airplanes;
  } catch (error) {
    if (error.statusCode === StatusCodes.NOT_FOUND) {
      throw new AppError(
        "The post you requested to delete is not present",
        error.statusCode
      );
    }
    throw new AppError(
      "Cannot delete the airplanes",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}
async function updatePost(id, data) {
  try {
    const updatedPost = await postRepository.update(id, data);
    return updatedPost;
  } catch (error) {
    console.log("This is Service Error in update:", error);

    // Handle Mongoose ValidationError
    if (error.name === "ValidationError") {
      const explanation = Object.values(error.errors).map((err) => err.message);
      throw new AppError(
        explanation,
        "ValidationError",
        StatusCodes.BAD_REQUEST
      );
    }

    throw new AppError(
      "Cannot update the post",
      "InternalServerError",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}
module.exports = {
  createPost,
  getPosts,
  destroyPost,
  updatePost,
};