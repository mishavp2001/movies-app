jest.mock('../__mocks__/socketIOClient');

import React from 'react'
import { shallow, mount } from 'enzyme';
import * as enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import renderer from 'react-test-renderer'
import {serverSocket} from '../__mocks__/socketIOClient';
import App from '../client/App.js'

enzyme.configure({ adapter: new Adapter() });

function tick() {
  return new Promise(resolve => {
    setTimeout(resolve, 0);
  })
}


// Snapshot for CardComponent React Component
describe('>>>App --- Snapshot',()=>{
    it('+++capturing Snapshot of App', () => {
        const renderedValue =  renderer.create(<App />).toJSON()
        expect(renderedValue).toMatchSnapshot();
    });

});

describe('App renders', ()=>{
    let wrapper;
    beforeEach(() => {
      wrapper = mount(<App />);
    });

    it('renders app with no props without waiting for movies response', async () => {
        await expect(wrapper.find(".gallery-container")).toHaveLength(1);
        await expect(wrapper.find("h1").first().text()).toEqual("Welcome to our movies gallery!");
        await expect(wrapper.find("h1").at(1).text()).toEqual("Loading.. please wait!");
    });

    it('renders initial state', async () => {
        wrapper.setState({movies: [{id: 11212}]});
        await expect(wrapper.find("Gallery")).toHaveLength(1);
    });

    it('renders one movie', async () => {
      wrapper.setState({movies: [{id: 11212}]});
      await expect(wrapper.find("GalleryImage")).toHaveLength(1);
      expect(wrapper.find("img").prop('alt')).toEqual("Image number 1");
    });

    it('Calls getMovies on render ', async () => {
      const spy = jest.spyOn(App.prototype, 'getMovies');
      const temp = mount(<App />);
      await expect(spy).toHaveBeenCalled();
    });
});

describe('App interaction', ()=>{
  let wrapper;
  beforeEach(() => {
    wrapper = mount(<App />);
  });

  it('Sorts by sortBy method', async () => {
    const spy = jest.spyOn(wrapper.instance(), 'sortBy');
    wrapper.setState({movies: [{id: 1}, {id: 3}, {id: 2}]});
    await expect(wrapper.find("GalleryImage")).toHaveLength(3);
    expect(wrapper.find(".sortLink")).toHaveLength(2);
    //Sorts by firs link
    wrapper.find(".sortLink").first().simulate('click');
    expect(spy).toHaveBeenCalled();
    //Sorts by second link
    wrapper.find(".sortLink").at(1).simulate('click');
    expect(spy).toHaveBeenCalled();
  });
  it('Clicking on card opens/closes modal overlay', async () => {
    const spy = jest.spyOn(wrapper.instance(), 'sortBy');
    wrapper.setState({movies: [{id: 1}, {id: 3}, {id: 2}]});
    await expect(wrapper.find("GalleryImage")).toHaveLength(3);
    expect(wrapper.find(".sortLink")).toHaveLength(2);
    //Open modal
    wrapper.find(".card-icon-open").first().simulate('click');
    expect(wrapper.find(".modal-overlay")).toHaveLength(1);
    //Close Modal
    wrapper.find(".modal-close").first().simulate('click');
    expect(wrapper.find(".modal-overlay")).toHaveLength(0);
  });
});
