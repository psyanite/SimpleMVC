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


## Front-end
I have written my own customised 'gulpfile.js' to add watch tasks and tasks to use compass to compile and minify my Sass files into 'main.css' and 'main.min.css'. The Sass files are located in /wwwroot/sass folder which are compiled and minified into the /wwwroot/css folder. The Sass files are structure to into 5 folders, 'abstracts', 'base', 'components', 'sections', and 'vendors' appropriately. The Sass files I have modified are for the page located in /Views/Neila/Index.cshtml which uses the /Views/Neila/_Layout.cshtml. I'd like to point out that the order of the styles in a Sass block is very important e.g. display, width, height, positioning properties should go first and fonts and colour properties should go last, this provides easily readable code and in HTML/CSS the majority of issues is caused by positioning. 

As the project grows, the structure of the Sass files and components will need to be reconsidered. Generally if you have the full design of the whole website it will be easier to design the Sass file structures and blocks to keep the code cleaner, more reusable and maintainable. 

For the datacom.co* websites (datacom.co.nz, datacom.com.au etc.) I assisted a designer from a print company with communication with the stakeholder to complete the cross-browser and device, fully responsive, easy to use design. After implementing the new design with Sass, Gulp, and Bootstrap, I would say the more interesting parts of the website would be the megamenu (when you hover over the menu items e.g. Services, Solutions etc.) and the contacts page. You can visit this site to see some HTML/CSS structures that I have created.

![Design](screenshots/yan-tsui-screenshot.png?raw=true "Design")

## Build configurations
There are two appsettings.json files, one for the dev environment and one for staging, where I can add environment specific logging and database connections. Additionally, in launchSettings.json, I have created different profiles for server specific properties ready to be configured to suit environment specific servers. The correct appsettings.json file will be taken during startup via the Startup.cs file. 

For the IDM project, we used Bamboo to configure different build and deployment projects specific to environments. These builds and deployment properties were saved in the code base as separate properties files in separate folders. 

