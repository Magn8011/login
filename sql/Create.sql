--SQLite

--viser hvad at der skal vises data, hvordan det skal vises, hvilken orden og hvad dette data er, f.eks. er "name" "text"
DROP TABLE IF EXISTS User;
CREATE TABLE IF NOT EXISTS User (
  Id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
  Name TEXT,
  Password TEXT,
  Email TEXT,
  Admin BOOLEAN NOT NULL CHECK (Admin IN (0, 1)),
  Gold BOOLEAN NOT NULL CHECK (Gold IN (0, 1))
);
DROP TABLE IF EXISTS Announcement;
CREATE TABLE IF NOT EXISTS Announcement (
  Id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
  Title TEXT,
  Price TEXT,
  Category TEXT,
  Location TEXT,
  Image TEXT,
--tilføjer tid 
  Created DATETIME DEFAULT CURRENT_TIMESTAMP
  UserId INTEGER
);
--anigver follow-funktionen
DROP TABLE IF EXISTS Follow;
CREATE TABLE IF NOT EXISTS Follow (
  UserId INTEGER,
  AnnouncementId INTEGER
);
