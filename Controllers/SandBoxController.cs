using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Insight.Database;
using System.Data.SQLite;

namespace myblog.Controllers
{
    [Route("api/[controller]")]
    public class SandBoxController : Controller
    {
        [HttpGet]
        public IList<AppUser> Get()
        {
			SQLiteConnection cn = new SQLiteConnection(ConnectionStrings.sqliteDB.ConnectionString);
            List<AppUser> appUsers = cn.QuerySql<AppUser>("select * from Users order by userID desc").ToList();

            //var userList = cn.QuerySql<AppUser>("SELECT * FROM Beer WHERE Name LIKE @Name", new { Name = "%ipa%" });
            //cn.ExecuteSql("INSERT INTO Beer VALUES (ID, Name)", someAppUser);
			//User getUser = cn.QuerySql<User>("SELECT * FROM Users WHERE userID = @userID", new { userID = 1 }).FirstOrDefault();

            return appUsers;
        }

        public class AppUser
        {
            public long userID { get; set; }
            public string userFirstName { get; set; }
            public string userLastName { get; set; }
            public int userAge { get; set; }
        }
    }
}
