using LiiLab.Data;
using LiiLab.Models;
using LiiLab.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Diagnostics;
using System.Security.Claims;

namespace LiiLab.Controllers
{
    [Authorize]
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        public readonly ApplicationDbContext _context;

        public HomeController(ILogger<HomeController> logger, ApplicationDbContext context)
        {
            _logger = logger;
            _context = context;
        }

        public IActionResult Index()
        {
            return View();
        }

        [HttpPost("{Controller}/WritePost")]
        public async Task<IActionResult> WritePost(string post)
        {
            if (post == null)
                return Json(new { success = false });

            try
            {
                var userEmail = User.FindFirstValue(ClaimTypes.Email);
                var user = await _context.User.FirstOrDefaultAsync(u => u.Email == userEmail);

                if (user == null)
                    return Json(new { success = false });

                Post posts = new Post();
                ViewPost viewPost = new ViewPost();

                viewPost.UserId = posts.UserId = user.Id;
                viewPost.Content = posts.Content = post;
                viewPost.UserName = posts.UserName = user.Name;
                _context.Post.Add(posts);
                await _context.SaveChangesAsync();


                viewPost.PostId = posts.Id;
                return Json(new { success = true, post = viewPost });
            }
            catch (Exception)
            {
                return Json(new { success = false });
            }

        }

        [HttpGet("{Controller}/GetPostList")]
        public async Task<IActionResult> PostList()
        {
            var posts = await _context.Post.ToListAsync();
            var comment = await _context.Comment.ToListAsync();
            var likes = await _context.Like.ToListAsync();

            likes = likes.OrderBy(u => u.PostId).ToList();
            comment = comment.OrderBy(u => u.PostId).ToList();

            var user = await _context.User.ToListAsync();


            int likesCount = likes.Count();
            int commentCount = comment.Count();
            int i = 0,j = 0;

            List<ViewPost> postList = new List<ViewPost>();

            foreach (var post in posts)
            {
                ViewPost viewPost = new ViewPost();
                viewPost.PostId = post.Id;
                viewPost.Content = post.Content;
                viewPost.Likes = 0;
                List<Comment> comments = new List<Comment>();   

                var users = user.FirstOrDefault(u => u.Id == post.UserId);

                if (users != null)
                {
                    viewPost.UserName = users.Name;
                    viewPost.UserId = post.UserId;
                }

                while (i < likesCount && likes[i].PostId < post.Id)
                    ++i;

                while (i < likesCount && likes[i].PostId == post.Id)
                {
                    ++viewPost.Likes;
                    ++i;
                }

                while (j < commentCount && comment[j].PostId < post.Id)
                    ++j;

                while (j < commentCount && comment[j].PostId == post.Id)
                {
                    viewPost.Comment.Add(comment[j]);
                    ++j;
                }    
                postList.Add(viewPost);
            }
            return Json(new { success = true, list = postList });
        }

        [HttpPost("{Controller}/UpdateLike")]
        public async Task<IActionResult> UpdateLike(int postId)
        {
            var userEmail = User.FindFirstValue(ClaimTypes.Email);
            var user = await _context.User.FirstOrDefaultAsync(u => u.Email == userEmail);
            var posts = await _context.Post.FirstOrDefaultAsync(u => u.Id == postId);
            var likes = await _context.Like.FirstOrDefaultAsync(u => u.UserId == user.Id && u.PostId == postId);

            if (posts != null)
            {
                if(likes != null)
                    _context.Like.Remove(likes);
                else
                {
                    Like like = new Like();
                    like.UserId = user.Id;
                    like.PostId = postId;
                    _context.Like.Add(like);
                }
                await _context.SaveChangesAsync();
                return Json(new { success = true });
            }

            return Json(new { success = false});
        }

        [HttpGet("{Controller}/GetLikeNumber")]
        public async Task<IActionResult> GetLikeNumber(int postId)
        {
            var like = await _context.Like.Where(u => u.PostId == postId).CountAsync();
            return Json(new { success = true,like = like });
        }

        [HttpPost("{Controller}/PostComment")]
        public async Task<IActionResult> PostComment(int postId,string content)
        {
            var userEmail = User.FindFirstValue(ClaimTypes.Email);
            var user = await _context.User.FirstOrDefaultAsync(u => u.Email == userEmail);

            Comment comments = new Comment();
            comments.PostId = postId;
            comments.UserName = user.Name;
            comments.Content = content;
            comments.UserId = user.Id;
            _context.Comment.Add(comments);
            await _context.SaveChangesAsync();
            return Json(new { success = true,comment = comments});
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
