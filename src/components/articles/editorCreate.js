/* eslint-disable jsx-a11y/label-has-associated-control, jsx-a11y/label-has-for */
import React from 'react';
import CKEditor from '@ckeditor/ckeditor5-react';
import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';
import * as PropTypes from 'prop-types';
import styles from '../../styles/articleStyles/NewArticle.scss';
import {generateButton} from '../../utils';

const CreateArticleInputs = (props) => (

	<div>
		<div className={`input-field col s6 m6 l6 ${styles['input-create-articles']}`}>
			<input id="title" type="text" name="title" value={props.title ? props.title : ''} onChange={props.handleChange} className="validate" />
			<label className={props.title ? 'active' : ''} htmlFor="title">Title</label>
			<div className={styles['error-text-article']}>{props.titleError}</div>
		</div>
		<div className={`input-field col s6 m6 l6 ${styles['input-create-articles']}`}>
			<input
				id="description"
				type="text"
				name="description"
				value={props.description ? props.description : ''}
				onChange={props.handleChange}
				className={`validate ${props.description ? 'active' : ''}`}
			/>
			<label className={props.description ? 'active' : ''} htmlFor="description">Description</label>
			<div className={styles['error-text-article']}>{props.descriptionError}</div>
		</div>
	</div>
);

CreateArticleInputs.propTypes = {
	titleError: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	description: PropTypes.string.isRequired,
	descriptionError: PropTypes.string.isRequired,
	handleChange: PropTypes.func.isRequired
};

export const Header = (props) => (
	<div>
		<h3 className={styles.header}>{props.slug ? 'edit article' : 'create article'}</h3>
		<CreateArticleInputs
			title={props.title}
			description={props.description}
			this={props.refObj}
			titleError={props.titleError}
			descriptionError={props.descriptionError}
			handleChange={props.handleChange}
		/>
		<span className={styles['text-body']}>Body</span>
	</div>

);

Header.propTypes = {
	title: PropTypes.string.isRequired,
	description: PropTypes.string.isRequired,
	titleError: PropTypes.string.isRequired,
	descriptionError: PropTypes.string.isRequired,
	handleChange: PropTypes.func.isRequired,
	refObj: PropTypes.object.isRequired,
	slug: PropTypes.string
};

Header.defaultProps = {
	slug: null
};

export const Bottom = (props) => {
	const publishButton = {handler: props.handleSubmit,
		className: `waves-effect waves-light btn ${styles.save}`,
		text: props.slug ? 'Finish editing' : 'Publish'};
	const cancelButton = {text: 'Cancel', handler: props.clearForm, className: `waves-effect waves-light btn ${styles.clear}`};

	return (
		<div>
			<div className="right-align">
				{generateButton(publishButton)}
				{generateButton(cancelButton)}
			</div>
		</div>
	);
};

Bottom.propTypes = {
	handleSubmit: PropTypes.func.isRequired,
	clearForm: PropTypes.func.isRequired,
	slug: PropTypes.string
};

Bottom.defaultProps = {
	slug: null
};

export class EditorCreate extends React.Component {

	func = editor => {
		// Insert the toolbar before the editable area.
		editor.ui.view.editable.element.parentElement.insertBefore(
			editor.ui.view.toolbar.element,
			editor.ui.view.editable.element
		);
	};

	render() {
		return (
			<div className={styles.ck}>
				<CKEditor
					onInit={this.func}
					name={this.props.body}
					onChange={this.props.handleEditorChange}
					editor={DecoupledEditor}
					data={this.props.body}
				/>
				<div style={{margin: '.5em'}} className={styles['error-text-article']}>{this.props.bodyError}</div>
			</div>
		);
	}
}

EditorCreate.propTypes = {
	bodyError: PropTypes.string.isRequired,
	body: PropTypes.string.isRequired,
	handleEditorChange: PropTypes.func.isRequired
};
