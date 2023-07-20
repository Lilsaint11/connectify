import SideBar from './components/sidebar'
import Feed from './components/feed'
import CommentModal from './components/commentModal';
import WidgetsData from './components/widgetData';
import PostModal from './components/postmodal';

export default function Home() {
  return (
   <div className='flex min-h-screen mx-auto'>
      <SideBar />
        <Feed />
        <WidgetsData/>
        <CommentModal />
        <PostModal />
   </div>
  )
}

