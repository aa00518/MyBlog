using System;
using System.Data.SQLite;

namespace myblog.Controllers
{
    public static class ConnectionStrings
    {
        private static string sqliteFile = "db.db";
		public static SQLiteConnectionStringBuilder sqliteDB = new SQLiteConnectionStringBuilder() { DataSource = sqliteFile };
    }
}
//SQLiteConnection.CreateFile(_filename);
//_connection.ExecuteSql("CREATE TABLE Users (userID int, userFirstName varchar(400), userLastName varchar(400), userAge int)");
//cn.ExecuteSql("INSERT INTO Users (userID, userFirstName, userLastName, userAge) values (@userID, @userFirstName, @userLastName, @userAge)", userList[0]);
