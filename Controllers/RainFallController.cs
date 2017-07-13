using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Insight.Database;
using System.Data.SQLite;

namespace myblog.Controllers
{
    [Route("api/[controller]")]
    public class RainFallController : Controller
    {
        [HttpGet]
        public IList<RainFall> Get()
        {
			SQLiteConnection cn = new SQLiteConnection(ConnectionStrings.sqliteDB.ConnectionString);
            List<RainFall> rainFall = cn.QuerySql<RainFall>("select * from RainFall order by ID desc").ToList();

            // var userList = cn.QuerySql<AppUser>("SELECT * FROM Beer WHERE Name LIKE @Name", new { Name = "%ipa%" });
            // cn.ExecuteSql("INSERT INTO Beer VALUES (ID, Name)", someAppUser);
			// User getUser = cn.QuerySql<User>("SELECT * FROM Users WHERE userID = @userID", new { userID = 1 }).FirstOrDefault();
            // int count2 = database.Connection().ExecuteScalarSql<int>("SELECT COUNT(*) FROM Beer WHERE Name LIKE @Name", new { Name = "IPA" });

            return rainFall;
        }

        [HttpGet]
        [Route("GetRainFallByID")]
        public RainFall GetRainFallByID(long ID)
        {
            SQLiteConnection cn = new SQLiteConnection(ConnectionStrings.sqliteDB.ConnectionString);
            return cn.QuerySql<RainFall>("select * from RainFall where ID = @ID", new { ID = ID }).FirstOrDefault();
        }

        [HttpPost]
        [Route("InsertRainFall")]
        public int InsertRainFall([FromBody]RainFall obj)
        {
            SQLiteConnection cn = new SQLiteConnection(ConnectionStrings.sqliteDB.ConnectionString);
            return cn.ExecuteSql("insert into RainFall (RainFallDate, RainFallAmount) values (@RainFallDate, @RainFallAmount)",
                                 new { RainFallDate = obj.RainFallDate, RainFallAmount = obj.RainFallAmount });
        }

        public class RainFall
        {
            public long ID { get; set; }
            public string RainFallDate { get; set; }
            public float RainFallAmount { get; set; }
        }
    }
}
