import React, { Component } from "react";
import PropTypes from "prop-types";
import { configure, BarcodePicker as ScanditSDKBarcodePicker } from "scandit-sdk";

// Configure the library and activate it with a license key
const configurationPromise = configure(
  "AVlfAgT0G+TAIDDL2jTxm843juR2OtZ6hXbvTMV77XAyRz6eA05SY+kLxqD3Q9uF3zeWMaphRfPHc+idx3smqpoL2QvuR0kFVG99PH1ot9DRFjF8TDmcbhwj3FphHmYFZP97eNXoWBpA2+VgMIWlhR55oRl1GZeSBy26tHikbsaBhcFfiXMRL8/sinlPswDERL+i08aPIy4opIuDyjN42lc/fV7ZJFFf5oc0KXhQJ1cyJ5nMFJX5Y9nGjiSvcYyJIVa0q+ap8xnPN1JqaXFUgITNJHwcYeJ/sVMloZvC4OusbWyak4aC8jD0c+7ecYL53ECi8Zg5nsT6krp556XDcdXcEXnP5xjEPf+LhhqfKVxGlRFBSeE7On3rMyq5eOwomhPuC4IzyCVh9UqhN/iMp2+gRdhg2hOdXVBfqk+p/n0cMkkZtx+ufHG7aT5iyykKkjLeDzJcDnQsHVmAbrrr1QJpsgfWAhVgsXlgfoGW4cBJ177KsWZs+iFzgrRGqJwibKAzH/nvYYz8PjnQ+ihy9niysM4gANYZNcb7FeBDcYltySHUuVD1ihOzi2LFL2ElHn+Tcuer7eYVb8Ao5xqjnIH9G0Ap9DPJqZXYrEmTgP6mKa9FLVWC9b1rr7QCF0nr1qNRv//LgaA+L1fDpSIllO+cbrt3y1JjUoSLSlL0vJNeEJfdIGkkARzK6cGseF1FA13deN0b+6lRkot4auO96aRxSaR2vzUcH0Hkdi2Ks4j2m4W0rfeM8q/+b8HhxS73sdH425WGRtSHPS1WPDCGWgKja79nIWP43MObojCG",
  {
    engineLocation: "https://cdn.jsdelivr.net/npm/scandit-sdk@5.x/build",
  }).catch((error) => {
  alert(error);
});

const style = {
  position: "absolute",
  top: "0",
  bottom: "0",
  left: "0",
  right: "0",
  margin: "auto",
  maxWidth: "1280px",
  maxHeight: "80%",
};

export class BarcodePicker extends Component {
  static propTypes = {
    visible: PropTypes.bool,
    playSoundOnScan: PropTypes.bool,
    vibrateOnScan: PropTypes.bool,
    scanningPaused: PropTypes.bool,
    guiStyle: PropTypes.string,
    videoFit: PropTypes.string,
    scanSettings: PropTypes.object,
    enableCameraSwitcher: PropTypes.bool,
    enableTorchToggle: PropTypes.bool,
    enableTapToFocus: PropTypes.bool,
    enablePinchToZoom: PropTypes.bool,
    accessCamera: PropTypes.bool,
    camera: PropTypes.object,
    cameraSettings: PropTypes.object,
    targetScanningFPS: PropTypes.number,
    onScan: PropTypes.func,
    onError: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.ref = React.createRef();
  }

  componentDidMount() {
    configurationPromise.then(() => {
      ScanditSDKBarcodePicker.create(this.ref.current, this.props).then((barcodePicker) => {
        this.barcodePicker = barcodePicker;
        if (this.props.onScan != null) {
          barcodePicker.on("scan", this.props.onScan);
        }
        if (this.props.onError != null) {
          barcodePicker.on("scanError", this.props.onError);
        }
      });
    });
  }

  componentWillUnmount() {
    if (this.barcodePicker != null) {
      this.barcodePicker.destroy();
    }
  }

  componentDidUpdate(prevProps) {
    // These are just some examples of how to react to some possible property changes

    if (JSON.stringify(prevProps.scanSettings) !== JSON.stringify(this.props.scanSettings)) {
      this.barcodePicker.applyScanSettings(this.props.scanSettings);
    }

    if (prevProps.visible !== this.props.visible) {
      this.barcodePicker.setVisible(this.props.visible);
    }
  }

  render() {
    return <div ref={this.ref} style={style} />;
  }
}