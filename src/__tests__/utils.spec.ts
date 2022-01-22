import { getMatchesFromInput, getScoreAndTeam } from 'utils';
const input = `Lions 3, Snakes 3
Tarantulas 1, FC Awesome 0
Lions 1, FC Awesome 1
Tarantulas 3, Snakes 1
Lions 4, Grouches 0`;

describe('Utils', () => {
  describe('.getMatchesFromInput()', () => {
    it('should return all the matches in the text', () => {
      const matches = getMatchesFromInput(input);
      expect(matches).toHaveLength(5);
    });

    it('should separate the home and the away team', () => {
      const [match] = getMatchesFromInput(input);
      expect(match).toHaveProperty('home');
      expect(match).toHaveProperty('away');
    });

    it('should extract the correct name and score', () => {
      const [match] = getMatchesFromInput(input);
      expect(match.home.score).toBe(3);
      expect(match.home.teamName).toBe('Lions');
    });
  });
  describe('.getScoreAndTeam()', () => {
    it('should extract the score as a number', () => {
      const { score } = getScoreAndTeam('Lions 3');
      expect(score).toBe(3);
    });
    it('should extract the name of the team', () => {
      const { teamName } = getScoreAndTeam('Lions 3');
      expect(teamName).toBe('Lions');
    });
  });
});
