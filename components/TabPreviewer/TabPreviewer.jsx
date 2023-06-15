import React, { Component } from "react";

import Previewer from "../TabEditor/Previewer/Previewer";
import PinBtn from "../TabEditor/PinBtn/PinBtn";
import { useRouter } from "next/router";

const TabPreviewerWithRouter = (props) => {
  const router = useRouter();
  return <TabPreviewer {...props} router={router} />;
};

class TabPreviewer extends Component {
  state = {
    // Basic information of this song
    headerForm: {},
    // Editor content
    editorForm: {},
    isExistData: false,
  };

  componentDidMount() {
    const routeState = this.props.router.query;

    if (routeState) {
      this.setState({
        headerForm: JSON.parse(routeState.headerForm),
        editorForm: JSON.parse(routeState.editorForm),
        isExistData: true,
      });
    }
  }

  back = () => {
    this.props.router.back();
  };

  save = () => {
    window.print();
  };

  render() {
    const { headerForm, editorForm, isExistData } = this.state;

    return (
      <div className="ge-result">
        {isExistData ? (
          <div>
            <Previewer headerForm={headerForm} editorForm={editorForm} />
            <PinBtn
              onClick={this.save}
              right={30}
              bottom={210}
              bgColor="#909399"
            >
              Save
            </PinBtn>
          </div>
        ) : (
          <div className="ge-result-err">No data is to preview.</div>
        )}
        <PinBtn onClick={this.back} right={30} bottom={30}>
          Back
        </PinBtn>
      </div>
    );
  }
}

export default TabPreviewerWithRouter;
