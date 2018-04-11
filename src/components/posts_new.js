import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { createPost } from '../actions';

class PostsNew extends Component {

  renderField(field) {

    const { meta: { touched, error } } = field;
    const className = `form-group${touched && error ? ' has-danger' : ''}`;

    return (
      <div className={className}>
        <label>{field.label}</label>
        <input
          className="form-control"
          type="text"
          {...field.input}
        />
        <div className="text-help">
          {touched ? error : ''}
        </div>
      </div>
    );
  }

  onSubmit(values) {
    this.props.createPost(values, () => {
      // navigate the user back to index page
      // but we have to wait for the post request to complete
      // before we go back to index page
      //
      // we pass this navigation function ask a callback function
      // of this action creator; the callback function will be called
      // after the promise is resolved.
      //
      this.props.history.push('/'); // when this function is executed,
                                    // we are back to "/", which is one of
                                    // the route strings.
    });
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <Field
          label="Title"
          name="title"
          component={this.renderField}
        />
        <Field
          label="Categories"
          name="categories"
          component={this.renderField}
        />
        <Field
          label="Post Content"
          name="content"
          component={this.renderField}
        />
        <button type="submit" className="btn btn-primary">Submit</button>
        <Link to="/" className="btn btn-danger">Cancel</Link>
      </form>
    );
  }
}

// values is an object: { title: 'ada', categories: 'ada', content: 'adfas' }
function validate(values) {
  const errors = {};

  // validate the inputs from 'values;
  if (!values.title) {
    errors.title = "Enter a title!";
  }
  if (!values.categories) {
    errors.categories = "Enter some categories!";
  }
  if (!values.content) {
    errors.content = "Enter some content!";
  }

  // if errors is empty, the form is fine to submit
  // if errors has any properties, redux form assumes form is invalid
  return errors;

}

export default reduxForm({
  form: 'PostsNewForm',       // unique name for the form
  validate,
})(
  connect(null, { createPost })(PostsNew)
);
