import React, {Component} from "react";

export class Modal extends Component {

    render() {

        return (
            this.props.shown ?
                <div className="modal-mask">
                    <div className="modal">
                        <div className="modal-head">
                            <p className="modal-title">{this.props.title}</p>
                        </div>
                        <div className="modal-body">
                            {this.props.children}
                        </div>
                        <div className="modal-footer">
                            <button className="button-primary" onClick={this.props.onClose}>{this.props.button}</button>
                        </div>
                    </div>
                </div> :
                null
        );

    }

}
