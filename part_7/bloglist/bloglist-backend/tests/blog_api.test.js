const mongoose = require("mongoose");
const supertest = require("supertest");
const bcrypt = require("bcrypt");
const app = require("../app");
const Blog = require("../models/blog");
const User = require("../models/user");
const helper = require("./test_helper");
const { request } = require("../app");
const api = supertest(app);

let TOKEN = "";
beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(helper.manyBlogs);

  await User.deleteMany({});

  const passwordHash = await bcrypt.hash("test_password", 10);
  const new_user = new User({
    username: "test_username",
    passwordHash,
  });

  await new_user.save();

  const blogToDelete = {
    title: "Blog to delete",
    author: "riikkayoki",
    url: "no_url.html",
    likes: 1000000,
    user: new_user._id,
  };

  await Blog.insertMany(blogToDelete);

  const token = await api
    .post("/api/login")
    .send({ username: "test_username", password: "test_password" });

  TOKEN = token.body.token;
});

const blogs_in_db = helper.manyBlogs.length + 1;

describe("when there is initially some blogs saved", () => {
  test("blogs are returned as json", async () => {
    await api
      .get("/api/blogs")
      .set("Authorization", TOKEN)
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });
  test("all blogs are returned", async () => {
    const blogsInDb = await helper.blogsInDb();
    expect(blogsInDb).toHaveLength(blogs_in_db);
  });
  test("id is defined", async () => {
    const response = await api.get("/api/blogs");
    expect(response.body[0].id).toBeDefined();
  });
  test("new blog can be added", async () => {
    const users = await api.get("/api/users");

    const newBlog = {
      title: "New Blog",
      author: "riikkayoki",
      url: "no_url.html",
      likes: 3,
      user: users.body[0].id,
    };

    await api
      .post("/api/blogs")
      .set("Authorization", `bearer ${TOKEN}`)
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const blogsInDb = await helper.blogsInDb();
    expect(blogsInDb).toHaveLength(blogs_in_db + 1);
  });
  test("new blog has 0 likes if likes is not defined", async () => {
    const users = await api.get("/api/users");

    const blogNoLikes = {
      title: "test blog",
      author: "test_author",
      url: "nourl.html",
      user: users.body[0].id,
    };
    await api
      .post("/api/blogs")
      .set("Authorization", `bearer ${TOKEN}`)
      .send(blogNoLikes)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const blogsInDb = await helper.blogsInDb();
    expect(blogsInDb).toHaveLength(blogs_in_db + 1);
  });
  test("if new blog has no url, returns 400", async () => {
    const users = await api.get("/api/users");
    const blogNoUrl = {
      title: "no url title",
      author: "url author",
      likes: 3,
      user: users.body[0].id,
    };
    await api
      .post("/api/blogs")
      .set("Authorization", `bearer ${TOKEN}`)
      .send(blogNoUrl)
      .expect(400);
    const blogsInDb = await helper.blogsInDb();
    expect(blogsInDb).toHaveLength(blogs_in_db);
  });
  test("if new blog has no title, returns 400", async () => {
    const users = await api.get("/api/users");
    const blogNoTitle = {
      author: "nice author",
      url: "nice_url.html",
      likes: 3,
      user: users.body[0].id,
    };
    await api
      .post("/api/blogs")
      .set("Authorization", `bearer ${TOKEN}`)
      .send(blogNoTitle)
      .expect(400);
    const blogsInDb = await helper.blogsInDb();
    expect(blogsInDb).toHaveLength(blogs_in_db);
  });
  test("a specific blog can be deleted", async () => {
    const blogsAtStart = await helper.blogsInDb();
    const toBeDeleted = blogsAtStart[blogsAtStart.length - 1];

    await api
      .delete(`/api/blogs/${toBeDeleted.id}`)
      .set("Authorization", `bearer ${TOKEN}`)
      .expect(204);
    const blogsInDb = await helper.blogsInDb();
    expect(blogsInDb).toHaveLength(blogs_in_db - 1);
  });
  test("status code 401 is returned if user does not own the blog", async () => {
    const blogsAtStart = await helper.blogsInDb();
    const toBeDeleted = blogsAtStart[0];

    await api
      .delete(`/api/blogs/${toBeDeleted.id}`)
      .set("Authorization", `bearer ${TOKEN}`)
      .expect(401);
    const blogsInDb = await helper.blogsInDb();
    expect(blogsInDb).toHaveLength(blogs_in_db);
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
