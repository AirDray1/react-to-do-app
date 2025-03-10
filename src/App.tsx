import './App.css';
import Sidebar from './Components/LeftSidebar';
import TodayPage from './Components/mainPages/TodayPage';
import UpcomingPage from './Components/mainPages/UpcomingPage';
import CalendarPage from './Components/mainPages/CalendarPage';
import StickyWallPage from './Components/mainPages/StickyWallPage';
import { useSelector } from 'react-redux';
import { RootState } from './Redux/redux copy';

type MainPageType = 'Upcoming' | 'Today' | 'Calendar' | 'Sticky_wall';

type MainPage = 
  | { type: 'Upcoming' }
  | { type: 'Today' } 
  | { type: 'Calendar' } 
  | { type: 'Sticky_wall' };
      
function App() {
  const selectedPage = useSelector((state: RootState) => state.selectedPage) as MainPageType;

  function createMain(action: MainPage) {
    switch (action.type) { 
      case 'Upcoming':
        return <UpcomingPage  />;
      case 'Today':
        return <TodayPage  />;
      case 'Calendar':
        return <CalendarPage  />;
      case 'Sticky_wall':
        return <StickyWallPage  />;
      default:
        return <h1>Hello Page</h1>;
    }
  }

  const action: MainPage = 
          selectedPage === 'Upcoming'
        ? { type: selectedPage }
        : selectedPage === 'Today'
        ? { type: selectedPage }
        : selectedPage === 'Calendar'
        ? { type: selectedPage }
        : selectedPage === 'Sticky_wall'
        ? { type: selectedPage }
        : { type: selectedPage };

  const page = createMain(action);

  return (
    <>
      <Sidebar />
      <main className="main">
        {page}
      </main>
    </>
  )
}

export default App
