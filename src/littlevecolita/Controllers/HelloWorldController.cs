using Microsoft.AspNet.Mvc;
using Microsoft.Extensions.WebEncoders;

namespace littlevecolita.Controllers
{
    public class HelloWorldController : Controller
    {

        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Welcome(string name, int numTimes = 1)
        {
            ViewData["Message"] = "Hello " + name;
            ViewData["NumTimes"] = numTimes;

            return View();
        }
    }
}
