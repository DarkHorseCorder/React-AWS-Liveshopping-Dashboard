
// starter kit
import Accueil from '../component/dashboard/accueil'
import Live from '../component/dashboard/live'
import Support from '../component/dashboard/support'
import Parametre from '../component/dashboard/parametre'
import RecordVideo from '../component/dashboard/recordvideo'
import LiveShow from '../component/dashboard/liveshow'
import ScheduleVideo from '../component/dashboard/scheduledvideo'

export const routes = [
    { path:"/dashboard/accueil", Component: Accueil },    
    { path:"/dashboard/live", Component: Live }, 
    { path:"/dashboard/support", Component: Support },    
    { path:"/dashboard/parametre", Component: Parametre },
    { path:"/dashboard/recordvideo/:id", Component: RecordVideo },
    { path:"/dashboard/liveshow", Component: LiveShow }, 
    { path:"/dashboard/scheduledvideo/:id", Component: ScheduleVideo }, 
]