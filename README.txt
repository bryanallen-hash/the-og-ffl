THE OG FFL WEBSITE — TEST BUILD

What this is
------------
A completely static website generated from the validated 1996–2025 league data.
No database, server code, login, or paid hosting is required for this version.

How to test on your computer
----------------------------
1. Unzip the folder.
2. Double-click index.html.
3. Navigate through the pages normally.

The site is designed to work directly from the folder without running a local web server.

How to test online later
------------------------
Upload this folder/ZIP to a static host such as Vercel. A free Vercel URL can be used before purchasing a domain.

Temporary branding
------------------
The current site name is "THE OG FFL". It can be renamed before launch.

Included interactive sections
-----------------------------
Home dashboard
Owners + owner profiles + season history + H2H
Seasons + standings
All games
Player career leaderboards + player season profiles
35,178 starter player-game performances
Playoffs + Fantasy Bowl history
League and single-season record book

Data counts in this build
-------------------------
ownerCareer: 22
ownerSeasons: 358
ownerH2H: 186
ownerStreaks: 22
championships: 30
seasonSummary: 30
standings: 358
games: 2513
playerCareer: 1366
playerSeasons: 6119
playerGames: 35178
playoffPlayerGames: 1960
fantasyBowlPlayerGames: 420
highestScores: 50
lowestScores: 50
largestWins: 50
closestGames: 50
combinedScores: 50
highestLosing: 50
seasonPF: 25
seasonPPG: 25
seasonWinPct: 25
seasonWins: 25
seasonPD: 25
seasonAllPlay: 25


2026-09-05 correction:
Merged Google Sheets S.Smith / S.Smith Sr. into Steve Smith Sr. (P01367). Steve Smith (NYG) remains separate.


2026-09-08 comprehensive 2015–2016 identity audit
--------------------------------------------------
This build replaces the earlier one-off player fixes with a broader Google Sheets bridge cleanup.

Confirmed cross-era aliases merged include:
Steve Smith Sr., Julio Jones, John Brown, Calvin Johnson, DeSean Jackson,
Delanie Walker, DeAngelo Williams, Demaryius Thomas, Ezekiel Elliott,
Eddie Lacy, Hunter Henry, Jamaal Charles, James Jones, Malcom Floyd,
Michael Floyd, Russell Wilson, Rishard Matthews, Steven Hauschka,
Sterling Shepard, Ty Montgomery, Terrance Williams, Torrey Smith,
Tyrell Williams, and Chris Hogan.

Incorrect automatic matches split:
K.Williams (2015 RB) -> Karlos Williams
D.Brown (2016 TE) -> Daniel Brown

Display cleanup:
Chad Johnson and Chad Ochocinco remain one identity and display as
"Chad Johnson (Ochocinco)".
Additional abbreviated 2015–2016 Google-only names were expanded to readable full names.

Current player data counts:
playerCareer: 1366
playerSeasons: 6119
playerGames: 35178
playoffPlayerGames: 1960
fantasyBowlPlayerGames: 420

See DATA_CORRECTIONS_2026-09-08.csv for the correction log.
