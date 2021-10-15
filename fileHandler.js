import fs from "fs";

export const readFromDatabase = () => {
  return JSON.parse(fs.readFileSync("database.json", "utf-8"));
};

export const writeToDatabase = (data) => {
  fs.writeFileSync("database.json", JSON.stringify(data, null, 2));
};
