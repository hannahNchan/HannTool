import Enzyme, {shallow} from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

Enzyme.configure({adapter: new Adapter()});

import Footer from '../../Footer/index';

describe("Filter function", () => {
  test("it should filter by a search term (link)", () => {
    const wrapper = shallow(<Footer />);
    console.log(wrapper)
  });
});
