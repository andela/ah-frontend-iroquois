import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import styles from '../styles/articleStyles/NewArticle.scss';
import {createArticleAction, editArticle} from '../actions/articleActions/articleActions';
import {editOneArticleActionCreator} from '../actions/articleActions/articleActionCreators';
import {Bottom, EditorCreate, Header} from '../components/articles/editorCreate';

class CreateArticle extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			title: '', titleError: '', description: '',
			descriptionError: '', body: '', bodyError: ''
		};
	}

	componentWillMount() {

		// noinspection JSUnusedLocalSymbols
		onbeforeunload = this.onLoad;

		this.setState({
			body: this.props.article.body || '',
			slug: this.props.article.slug || '',
			title: this.props.article.title || '',
			description: this.props.article.description || ''
		});
	}

	componentWillUnmount() {
		onbeforeunload = null;
	}

	// noinspection JSUnusedLocalSymbols
	onLoad = e => "Don't leave";

	handleChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value
		});
	};

	// noinspection JSUnusedLocalSymbols
	clearForm = (e) => {
		this.setState({
			body: '', slug: '', title: '', description: ''
		});
		this.props.dispatch(editOneArticleActionCreator(''));
	};

	handleEditorChange = (event, editor) => {
		this.setState({body: editor.getData()});
	};

	validateArticle = () => {

		this.setState({
			titleError: '',
			descriptionError: '',
			bodyError: ''
		});
		const {title, description, body} = this.state;
		let foundError = false;

		if (title.length === 0) {
			this.setState({titleError: 'Title is required'});
			foundError = true;

		} else if (title.length < 5) {
			this.setState({titleError: 'Title must be at least five characters'});
			foundError = true;
		} else if (description.length === 0) {
			this.setState({descriptionError: 'Description is required'});
			foundError = true;
		}
		if ((body.trim()).length < 20) {
			this.setState({bodyError: 'Body must be at least 20 characters or more'});
			foundError = true;
		}

		return !foundError;

	};

	handleSubmit = (event) => {
		event.preventDefault();
		if (this.validateArticle()) {
			if (this.state.slug) {
				this.props.dispatch(editArticle(this.state, this.props.history));
				this.props.dispatch(editOneArticleActionCreator(''));
			} else {
				this.props.dispatch(createArticleAction(this.state, this.props.history));
			}
		}
	};

	render() {
		return (

			<div className="valign-wrapper">
				<div className={styles.container}>
					<div className='card black-text z-depth-1'>
						<div className="card-content" style={{padding: '12px'}}>
							<Header {...this.state} handleChange={this.handleChange} refObj={this} />

							<div className={styles['bottom-space']}>
								<EditorCreate
									handleEditorChange={this.handleEditorChange}
									body={this.state.body}
									bodyError={this.state.bodyError}
								/>
							</div>

							<Bottom {...this.state} clearForm={this.clearForm} handleSubmit={this.handleSubmit} />
						</div>
					</div>
				</div>
			</div>
		);
	}
}

CreateArticle.propTypes = {
	dispatch: PropTypes.func.isRequired,
	article: PropTypes.object.isRequired,
	location: PropTypes.shape({
		state: PropTypes.shape({slug: PropTypes.string})
	}).isRequired
};

export { CreateArticle as CreateArticleTest };

const mapStateToProps = state => ({ article: state.articlesReducer.articleEdit });

const mapDispatchToProps = dispatch => ({dispatch});

export default connect(mapStateToProps, mapDispatchToProps)(CreateArticle);
