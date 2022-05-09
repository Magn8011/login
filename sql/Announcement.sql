DROP TABLE IF EXISTS Announcement;
CREATE TABLE IF NOT EXISTS Announcement (
  Id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
  Title TEXT,
  Price TEXT,
  Category TEXT,
  Location TEXT,
  Image TEXT,
  Created DATETIME DEFAULT CURRENT_TIMESTAMP,
  UserId INTEGER
);
--herunder ses tilfældig data, med de angivede parabler
insert into Announcement (Id, Title, Price, Category, Location, Image, Created, UserId) values (1, 'Another Nine & a Half Weeks (Love in Paris) (9 1/2 Weeks II) (Another 9 1/2 Weeks)', 722, 'Drama', null, 'http://dummyimage.com/110x100.png/5fa2dd/ffffff', '2022-02-23 15:55:20', 1);
insert into Announcement (Id, Title, Price, Category, Location, Image, Created, UserId) values (2, 'Drunks', 927, 'Drama', '164 40', 'http://dummyimage.com/213x100.png/cc0000/ffffff', '2021-12-10 16:26:31', 5);
insert into Announcement (Id, Title, Price, Category, Location, Image, Created, UserId) values (3, 'Love That Boy', 559, 'Comedy', '5903', 'http://dummyimage.com/157x100.png/ff4444/ffffff', '2021-05-17 13:14:52', 6);
insert into Announcement (Id, Title, Price, Category, Location, Image, Created, UserId) values (4, 'Pathetic Fallacy (Ajantrik)', 831, 'Drama', '367-0251', 'http://dummyimage.com/248x100.png/ff4444/ffffff', '2021-07-16 15:26:34', 7);
insert into Announcement (Id, Title, Price, Category, Location, Image, Created, UserId) values (5, 'Craig''s Wife', 993, 'Drama', null, 'http://dummyimage.com/137x100.png/cc0000/ffffff', '2022-04-06 10:03:05', 8);
insert into Announcement (Id, Title, Price, Category, Location, Image, Created, UserId) values (6, 'We Are Legion: The Story of the Hacktivists', 997, 'Documentary', '89110', 'http://dummyimage.com/150x100.png/dddddd/000000', '2021-06-11 14:51:58', 8);
insert into Announcement (Id, Title, Price, Category, Location, Image, Created, UserId) values (7, 'Hobbit: An Unexpected Journey, The', 189, 'Adventure', null, 'http://dummyimage.com/144x100.png/5fa2dd/ffffff', '2022-01-31 19:54:00', 4);
insert into Announcement (Id, Title, Price, Category, Location, Image, Created, UserId) values (8, 'Nim''s Island', 571, 'Adventure', null, 'http://dummyimage.com/104x100.png/ff4444/ffffff', '2022-04-11 18:29:50', 3);
insert into Announcement (Id, Title, Price, Category, Location, Image, Created, UserId) values (9, 'Guide for the Married Man, A', 906, 'Comedy', '45700-000', 'http://dummyimage.com/228x100.png/cc0000/ffffff', '2021-07-06 02:17:41', 4);
insert into Announcement (Id, Title, Price, Category, Location, Image, Created, UserId) values (10, 'Congo', 104, 'Action', null, 'http://dummyimage.com/125x100.png/5fa2dd/ffffff', '2022-05-15 12:31:50', 1);
insert into Announcement (Id, Title, Price, Category, Location, Image, Created, UserId) values (11, 'Rudolph the Red-Nosed Reindeer', 303, 'Animation', null, 'http://dummyimage.com/238x100.png/5fa2dd/ffffff', '2022-01-25 15:03:42', 1);
insert into Announcement (Id, Title, Price, Category, Location, Image, Created, UserId) values (12, 'Voodoo Tiger', 730, 'Adventure', '167032', 'http://dummyimage.com/244x100.png/5fa2dd/ffffff', '2021-05-12 06:32:09', 8);
insert into Announcement (Id, Title, Price, Category, Location, Image, Created, UserId) values (13, 'Lahore', 932, 'Action', null, 'http://dummyimage.com/228x100.png/dddddd/000000', '2021-08-03 22:54:09', 4);
insert into Announcement (Id, Title, Price, Category, Location, Image, Created, UserId) values (14, 'Under the Domim Tree (Etz Hadomim Tafus)', 586, 'Drama', '301767', 'http://dummyimage.com/227x100.png/5fa2dd/ffffff', '2022-02-22 21:22:37', 9);
insert into Announcement (Id, Title, Price, Category, Location, Image, Created, UserId) values (15, 'Atomic Twister', 938, 'Action', '84913 CEDEX 9', 'http://dummyimage.com/127x100.png/ff4444/ffffff', '2022-01-15 07:16:06', 4);
insert into Announcement (Id, Title, Price, Category, Location, Image, Created, UserId) values (16, 'Chinese Zodiac (Armour of God III) (CZ12)', 805, 'Action', null, 'http://dummyimage.com/200x100.png/ff4444/ffffff', '2022-04-02 15:20:53', 10);
insert into Announcement (Id, Title, Price, Category, Location, Image, Created, UserId) values (17, 'Lara Croft: Tomb Raider', 706, 'Action', '4405', 'http://dummyimage.com/165x100.png/5fa2dd/ffffff', '2022-05-24 13:15:46', 6);
insert into Announcement (Id, Title, Price, Category, Location, Image, Created, UserId) values (18, 'Adventures of Mark Twain, The', 263, 'Adventure', '432 93', 'http://dummyimage.com/249x100.png/5fa2dd/ffffff', '2021-11-24 23:17:25', 3);
insert into Announcement (Id, Title, Price, Category, Location, Image, Created, UserId) values (19, 'Pet, The', 705, 'Drama', null, 'http://dummyimage.com/227x100.png/cc0000/ffffff', '2021-07-27 17:46:42', 1);
insert into Announcement (Id, Title, Price, Category, Location, Image, Created, UserId) values (20, 'Come See the Paradise', 586, 'Drama', null, 'http://dummyimage.com/247x100.png/cc0000/ffffff', '2022-04-13 00:05:20', 4);
insert into Announcement (Id, Title, Price, Category, Location, Image, Created, UserId) values (21, 'Pollyanna', 587, 'Children', '10030', 'http://dummyimage.com/152x100.png/ff4444/ffffff', '2022-05-04 03:28:29', 4);
insert into Announcement (Id, Title, Price, Category, Location, Image, Created, UserId) values (22, 'Key of Life (Kagi-dorobô no mesoddo)', 836, 'Comedy', '29190-000', 'http://dummyimage.com/243x100.png/5fa2dd/ffffff', '2021-11-05 12:49:59', 4);
insert into Announcement (Id, Title, Price, Category, Location, Image, Created, UserId) values (23, 'Memphis Belle', 501, 'Action', null, 'http://dummyimage.com/232x100.png/ff4444/ffffff', '2022-04-22 20:15:53', 7);
insert into Announcement (Id, Title, Price, Category, Location, Image, Created, UserId) values (24, 'Honey, We Shrunk Ourselves', 907, 'Action', '632851', 'http://dummyimage.com/168x100.png/cc0000/ffffff', '2021-06-05 11:21:25', 9);
insert into Announcement (Id, Title, Price, Category, Location, Image, Created, UserId) values (25, 'Jet Lag (Décalage horaire)', 734, 'Comedy', '2530-700', 'http://dummyimage.com/239x100.png/cc0000/ffffff', '2021-06-06 13:38:04', 1);
insert into Announcement (Id, Title, Price, Category, Location, Image, Created, UserId) values (26, 'Creature Comforts', 411, 'Animation', '4023', 'http://dummyimage.com/101x100.png/ff4444/ffffff', '2022-05-12 09:22:49', 6);
insert into Announcement (Id, Title, Price, Category, Location, Image, Created, UserId) values (27, 'Maxed Out: Hard Times, Easy Credit and the Era of Predatory Lenders', 532, 'Documentary', null, 'http://dummyimage.com/227x100.png/dddddd/000000', '2021-07-30 15:53:24', 10);
insert into Announcement (Id, Title, Price, Category, Location, Image, Created, UserId) values (28, 'Al Capone', 193, 'Crime', '3332', 'http://dummyimage.com/110x100.png/5fa2dd/ffffff', '2021-11-13 11:50:42', 10);
insert into Announcement (Id, Title, Price, Category, Location, Image, Created, UserId) values (29, 'Disorganized Crime', 327, 'Action', '38-300', 'http://dummyimage.com/178x100.png/cc0000/ffffff', '2022-04-17 06:39:16', 3);
insert into Announcement (Id, Title, Price, Category, Location, Image, Created, UserId) values (30, 'God''s Comedy (A Comédia de Deus)', 592, 'Comedy', null, 'http://dummyimage.com/158x100.png/5fa2dd/ffffff', '2022-04-13 10:42:37', 10);
