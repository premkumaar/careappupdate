import {TabNavigator} from 'react-navigation';
import Homescr from './src/Screens/Homescr';
import Biblescr from './src/Screens/Biblescr';
export default Tabnav = TabNavigator({
    Home: {
        screen:Homescr
      },
      Bible:{
        screen:Biblescr
      }
})