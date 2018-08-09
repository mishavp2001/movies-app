import React from 'react'
import { shallow, mount } from 'enzyme';
import * as enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import renderer from 'react-test-renderer'
import Gallery from '../client/components/Gallery'

enzyme.configure({ adapter: new Adapter() });

// Snapshot for CardComponent React Component
describe('>>>CardComponent E --- Snapshot',()=>{
    it('+++capturing Snapshot of CardComponent', () => {
        const renderedValue =  renderer.create(<Gallery />).toJSON()
        expect(renderedValue).toMatchSnapshot();
    });

});

describe('Gallery renders',()=>{
    it('renders gallerry with no props', () => {
        let gallerry = shallow(<Gallery />);
        expect(gallerry).toBeDefined();
    });

    it('renders gallery with props', () => {
        const moviesResp =   [{"movieId":70242311,"movieName":"Orange Is the New Black","imageType":"sdp","thumbnailUrl":"http://art.nflximg.net/673e9/b39fcc29b2ac668ee01343de9f21f611c8f673e9.jpg","fullSizeImageUrl":"http://art.nflximg.net/78bc7/198343ed941f178d54878aa366a122e4e2e78bc7.jpg","languageCode":"it"}];
        let gallerry = shallow(<Gallery sortedBy="movieId" moviesResp={moviesResp} />);
        expect(gallerry).toHaveLength(1);
    });

    it('renders gallery with all movies', () => {
        const moviesResp =   [{"movieId":70242311,"movieName":"Orange Is the New Black","imageType":"sdp","thumbnailUrl":"http://art.nflximg.net/673e9/b39fcc29b2ac668ee01343de9f21f611c8f673e9.jpg","fullSizeImageUrl":"http://art.nflximg.net/78bc7/198343ed941f178d54878aa366a122e4e2e78bc7.jpg","languageCode":"it"}];
        let gallerry = shallow(<Gallery sortedBy="movieId" moviesResp={moviesResp} />);
        expect(gallerry.find(".gallery-card")).toHaveLength(1);
    });


});
