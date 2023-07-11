import { useEffect, useState } from "react";
import { Sequencer } from "../../assets/ts/daw/Sequencer";
import Layout from "../../components/Layout/Layout";
import Seo from "../../components/Seo";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import AudioUploadForm from "../../components/AudioUpload/AudioUploadForm";
import axios from "axios";

export default function Score() {
  const [allLoops, setAllLoops] = useState([]);
  const [sequencer, setSequencer] = useState(null);
  const [trackCount, setTrackCount] = useState(0);
  const [tempo, setTempo] = useState(120.0);
  useEffect(() => {
    const newSequencer = new Sequencer();
    setSequencer(newSequencer);
    setTimeout(() => {
      newSequencer.load();
    }, 1000);

    updateLoops();
  }, []);

  useEffect(() => {
    if (sequencer) {
      sequencer.setTempo(tempo);
    }
  }, [tempo, sequencer]);

  const updateLoops = () => {
    const loopsPromise = axios.get("/loops");
    loopsPromise.then((response) => {
      console.log(response.data);
      const loops = response.data.map((loop) => {
        return { ...loop, id: loop._id, name: loop.title };
      });
      setAllLoops(loops);
    });
  };

  const handleOnSearch = (string, results) => {
    // onSearch will have as the first callback parameter
    // the string searched and for the second the results.
    updateLoops;
    console.log(string, results);
  };

  const handleOnHover = (result) => {
    // the item hovered
    console.log(result);
  };

  const handleOnSelect = (loop) => {
    // the item selected
    console.log(loop);
    sequencer.audioTracks.addTrack(trackCount, loop.title, loop.audioUrl);
    setTrackCount(trackCount + 1);
  };

  const handleOnFocus = () => {
    console.log("Focused");
  };

  const formatResult = (loop) => {
    console.log(allLoops);
    console.log(loop);
    return (
      <>
        <span style={{ display: "block", textAlign: "left" }}>
          {loop.title}
        </span>
      </>
    );
  };

  console.log(allLoops);

  return (
    <Layout hideRightSidebar hideLeftSidebar containerMaxWidth="xxxl">
      <Seo title="DAW" />
      <div id="top-sequencer-controls">
        <AudioUploadForm uploadRoute="loops" />
        <div id="autocomplete-container">
          <ReactSearchAutocomplete
            id="autocomplete"
            items={allLoops}
            onSearch={handleOnSearch}
            onHover={handleOnHover}
            onSelect={handleOnSelect}
            onFocus={handleOnFocus}
            autoFocus
            formatResult={formatResult}
            placeholder="Add Loop"
          />
          <div id="tempo-container">
            <label htmlFor="tempo">Tempo: </label>
            <input
              id="tempo"
              defaultValue={120.0}
              value={tempo}
              onChange={(e) => setTempo(e.target.value)}
            />
          </div>
        </div>
      </div>
      <canvas id="sequencerCanvas">
        Canvas is disabled, try updating browser
      </canvas>
    </Layout>
  );
}
