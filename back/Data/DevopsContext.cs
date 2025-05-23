using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Devops.Models;

namespace Devops.Data
{
    public class DevopsContext : DbContext
    {
        public DevopsContext (DbContextOptions<DevopsContext> options)
            : base(options)
        {
        }

        public DbSet<Devops.Models.ToDo> ToDo { get; set; } = default!;
    }
}
