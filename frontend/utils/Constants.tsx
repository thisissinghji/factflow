import { BsCode, BsEmojiSunglasses } from 'react-icons/bs';
import { GiMicroscope,GiRobotGolem,GiLipstick,GiScissors,GiSprout } from 'react-icons/gi';
import { FaPaw, FaMedal,  FaRunning, FaHiking, FaMountain} from 'react-icons/fa';

export const topics = [
  {
    name: 'coding',
    icon: <BsCode />,
  },
  {
    name: 'technology',
    icon: <GiRobotGolem />,
  },
  {
    name: 'science',
    icon: <GiMicroscope/>,
  },
  {
    name: 'exploration',
    icon: <FaHiking />,
  },
  {
    name: 'nature',
    icon: <FaMountain/>,
  },
  {
    name: 'fitness',
    icon: < FaRunning />,
  },
  {
    name: 'animals',
    icon: <FaPaw />,
  },
  {
    name: 'sports',
    icon: <FaMedal />,
  },
  {
    name: 'beauty',
    icon: <GiLipstick />,
  },
  {
    name: 'grooming',
    icon: <GiScissors />,
  },
  {
    name: 'motivation',
    icon: <GiSprout />,
  },
];

export const footerList1 = ['About', 'Contact']
// export const footerList2 = []
export const footerList3 = [ 'Terms', 'Privacy', 'Community Guidelines' ]