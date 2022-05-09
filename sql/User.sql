DROP TABLE IF EXISTS User;
CREATE TABLE IF NOT EXISTS User (
  Id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
  Name TEXT,
  Password TEXT,
  Email TEXT,
  Admin BOOLEAN NOT NULL CHECK (Admin IN (0, 1)),
  Gold BOOLEAN NOT NULL CHECK (Gold IN (0, 1))
);

insert into User (Id, Name, Email, Password, Admin, Gold) values (1, 'Breanne O''Growgane', 'bogrowgane0@wordpress.org', 'fHHZIf', true, false);
insert into User (Id, Name, Email, Password, Admin, Gold) values (2, 'Sascha Flux', 'sflux1@accuweather.com', '7fvTenQ', false, true);
insert into User (Id, Name, Email, Password, Admin, Gold) values (3, 'Doti Cafferty', 'dcafferty2@github.com', 'waHxsu', false, false);
insert into User (Id, Name, Email, Password, Admin, Gold) values (4, 'Merrie De Vries', 'mde3@businesswire.com', 'tWJ2jRtXd', true, true);
insert into User (Id, Name, Email, Password, Admin, Gold) values (5, 'Berke Hurcombe', 'bhurcombe4@sun.com', 'vBaMkobMW', true, true);
insert into User (Id, Name, Email, Password, Admin, Gold) values (6, 'Constantino Klimmek', 'cklimmek5@de.vu', 'Em77wTQR4', false, true);
insert into User (Id, Name, Email, Password, Admin, Gold) values (7, 'Jeni Bixley', 'jbixley6@examiner.com', 'eIQTOf3VKf', true, false);
insert into User (Id, Name, Email, Password, Admin, Gold) values (8, 'Gianni Croutear', 'gcroutear7@java.com', 'r6uVJJQo9uw0', false, true);
insert into User (Id, Name, Email, Password, Admin, Gold) values (9, 'Wadsworth Ebhardt', 'webhardt8@mashable.com', 'QyMbsm', true, true);
insert into User (Id, Name, Email, Password, Admin, Gold) values (10, 'Noak Battey', 'nbattey9@qq.com', 'p7adq0ShwxB', false, true);
