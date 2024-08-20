namespace LiiLab.Models
{
    public class Comment
    {
        public int Id { get; set; }
        public int PostId { get; set; }
        public int UserId { get; set; } 
        public string Content { get; set; }
        public string UserName { get; set; }
    }
}
