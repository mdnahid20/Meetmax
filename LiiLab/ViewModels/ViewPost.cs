using LiiLab.Models;

namespace LiiLab.ViewModels
{
    public class ViewPost
    {
        public int PostId { get; set; }
        public int UserId { get; set; }
        public string UserName { get; set; } 
        public string Content { get; set; }
        public List<Comment> Comment { get; set; } = new List<Comment>();
        public int Likes { get; set; } = 0;
    }
}
