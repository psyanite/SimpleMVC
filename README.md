# SimpleMVC
{{Work in Progress}}

{ASP.NET 5, MVC 6, EF 7, Gulp, Sass, Compass}

* Install VS2015 community edition
* Tools > Extensions and Updates > Product Updates
* Update SQL server, VS 2015 Update 2, ASP.NET Web Frameworks
* Open CMD in admin mode
* Type dnvm to check if it's installed
* cd to the folder \src\littlevecolita
* Run dnx ef migrations add Initial
* Run dnx ef database update
* Open Task Runner Explorer
* Run boot or build

## Brief
This was initially a project to explore ASP.NET 5, MVC 6, and EF 7 but eventually ended up being a one page application.

## Front-end
Several tasks have been implemented in 'gulpfile.js' to compile and minify the Sass and Javascript files. The 'boot' task compiles all the Sass, and Javascript files. The 'build' task is the same but additionally watches any Sass and rebuilds the CSS files accordingly if any changes are detected. All Sass files are compiled and minifed into '/wwwroot/css/custom.css' and '/wwwroot/css/custom.min.css'. Library CSS files and 'custom.css' are then concatenated and minified into 'main.css' and 'main.min.css'. Javascript Files are concatenated and minified into '/wwwroot/js/main.js' and '/wwwroot/js/main.min.js'.

The Sass files are located in 'wwwroot/sass' structured into five folders, 'abstracts', 'base', 'components', 'sections', and 'vendors' appropriately. So far the CSS changes are for '/Views/Neila/Index.cshtml' which uses the '/Views/Neila/_Layout.cshtml'.

## Build configurations
Two separate 'appsettings.json' files are utilized for environment specific logging and database connections. Further launch configurations can be configured on separate profiles in Launch Settings ('launchSettings.json'). The application starts up by running 'Startup.cs' with takes in these files into consideration.

## To do
* Update svg icon usages as per [this article](https://css-tricks.com/creating-svg-icon-system-react/)

## Helpful links
* [Sass guidelines](https://sass-guidelin.es/)
* [CSS declarations](http://maxdesign.com.au/jobs/sample-format/css-declaration.htm)
* [ASP.NET Launch Settings](https://www.exceptionnotfound.net/working-with-environments-and-launch-settings-in-asp-net-core/)

