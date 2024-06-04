import React from 'react'
import RecentlyAdded from '../components/home/RecentlyAdded'
import TopBooks from '../components/home/TopBooks'
import TopAuthors from '../components/home/TopAuthors'
import MostViewedBooks from '../components/home/MostViewedBooks'

const Home = () => {
  return (
    <>
    <p>This is Home Page.</p> 
    <TopBooks /> {/* based on starred */ }
    <TopAuthors /> {/* based on followers */}
    <MostViewedBooks /> {/*based on views */}
    <RecentlyAdded />
    {/* try book personalized recommendation */}
    </>
  )
}

export default Home