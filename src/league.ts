export enum MatchPoints {
  /**
   *
   */
  Win = 3,
  /**
   *
   */
  Draw = 1,
  /**
   *
   */
  Lose = 0,
}

export class LeagueStanding {
  /**
   * A record of all the points allocated to the team in the league
   */
  private teamPoints: TeamPoints;
  constructor(teamPoints: TeamPoints) {
    this.teamPoints = teamPoints;
  }
  /**
   * Adds the supplied points to the total of the team
   *
   * @param teamName - The name of the team
   * @param points - The amount of points that should be added for the team
   */
  addPoints(teamName: string, points: MatchPoints): void {
    const currentPoints = this.teamPoints[teamName] || 0;
    this.teamPoints[teamName] = currentPoints + points;
  }
  /**
   * Adds a team to the standing if it wasn't already
   *
   * @param teamName - The name of the team
   */
  addTeam(teamName: string): void {
    const team = this.teamPoints[teamName];
    if (team === undefined) {
      this.teamPoints[teamName] = 0;
    }
  }
  /**
   * Retrieves the number of points allocated to a team
   *
   * @param teamName - The name of the team
   * @returns
   */
  getTeamPoints(teamName: string): number {
    return this.teamPoints[teamName];
  }
  /**
   * Uses the current records of the teams to generate their position in the league
   * standing.
   *
   * @returns
   */
  getStandings(): Standing[] {
    const keys = Object.keys(this.teamPoints);
    const teams = keys.map<Standing>((teamName) => {
      const points = this.teamPoints[teamName];
      return { points, teamName };
    });

    return teams.sort((a, b) => b.points - a.points);
  }
}
/**
 *
 * @param match
 * @returns
 */
export function getWinner(match: Match): string {
  const home = match.home.teamName;
  const away = match.away.teamName;

  const homeScore = match.home.score;
  const awayScore = match.away.score;

  const isHomeWinner = homeScore > awayScore;

  return isHomeWinner ? home : away;
}
/**
 * Creates the the leagues standing table from the matches
 *
 * @param matches - The matches played in the league
 * @returns
 */
export function createLeagueStandings(matches: Match[]) {
  const leagueStanding = new LeagueStanding({});

  matches.forEach((match) => {
    const { away, home } = match;
    leagueStanding.addTeam(away.teamName);
    leagueStanding.addTeam(home.teamName);
    const isDraw = away.score === home.score;
    if (isDraw) {
      leagueStanding.addPoints(home.teamName, MatchPoints.Draw);
      leagueStanding.addPoints(away.teamName, MatchPoints.Draw);
      return;
    }

    const winner = getWinner(match);
    leagueStanding.addPoints(winner, MatchPoints.Win);
  });

  return leagueStanding.getStandings();
}

export interface MatchScore {
  /**
   * The number of points score by the team in the match
   */
  score: number;
  /**
   * The name of the team in a match
   */
  teamName: string;
}

export interface Match {
  /**
   * The match score for the home team
   */
  home: MatchScore;
  /**
   * The match score for the away team
   */
  away: MatchScore;
}

export interface Standing {
  /**
   *
   */
  points: number;
  /**
   *
   */
  teamName: string;
}

export type TeamPoints = Record<string, number>;
