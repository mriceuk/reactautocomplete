import React from 'react';
import TestUtils from 'react-dom/test-utils';
import Autocomplete from '../src/autocomplete';
import { expect } from 'chai';
import { shallow, mount } from 'enzyme';


describe('Autocomplete', () => {
	
	
	it('contains wrapping element', () => {

	 		const wrapper = shallow(<Autocomplete/>);

	 		expect(wrapper.html()).to.contain('<div class="autocomplete-box">');

  });
  
  
  it('contains input element', () => {

	 		const wrapper = shallow(<Autocomplete/>);
	 		
	 		expect(wrapper.html()).to.contain('<input type="text" name="q" class="autocomplete" autocomplete="off"/>');

  });
  
  
  it('does not contain a button without prop', () => {

	 		const wrapper = shallow(<Autocomplete/>);
	 		expect(wrapper.html()).to.not.contain('<Button>');

  });
  
  
  it('does not contain a button without prop', () => {

	 		const wrapper = shallow(<Autocomplete/>);
	 		expect(wrapper.html()).to.not.contain('<input type="submit" ');

  });  
  
  
  it('contains a button with prop', () => {

	 		const wrapper = shallow(<Autocomplete submitBtn='test'/>);
	 		expect(wrapper.html()).to.contain('<input type="submit" class="autocomplete-submit" value="test"/>');

  });
  
   it('does not contain a button if submitBtn is empty', () => {

	 		const wrapper = shallow(<Autocomplete submitBtn=''/>);
	 		expect(wrapper.html()).to.not.contain('<input type="submit" ');

  });
  
  
  it('contains a form if submitBtn', () => {

	 		const wrapper = shallow(<Autocomplete submitBtn='test'/>);
	 		expect(wrapper.html()).to.contain('<form class="autocomplete-form">');

  });
  
  
  it('contains a div if no btn', () => {

	 		const wrapper = shallow(<Autocomplete/>);
	 		expect(wrapper.html()).to.contain('<div class="autocomplete-div">');

  });  
  
	
});

