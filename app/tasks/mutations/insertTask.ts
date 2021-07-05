import db from "db"

type insertTaskInput = {
  label: string
}

export default async function insertTask(input: insertTaskInput) {
  await db.task.create({
    data: { label: input.label },
  })
}
