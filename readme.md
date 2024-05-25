SORTED IN ORDER TASKS


1) divide the components in the createBook and join the same functionalities
2) add agree terms and conditions field ( check box, filed in book, later display terms when hover)
3) include violations field in authors model
4) check for plag before adding the book - bookName, description ,bookLink, lic,...
5) home page - search functionality, bookDisplay
6) Book Viewing - discussionsm, liking, favs, ...
7) Authorization - login, signup
8) authors name should appear bydefault by author
9) Book request model : (or simply show like contributions)
    if a book has multiple authors then each author will be sent a request, if can add or reject, if added then the book will be added to his authors booklist and also his  book, if rejected it will not add his name in this book and that authors book 
    later we can also update the authors list, if they rejects unfortunately
10) comments - discussions
11) following, liking, favourites, .....
12) keep active search block genres and authors when is on active
13) in allowed viewers must not get the creating author
14) allow users to write any genre if not found in the list
15) onclick/sideclick esc button remove drop dwon and also remove the text in the input field
16) create what to display when error comes
17) add chat feature using web sockets
18) add read/not read feature also
19) add tagging field like @ when author tags a book this msg should also be in that books activity
20) search author based on their username, like github/hemanth110702
--------------------------------------------------------------
Present :

 Book Creation Features : 
  - add a field to report plagrism or unauthorized book
  - the user should be agreed to the book belongs to him
  - check plag before adding the book
  - also add field, if author had no account
  - if multiple authors then add that book for each of the author
  - create api for searching of authors with their usernames
  - search for authors username and add and display like blocks
  - when creating add this book id in all authors as contributed authors
  - and also when deleting delete bookId from authors contribution and also their name
  - same for allowed viewers
  - creat a bug report model

 Later :
  - in case of multiple authors, you can send request to other authors, if they accept then they will be represented in the authors
 

// home
/* 
BOOK -
all books request
single book
delete request
add request 
update request
search 
filter 
pagination

Author - 
all authors request
single author
delete author
update author
add author
search 
filter
pagination

User Authentication :
 login
 signup

notification -
get all
send notification based on update
delete all
delete one

comments -
get one 
get all
delete  one
------------------------------
book, author
search
filter
pagination

comments:
update comment
comment replies
comment voting

Additional features:
book reviews
discussions
analytics
------------------------------
