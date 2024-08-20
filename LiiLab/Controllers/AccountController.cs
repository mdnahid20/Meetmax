using LiiLab.Models;
using LiiLab.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Reflection;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication;
using System.Security.Claims;

namespace LiiLab.Controllers
{
    public class AccountController : Controller
    {
        public readonly ApplicationDbContext _context;

        public AccountController(ApplicationDbContext context)
        {
            _context = context;
        }
        public IActionResult Index()
        {
            return View();
        }

        [HttpPost("{Controller}/Index")]
        public async Task<IActionResult> Index([FromBody] User user)
        {
            var foundUser = await _context.User.FirstOrDefaultAsync(u => u.Email == user.Email);

            if (foundUser != null)
            {
                if (user.Password == foundUser.Password)
                {
                    var claims = new List<Claim>
                       {
                         new Claim(ClaimTypes.Email, foundUser.Email),
                         new Claim(ClaimTypes.Role, "User")
                       };


                    var claimsIdentity = new ClaimsIdentity(claims, CookieAuthenticationDefaults.AuthenticationScheme);
                    await HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme,
                                                   new ClaimsPrincipal(claimsIdentity));

                    return Json(new { success = true, redirectUrl = Url.Action("Index", "Home") });
                }
                else
                {
                    return Json(new { success = false, message = "Invalid Password." });
                }
            }
            else
            {
                return Json(new { success = false, message = "Invalid email." });
            }
        }
        public IActionResult SignUp()
        {
            return View();
        }

        [HttpPost("{Controller}/SignUp")]
        public async Task<IActionResult> SignUp([FromBody] User user)
        {
            if (ModelState.IsValid)
            {
                var foundUser = await _context.User.FirstOrDefaultAsync(u => u.Email == user.Email);

                if (foundUser != null)
                    return Json(new { success = false, message = "Email is already used." });

                _context.User.Add(user);
                await _context.SaveChangesAsync();
                return Json(new { success = true, redirectUrl = Url.Action("Index", "Account") });
            }

            return Json(new { success = false, message = "Field is required" });
        }

        public async Task<IActionResult> Logout()
        {
            await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
            return RedirectToAction("Index", "Account");
        }
        public IActionResult ForgotPassword()
        {
            return View();
        }

        [HttpPost("{Controller}/ForgotPassword")]
        public async Task<IActionResult> ForgotPassword([FromBody] User user)
        {
            var foundUser = await _context.User.FirstOrDefaultAsync(u => u.Email == user.Email);

            if (foundUser != null)
                return Json(new { success = true, message = $"Your passwword is : {foundUser.Password}" });
            else
                return Json(new { success = false, message = "There is no user" });
        }
    }
}
