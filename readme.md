BASIC CHANGES THAT NEED TO BE DONE BY USER:

1. Change DB name in dbconfig.js file
2. Create more Schemas for whatever you are building
3. Add your project code
4. Create seedDB file 

OPTIONAL CHANGES THAT NEED TO BE DONE BY USER:
1. Change routes
2. Change UI
3. Change UserSchema in user.js

NAME      URL                   VERB    User route		Item routes		Description
---------------------------------------------------------------------------------------
INDEX     /items                GET     /				/u				Show all items
NEW       /items/new            GET     /u				/u				Display the form page(OPTIONAL) where new items can be made 
CREATE    /items                POST    /u/register		/u/new		    Add new item
SHOW      /items/:itemID        GET     /u/:id/profile	----			Show info about one item (seperate page for each)
EDIT	  /items/:itemID/edit	GET     /u/:id/edit		/u				Display the form page(OPTIONAL) where items can be editted
UPDATE    /items/:itemID        PUT     /u/:id			/u/item/:id		Edit item   
DELETE	  /items/:itemID 	    DELETE  /u/:id			/u/item/:id		Delete item

--------------------------------------------------------------------
NOTE:
1. POST (CREATE) url page will have a form, a res.redirect and same route as INDEX.
2. EDIT page/route will show form, UPDATE (PUT) and DELETE will have a res.redirect and same route as SHOW.  
3. SHOW page will have :(var) in its route URI.
4. NEW route should always be defined before SHOW or else :id will get param value as new.