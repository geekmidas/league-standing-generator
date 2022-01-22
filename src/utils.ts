import { Match } from 'league';

/**
 * Retrieves the score and the name from the supplied text
 *
 * @param teamSide - text input with format `TeamName Score` where
 * `Score` is a number
 * @returns
 */
export function getScoreAndTeam(teamSide: string) {
  const parts = teamSide.split(/\s/);
  const last = parts.pop() as string;
  const score = parseInt(last, 10);
  const teamName = parts.join(' ').trim();

  return {
    score,
    teamName,
  };
}
/**
 * Retrieves the matches in the text and coverts them into a list of `[Match]`
 * Objects
 *
 * @param text - The representation of the matches of format
 * `TeamA ScoreA, TeamB ScoreB` separated by a new line
 * @returns
 */
export function getMatchesFromInput(text: string): Match[] {
  const matches = text.split('\n');
  return matches.map((match) => {
    const [home, away] = match.split(',');
    const result = {
      home: getScoreAndTeam(home),
      away: getScoreAndTeam(away),
    };

    return result;
  });
}
