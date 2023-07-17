import SideBar from './components/sidebar'
import Feed from './components/feed'
import Widgets from './components/widgets'

export default async function Home() {
  const newsResults = await fetch(
    "https://saurav.tech/NewsAPI/top-headlines/category/health/in.json"
  ).then((res) => res.json());
  const randomUsersResults = await fetch(
    "https://randomuser.me/api/?results=30&inc=name,login,picture"
  ).then((res) => res.json());
  return (
   <div className='flex min-h-screen mx-auto'>
      <SideBar />
        <Feed />
        <Widgets newsResults={newsResults.articles} randomUsersResults={randomUsersResults.results} />
   </div>
  )
}

