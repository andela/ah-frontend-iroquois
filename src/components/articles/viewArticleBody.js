import CKEditor from '@ckeditor/ckeditor5-react';
import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';
import React from 'react';
import * as PropTypes from 'prop-types';

class ViewArticleBody extends React.Component {

	func = (editor) => {
		editor.isReadOnly = !this.props.editorMode;
	};

	onChange = (event, editor) => {
		editor.isReadOnly = !this.props.editorMode;
	};

	render() {
		return (
			<div className='row'>
				<div className='col s12 m12 l12'>
					<CKEditor
						editor={DecoupledEditor}
						onInit={this.func}
						onChange={this.onChange}
						data={this.props.article.body}
					/>
				</div>
			</div>
		);
	}
}

ViewArticleBody.propTypes = {
	editorMode: PropTypes.bool.isRequired,
	article: PropTypes.object.isRequired
};

export default ViewArticleBody;
