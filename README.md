# BurgerBuilderSPA
This is a react based SPA which allows users to choose burger filling of their choice. The backend is served by Firebase realtime database. 

FOR CLONING AND PERSONAL USE:

1)You'll have to paste in, your own baseURL in file src\axios-orders.js and the URL,if you're following firebase custom,can be found as the one pointing to your realtime database in firebase console.

2)You'll have to paste in ,your own endpoint URL for axios to post to in the file src\store\actions\authAction.js and the URL,if you're following firebase custom is:-
--> For sign-up:- Go to https://firebase.google.com/docs/reference/rest/auth#section-create-email-password and find the url under tag ENDPOINT
--> For sign-in:- Go to https://firebase.google.com/docs/reference/rest/auth#section-sign-in-email-password and find the url under tag ENDPOINT

and in the url taken from ENDPOINT, replace [API_KEY] with your firebase project web api key ,found in settings page of your project in firebase console

3)And in src\store\actions\burgerBuilderAction.js replace axios.get URL with your <--firebase realtime database url-->/ingredients.json i.e pointing to the node ingredients in your json data.


And for deployment,follow :-
1)First build your project using npm run build
2)Then navigate to Hosting in your firebase project console and follow the steps given in it.


