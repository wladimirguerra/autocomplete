import * as React from "react";
import PropTypes from "prop-types";
import { theme } from "../../../../theme";

class ResultListContainer extends React.Component {

    render() {
        const anchor = this.props.anchor?.current;


        if(
            // If there is no anchor doesn't show
            !anchor ||
            !this.props.show
        ) return null;

        return (
            <div ref={this.props.forwardRef} style={{
                backgroundColor: theme.backgroundColor,
                borderBottomLeftRadius: theme.borderRadius,
                borderBottomRightRadius: theme.borderRadius,
                left: anchor.offsetLeft + theme.borderRadius,
                top: anchor.offsetTop + anchor.offsetHeight + 2,
                width: anchor.offsetWidth - theme.borderRadius * 2
            }} className={"popup-container"}>
                {this.props.children}
            </div>
        );
    };
}

ResultListContainer.propTypes = {
    anchor: PropTypes.any.isRequired,
    show: PropTypes.bool,
    children: PropTypes.node.isRequired
}

export default
React.forwardRef((props, ref) => <ResultListContainer {...props} forwardRef={ref}/>)
