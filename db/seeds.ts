import db from "db"

/*
 * This seed function is executed when you run `blitz db seed`.
 *
 * Probably you want to use a library like https://chancejs.com
 * or https://github.com/Marak/Faker.js to easily generate
 * realistic data.
 */
const seed = async () => {
  return await db.user.create({
    data: {
      email: "test@seed.com",
      post: {
        create: [
          { title: "My seeded title", content: "some Content" },
          { title: "Another bold title", content: "most interesting content" },
        ],
      },
    },
  })
  // await db.post.create({
  //   data: {
  //     title: "Project " + i,
  //     content: "Some content " + i,
  //     user: "administrator",
  //   },
  // })
}

export default seed
