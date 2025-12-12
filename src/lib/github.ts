// src/lib/github.ts
import { graphql } from "@octokit/graphql";

export interface ContributionDay {
  contributionCount: number;
  date: string;
  weekday: number; // 0 = Sunday
  color: string;   // GitHub color hex
}

export interface ContributionWeek {
  contributionDays: ContributionDay[];
}

export interface UserContributionData {
  totalContributions: number;
  weeks: ContributionWeek[];
}

const GRAPHQL_QUERY = `
  query($username: String!, $from: DateTime!, $to: DateTime!) {
    user(login: $username) {
      contributionsCollection(from: $from, to: $to) {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              contributionCount
              date
              weekday
              color 
            }
          }
        }
      }
    }
  }
`;

export async function fetchContributions(username: string, year: number): Promise<UserContributionData | null> {
  const token = process.env.GITHUB_TOKEN;

  if (!token) {
    throw new Error("Missing GITHUB_TOKEN in .env.local");
  }

  const from = `${year}-01-01T00:00:00Z`;
  const to = `${year}-12-31T23:59:59Z`;

  try {
    const response: any = await graphql(GRAPHQL_QUERY, {
      username,
      from,
      to,
      headers: {
        authorization: `token ${token}`,
      },
    });

    const user = response.user;
    
    if (!user) {
      console.error("User not found");
      return null;
    }

    return user.contributionsCollection.contributionCalendar;

  } catch (error) {
    console.error("Error fetching GitHub data:", error);
    return null;
  }
}