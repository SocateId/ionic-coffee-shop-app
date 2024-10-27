# Project Information: #
## How to Run - ##
Use `ionic serve` to start the application on a local web server and see it working, and chrome developer tools to mimic the dimensions of a phone.

## Key Features - ##
The application uses a JSON file kept locally at `\ionic-coffee-shop-app\src\assets\drinks-data.json`. This JSON file contains dummy data on the respective drinks that the application retrieves to use in populating the application UI and handling the application logic.

The application consist of a Drinks menu tab, grouped by the drinks type (tea, coffee), and a Cart tab. From the Drinks menu tab, the user can tap/click on a drink to go to its respective Orders page, where the user can select the size of the drink and see its updated cost; users will be able to go back to the Drinks menu tab, or to add the selected drink with the specified size to the Cart. 

And from the Cart tab, they can see what drinks they've added, the drink size, and the quantity of the same drinks and size. Also showcasing the drink standalone price for the size specified, the total price of the drink multiplied by its quantity, and the total combined price of the bill. Additionally, users have the options to add to the quantity of the ordered drinks, or deduct and subsequently remove them from the cart.

# Additional Questions Answers: #
1. **Menu Extensibility:**
	- **New Drinks:** How would you design the app to easily add new coffee and tea types without modifying existing code?
		- I've designed the app and JSON file so that all you need to do to add a new drink is edit the JSON file titled "drinks-data.json". Where service "Drinks" retrieves a local JSON file, for dummy data and testing, and converts it into an array of objects. These array of objects is then used by the respective pages and components for displaying the information contained in the array.
		- So all that would need to do to add a new drink is edit the local JSON file. Or if in a deployed environment, the database or whatever data-management system the API uses to retrieve the data from (given the JSON file object is structured the same). 
		- As such, you can add a new drink by adding the following object structure to the local test JSON file ...
		```
		"index-number" {
			"id": number,
			"name": string,
			"categories": string,
			"sizes": [{"size-name": number}],
			"image": "string-image-url"
		}
		```
		- To clarify, "index-number" refers to the index of the drink in the JSON file (e.g. 0, 1, 2, etc), and "string-image-url" specifies the image source. 
		- For sizes, it accepts an array of objects structured in the format `{"size-name": number}`. Where "size-name" acts as the Key and refers to the name of the size (e.g. tall, grande, etc), and the Value "number" is the price of the related size as a type number.
		- An example of a new drink added to the JSON file is shown below ...
		```
		"5":{
			"id":5,
			"name":"Milk Tea",
			"categories": "tea",
			"sizes": [
				{"tall":3.45},
				{"grande":4.25},
				{"venti":4.45}
			],
			"image":"https://images.pexels.com/photos/4071422/pexels-photo-4071422.jpeg?auto=compress&cs=tinysrgb&w=300"
		}
		```
	- **New Sizes:** Explain how you would implement a mechanism to introduce new drink sizes without affecting the current structure.
		- I've designed the application so that the sizes information of the drink is contained within the JSON file retrieved, allowing for dynamically set options for the drink sizes. So the only thing that needs to be done in order to introduce a new drink size, would be editing the source information, the JSON file or database/data-management system used by API in deployed environment. 
		- For testing, you can edit the JSON file to introduce new drink sizes. Where each drink object contains a "sizes" attribute, for the sizes the respective drink is available in. It is a an array of objects structured like so `{"size-name": number}`. With the key "size-name" being the string name of the size, and the "number" value being the respective price of the drink in that size.
		- For example `{"enormous": 12.00}` could be added to the drink object named "Hot Tea", which would then look like so ...
		```
		"4":{
			"id":4,
			"name":"Hot Tea",
			"categories": "tea",
			"sizes": [
				{"grande":1.95},
				{"enormous": 12.00}	\\ New size added here.
			],
			"image":"https://images.pexels.com/photos/1638280/pexels-photo-1638280.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
		}
		```
