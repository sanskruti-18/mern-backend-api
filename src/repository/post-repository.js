const { CrudRepository } = require("./crud-repository.js");
const { Post } = require("../models/post.js");

class PostRepository extends CrudRepository {
  constructor() {
    super(Post);
  }
}

module.exports = PostRepository;