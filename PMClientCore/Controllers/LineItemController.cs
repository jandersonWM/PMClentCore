using Microsoft.AspNetCore.Mvc;

namespace PMClientCore.Controllers
{
    public class LineItemController : Controller
    {
        public IActionResult Summary(int? id)
        {
            if (id != null)
            {
                ViewBag.ProjectId = id;
            }
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