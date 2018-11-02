import React from 'react';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {shallow} from 'enzyme';
import {ArticlePreferenceContainer} from '../../containers/articlePreference';
import {USERNAME_KEY} from '../../constants';

const store = configureStore([thunk])({});

describe('Calling handlers on ArticlePreferenceContainer', () => {
	let component;
	let instance;
	beforeEach(() => {
		component = shallow(
			<ArticlePreferenceContainer
				dispatch={store.dispatch}
				article={{likes_count: 0}}
				data={{likes: [], dislikes: []}}
				state={store}
			/>
		);
		instance = component.instance();

	});

	it('should call handleLikeClick method', () => {
		instance.handleLikeClick();
		instance.setState({likeColor: 'red-text'});
		instance.handleLikeClick();
	});

	it('should call handleDislikeClick method', () => {
		instance.handleDislikeClick();
		instance.setState({dislikeColor: 'red-text'});
		instance.handleDislikeClick();
	});

	it('should call componentWillMount method', () => {
		localStorage.setItem(USERNAME_KEY, 'username');
		shallow(
			<ArticlePreferenceContainer
				dispatch={store.dispatch}
				article={{likes_count: 0}}
				data={{likes: ['username'], dislikes: ['username']}}
				state={store}
			/>
		);

	});

	it('should set localStorage and calls componentWillMount method', () => {
		localStorage.setItem(USERNAME_KEY, 'username2');
		shallow(
			<ArticlePreferenceContainer
				dispatch={store.dispatch}
				article={{likes_count: 0}}
				data={{likes: ['username'], dislikes: ['username2']}}
				state={store}
			/>
		);

	});
});
