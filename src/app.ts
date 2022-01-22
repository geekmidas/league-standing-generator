import { stdin as input, stdout as output } from 'process';
import fs from 'fs';
import path from 'path';
import * as readline from 'readline';
import { getMatchesFromInput } from './utils';
import { createLeagueStandings } from './league';

const lineReader = readline.createInterface({ input, output });

lineReader.question('Please enter the path for your matches file: ', (answer) => {
  const filePath = path.resolve(answer);
  console.log({ filePath });
  const content = fs.readFileSync(filePath).toString();
  const matches = getMatchesFromInput(content);
  const standings = createLeagueStandings(matches);
  standings.forEach(({ points, teamName }, idx) => {
    const position = idx + 1;
    console.log(`${position}. ${teamName}, ${points} pts`);
  });
  lineReader.close();
});
