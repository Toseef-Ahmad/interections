import React from 'react';
import PageWrapper from '../components/PageWrapper';
import './PageTemplate.css';

function ExamplePage() {
  return (
    <PageWrapper
      title="Example Component"
      description="An example interactive React component demonstrating the structure and functionality."
      keywords="react, component, example, interactive, demo"
      url="/example"
    >
      <article>
        <header>
          <h1>Example Component</h1>
        </header>
        <p>This is an example interactive component.</p>
        <p>You can use this as a template for creating new components.</p>
        <section className="component-content" aria-label="Component content">
          <p>Add your interactive React component code here!</p>
        </section>
      </article>
    </PageWrapper>
  );
}

export default ExamplePage;

