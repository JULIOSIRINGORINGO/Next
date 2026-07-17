import { NextResponse } from 'next/server'

const GITHUB_GRAPHQL_URL = 'https://api.github.com/graphql'

const CONTRIBUTIONS_QUERY = `
query($username: String!) {
  user(login: $username) {
    contributionsCollection {
      totalCommitContributions
      totalPullRequestContributions
      totalIssueContributions
      totalRepositoryContributions
      contributionCalendar {
        totalContributions
        weeks {
          contributionDays {
            date
            contributionCount
            contributionLevel
          }
        }
      }
    }
    repositories(first: 100, ownerAffiliations: OWNER, orderBy: {field: STARGAZERS, direction: DESC}) {
      totalCount
      nodes {
        name
        stargazerCount
        primaryLanguage {
          name
          color
        }
      }
    }
    followers {
      totalCount
    }
    following {
      totalCount
    }
  }
}
`

export async function GET() {
  const token = process.env.GITHUB_TOKEN
  const username = process.env.GITHUB_USERNAME

  if (!token || !username) {
    return NextResponse.json({ error: 'GitHub credentials not configured' }, { status: 500 })
  }

  try {
    const response = await fetch(GITHUB_GRAPHQL_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query: CONTRIBUTIONS_QUERY, variables: { username } }),
      next: { revalidate: 3600 },
    })

    if (!response.ok) {
      return NextResponse.json({ error: 'Failed to fetch GitHub data' }, { status: 502 })
    }

    const data = await response.json()

    if (data.errors) {
      return NextResponse.json({ error: data.errors[0]?.message || 'GitHub API error' }, { status: 502 })
    }

    const userData = data.data?.user
    if (!userData) {
      return NextResponse.json({ error: 'GitHub user not found' }, { status: 404 })
    }

    const contrib = userData.contributionsCollection
    const calendar = contrib.contributionCalendar

    const weeks = calendar.weeks.map((week: any) =>
      week.contributionDays.map((day: any) => {
        const levelMap: Record<string, number> = { NONE: 0, FIRST_QUARTILE: 1, SECOND_QUARTILE: 2, THIRD_QUARTILE: 3, FOURTH_QUARTILE: 4 }
        return {
          date: day.date,
          count: day.contributionCount,
          level: levelMap[day.contributionLevel] || 0,
        }
      })
    )

    const langCounts: Record<string, { name: string; color: string; count: number }> = {}
    for (const repo of userData.repositories.nodes) {
      const lang = repo.primaryLanguage
      if (lang) {
        if (!langCounts[lang.name]) {
          langCounts[lang.name] = { name: lang.name, color: lang.color || '#888', count: 0 }
        }
        langCounts[lang.name].count++
      }
    }

    const topLanguages = Object.values(langCounts)
      .sort((a, b) => b.count - a.count)
      .slice(0, 6)

    return NextResponse.json({
      total_contributions: calendar.totalContributions,
      total_commits: contrib.totalCommitContributions,
      total_prs: contrib.totalPullRequestContributions,
      total_issues: contrib.totalIssueContributions,
      total_repos: userData.repositories.totalCount,
      followers: userData.followers.totalCount,
      following: userData.following.totalCount,
      weeks,
      top_languages: topLanguages,
      username,
    })
  } catch {
    return NextResponse.json({ error: 'Failed to fetch GitHub data' }, { status: 502 })
  }
}
