import React from 'react';
import PropTypes from 'prop-types';

const TwitterButton = props => (
  <div style={{display: "flex", justifyContent: props.center ? "center" : "flex-start"}}>
    <a 
      href="https://twitter.com/webquintanilha?ref_src=twsrc%5Etfw" 
      className="twitter-follow-button" 
      data-size="large" 
      data-show-count="false">
      Follow @webquintanilha
    </a>
    <script async src="https://platform.twitter.com/widgets.js" charSet="utf-8"></script>
  </div>
);

TwitterButton.defaultProps = {
  center: true,
};

TwitterButton.propTypes = {
  center: PropTypes.bool,
};

export default TwitterButton;