2. **Drink Customization:**
	- **Hot/Cold Options:** Describe how you would modify the model to allow users to choose between hot and cold versions of drinks.
		- I would add a new attribute to the drink object, an array of objects containing the temperature and the name of the temperature option. Which would look like ...
		```
		"temperatures": [
			{"temperatureName":"hot"},
			{"temperatureName":"cold"},
		],
		```
		- The "Drink" service would pass the respective drink object information to the Orders page, which would then have it as an additional optional choice for the user. 
		- An example of what the JSON data of the drink object that would be sent would look like is as such ...
		```
		"0":{
			"id":0,
			"name":"Espresso",
			"categories": "coffee",
			"sizes": [
				{"tall":1.95},
				{"grande":2.05},
				{"venti":2.35}
			],
			// Added Temperature as a attribute for Drink.
			"temperatures": [
				{"temperatureName":"hot"},
				{"temperatureName":"cold"},
			],
			"image":"https://images.pexels.com/photos/302901/pexels-photo-302901.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
		}
		```
		- In addition, this format allows for additional temperatures to be added (e.g. warm, without ice, etc), if the need arises.
	- **Condiments:** (Optional) Discuss how you would implement a feature to allow customers to add condiments (e.g., pearls, grass jelly) to their drinks.
		- I would again add a new attribute to the drink objects, an array of objects that contains the information of what condiments are available for the respective drink. This information would be retrieved by the "Drink" service, and passed along to Order page as an additional option.
		- Additionally, information such as price of the condiments could also be added. Or if all the drinks share all the same condiments, a separate data object model could be interfaced and retrieved by application; allowing for dynamic condiment options for all drinks.
3. **Technical Considerations:**
	- **Ionic Framework and Angular:** 
		- **Data Binding:** Explain how you would use data binding to synchronize the UI with the underlying data model.
			- I've used data-bindings in my application, as to allow for looping of data arrays and dynamic data. 
			- That is to say, that instead of hard coding the values of the drinks, I've instead been able to loop through an array of the drinks data in conjunction with ionic components to efficiently display the information.
			- By using data bindings, I can dynamically display the options of the drink information and sizes without hard coding the values. Which allows for reusability of the ordering page as a template, instead of creating multiple ordering pages for each respective drink.
			- By using data bindings, I can also dynamically update parts of the UI, such as the cart item list and the total cost of the ordered drinks.
	- **JSON Data and Web Services:**
		- **Mock Data:** Explain how you would use a JSON file to simulate a web service and fetch drink data from the provided menu.
			- I've used a JSON file to simulate the usual format an API would likely return, and structured it as such that the information of each drink would be contained in the dummy JSON file.
			- The application is then able to fetch this dummy data, and dynamically populate the UI with the correct information, as if it was actually calling from an API service.
		- **Real-World Integration:** Discuss how you would integrate the app with a real-world API to fetch menu items and process orders.
			- I would first understand how the API returned data is structured, and make an interface object that matches the structure of the returned object data. I would then keep the API information (API key, the API url, etc) in a location accessible to the application (such as the environments file).
			- I would then use the HttpClientModule module to retrieve the data from the API url, parse the data and pass it to the respective pages and UI elements. Like how I've already done with the local JSON file for dummy data.
	- **Testing and Quality:**
		- **Unit Testing:** Describe your approach to writing unit tests to ensure code quality and maintainability.
			- My approach is to test small essential parts of an application by testing different approaches, determining if the approach is efficient and gives the expected result. Picking the working and most efficient approach to implement into the actual application.
			- I also use unit tests to experiment and better understand parts of a program that I'm less familiar with, to better understand and build an satisfactory implementation to a problem.
		- **Integration Testing:** Explain how you would test the interaction between different components and the backend.
			- I would test using hardcoded values, passing these values so that I can know for sure if the test results are as expected based on the hardcoded values. I would also display the format of the results in the console, to see if they match with my understanding; and if they don't, I would update the code to better handle the data/results.
	
