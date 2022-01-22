import { LeagueStanding, MatchPoints } from 'league';

describe('new LeagueStanding()', () => {
  describe('addPoints()', () => {
    it("should default points to zero when team wasn't part of the league", () => {
      const leagueStanding = new LeagueStanding({});
      const team = 'TestTeam';
      leagueStanding.addPoints(team, MatchPoints.Win);
      const points = leagueStanding.getTeamPoints(team);
      expect(points).toBe(MatchPoints.Win);
    });
    it('should add supplied points to existing points', () => {
      const team = 'TestTeam';
      const leagueStanding = new LeagueStanding({
        [team]: 5,
      });
      leagueStanding.addPoints(team, MatchPoints.Win);
      const points = leagueStanding.getTeamPoints(team);
      expect(points).toBe(8);
    });
  });

  describe('addTeam()', () => {
    it('should default the points to zero when a new team is added', () => {
      const team = 'TestTeam';
      const leagueStanding = new LeagueStanding({});
      leagueStanding.addTeam(team);
      const points = leagueStanding.getTeamPoints(team);
      expect(points).toBe(0);
    });
  });

  describe('getTeamPoints()', () => {
    it('should return undefined when team is not part of the league', () => {
      const team = 'TestTeam';
      const leagueStanding = new LeagueStanding({});
      const points = leagueStanding.getTeamPoints(team);
      expect(points).toBeUndefined();
    });
    it('should return the allocated points when team is part of the league', () => {
      const team = 'TestTeam';
      const leagueStanding = new LeagueStanding({ [team]: 5 });
      const points = leagueStanding.getTeamPoints(team);
      expect(points).toBe(5);
    });
  });

  describe('getStandings()', () => {
    it('should order the teams in descending order of their points', () => {
      const leagueStanding = new LeagueStanding({
        TeamA: 5,
        TeamB: 10,
        TeamC: 3,
      });

      const standings = leagueStanding.getStandings();
      const standingsCopy = [...standings];
      standingsCopy.sort((a, b) => b.points - a.points);
      expect(standings).toEqual(standingsCopy);
    });
  });
});
