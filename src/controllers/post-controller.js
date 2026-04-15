const { StatusCodes } = require("http-status-codes");

const { PostService } = require("../services");

const { SuccessResponse, ErrorResponse } = require("../utils/common");

// POST : /api/v1/airplanes
// req-body {modelNumber:'airbus20',capacity:320}
console.log("This is Post service" + PostService);

async function createPost(req, res) {
  try {
    console.log("Inside the controller");
    const airplane = await PostService.createPost({
      // modelNumber: req.body.modelNumber,
      // capacity: req.body.capacity,
      title: req.body.title,
      content: req.body.content,
      author: req.body.author,
    });
    SuccessResponse.data = airplane;
    return res.status(StatusCodes.CREATED).json(SuccessResponse);
  } catch (error) {
    console.log("This is Controller Error:", error);

    // Set ErrorResponse structure
    ErrorResponse.error = {
      name: error.errorname || "InternalServerError", // Fallback if not an AppError
      explanation: error.explanation || error.message, // Fallback to raw error message
      statusCode: error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR, // Default to 500 if missing
    };

    return res.status(ErrorResponse.error.statusCode).json(ErrorResponse);
  }
}
// GET : /api/v1/posts

// async function getPosts(req, res) {
//   try {
//     const posts = await PostService.getPosts();
//     SuccessResponse.data = posts;
//     return res.status(StatusCodes.OK).json(SuccessResponse);
//   } catch (error) {
//     console.log(
//       "This is controller error for getting all the airplane" + error
//     );
//     ErrorResponse.error = error;
//     return res.status(error.statusCode).json(ErrorResponse);
//   }
// }
// // GET : /api/v1/posts/:id
// // This is for deleting the Airplane
// async function destroyPost(req, res) {
//   try {
//     const posts = await PostService.destroyPost(req.params.id);
//     SuccessResponse.data = posts;
//     return res.status(StatusCodes.OK).json(SuccessResponse);
//   } catch (error) {
//     console.log("This is controller error for deleting a airplane" + error);
//     ErrorResponse.error = error;
//     return res.status(error.statusCode).json(ErrorResponse);
//   }
// }
// // PUT : /api/v1/posts/:id
// async function updatePost(req, res) {
//   try {
//     const post = await PostService.updatePost(req.params.id, {
//       title: req.body.title,
//       content: req.body.content,
//       author: req.body.author,
//     });

//     SuccessResponse.data = post;
//     return res.status(StatusCodes.OK).json(SuccessResponse);
//   } catch (error) {
//     console.log("This is controller error for updating a post:", error);

//     // Properly set the error structure
//     ErrorResponse.error = {
//       name: error.errorname || "InternalServerError",
//       explanation: error.explanation || error.message,
//       statusCode: error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
//     };

//     return res.status(ErrorResponse.error.statusCode).json(ErrorResponse);
//   }
// }

module.exports = {
  createPost,
//   getPosts,
//   destroyPost,
//   updatePost,
};