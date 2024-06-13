SORTED IN ORDER TASKS 
0) - top books (based on likes), top authors (based on followers), book display, linking books to book display then onclick book add views in db
1) Home page, explore page
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
21) also book http should be like, 
22) Navbar : Home(recently added, Top Books, Top Authors carosule), explore(search and discover books and author), Notifications, MybookShelf(createBook, favBooks, likedBooks), profile, messages, requests, settings
23) Book repo - created, starred, liked
24) make author username unique, title uniqe when creation show these errors also
24) present home - top based on likes, later based on (views, stared, and likes)
25) try to implement reccommendation system
26) Later :

        Top Books: Consider displaying top books based on metrics such as the number of likes, average rating, or recent activity (e.g., most commented on or most viewed). You can calculate these metrics periodically and update the list accordingly.

        Top Authors: Showcase authors with the highest number of followers to highlight influential figures within the community. This can provide users with insights into popular authors and encourage them to explore their work further.

        Book Recommendations: Utilize user data and preferences to generate personalized book recommendations. This can involve analyzing users' reading history, favorite genres, and interactions with the platform to suggest relevant books they may enjoy.

        Recently Added Books: Display recently added books to keep users informed about the latest additions to your platform. This can help users discover new releases and stay up-to-date with fresh content.

        Explore Page: Offer an explore page where users can search for authors, books, genres, or specific topics of interest. Implement search functionality with filters and sorting options to enhance the discoverability of content.
27) add chat or discussion based on which suits better for this project
28) only allow numbers and letter for book title in book creation
29) like git hub search functionality in your repos and also to search other repos

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
