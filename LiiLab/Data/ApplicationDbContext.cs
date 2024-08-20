using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using LiiLab.Models;


namespace LiiLab.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<LiiLab.Models.User> User { get; set; }
        public DbSet<LiiLab.Models.Post> Post { get; set; }
        public DbSet<LiiLab.Models.Like> Like { get; set; }
        public DbSet<LiiLab.Models.Comment> Comment { get; set; }
    }
}
