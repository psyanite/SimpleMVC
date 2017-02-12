using Microsoft.AspNet.Mvc.Rendering;
using System.Collections.Generic;

namespace littlevecolita.Models
{
    public class MovieGenreViewModel
    {
        public List<Movie> movies;
        public SelectList genres;
        public string movieGenre { get; set; }
    }
}
