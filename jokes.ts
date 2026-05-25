import fs from "fs/promises";
import oneLinerJoke from "one-liner-joke";
import "dotenv/config"

const writingJokesFile = async (): Promise<void> => {
  try {
    type JokeItem = {
      body: string;
      tags: string[];
    };
    const listJokes: string[] = [];
    const numJokes = parseInt(process.env.JOKE_AMOUNT || "50", 10);
    const allJokesByCategory = oneLinerJoke.getAllJokesWithTag(
      process.env.JOKE_SUBJECT,
    );
    if (allJokesByCategory.length < numJokes) {
      if (allJokesByCategory.length === 0) {
        throw new Error("This category was not found.");
      }
      throw new Error(
        `There are not ${numJokes} jokes from the selected category.`,
      );
    }
    const jokes = allJokesByCategory.slice(0, numJokes);
    jokes.forEach((joke: JokeItem) => {
      listJokes.push(joke.body);
    });
    await fs.writeFile("jokes.txt", listJokes.join("\n\n"), "utf8");
  } catch (error) {
    console.error(error);
  }
};

writingJokesFile();
