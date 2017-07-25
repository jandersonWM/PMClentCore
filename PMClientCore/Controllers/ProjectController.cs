using Microsoft.AspNetCore.Mvc;

namespace PMClient.Controllers
{
    public class ProjectController : Controller
    {
        // GET: /<controller>/
        public IActionResult Summary()
        {
            return View();
        }

        public IActionResult Add()
        {
            return View();
        }

        public IActionResult Error()
        {
            return View();
        }
    }
}
