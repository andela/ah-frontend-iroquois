/* eslint-disable no-multi-assign,import/no-extraneous-dependencies */
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import $ from 'jquery';

global.$ = global.jQuery = $;

configure({ adapter: new Adapter() });
