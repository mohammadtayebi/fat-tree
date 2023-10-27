import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";
function App() {
  const [Kvalue, setKvalue] = useState(0);
  const [servers, setServers] = useState("");
  const [pods, setPods] = useState("");
  const [edge, setEdge] = useState("");
  const [aggregation, setAggregation] = useState("");
  const [core, setCore] = useState("");
  const [sumAll, setSumAll] = useState("");
  const [treeArray, settreeArray] = useState([]);
  const [indexServer, setIndexServer] = useState([]);
  const [indexLeveltwo, setIndexLeveltwo] = useState([]);
  const [indexCore, setIndexCore] = useState([]);
  const [ServerNum, setServerNum] = useState([]);
  const [EdgeNum, setEdgeNum] = useState([]);
  const [AggNum, setAggNum] = useState([]);
  const [CoreNum, setCoreNum] = useState([]);
  const [firstRow, setFirstRow] = useState([]);
  const [aggInPod, setaggInPod] = useState([]);
  const [coreInPod, setcoreInPod] = useState([]);
  // const [indexes, setIndexes] = useState([]);
  const getInputValue = (e) => {
    // get the value of the k from the input and add it to the Kvalue variable state
    const value = e.target.value;
    setKvalue(value);
    getTheValueLevels(value);

    // setEdge(value / 2);
  };

  const getTheValueLevels = async (val) => {
    const intK = parseInt(val);
    const halfK = intK / 2;
    setCore(Math.pow(halfK, 2));
    setPods(intK);
    setEdge(halfK * intK);
    setAggregation(halfK * intK);
    setServers(halfK * intK * halfK);
    // setServers(intK * 4);
  };
  const calculateLevels = (e) => {
    e.preventDefault();
    setSumAll(servers + edge + aggregation + core);
    giveIndex2();
    // giveIndex();
  };
  const giveIndex = () => {
    let serverArray = [];
    let leveltwo = [];
    let coreArray = [];
    for (let i = 0; i < servers; i++) {
      serverArray.push(i);
    }
    for (let i = 0; i < core; i++) {
      coreArray.push(i);
    }
    for (let i = 0; i < edge; i++) {
      leveltwo.push(i);
    }
    setIndexServer(serverArray);
    setIndexCore(coreArray);
    setIndexLeveltwo(leveltwo);
  };
  const giveIndex2 = () => {
    let treeArray = [];
    for (let i = 0; i < sumAll; i++) {
      treeArray.push(i);
    }
    settreeArray(treeArray);

    let serverI = [];
    let edgeI = [];
    let AggI = [];
    let corI = [];
    for (const [index, name] of treeArray.entries()) {
      // console.log(` ${name}, index ${index}!`);
      if (index < servers) {
        serverI.push(name);
      } else if (servers > name || name < edge + servers) {
        edgeI.push(name);
        // edgeI.push(name);
      } else if (servers > name || name < aggregation + edge + servers) {
        AggI.push(name);
      } else if (servers > name || name < aggregation + edge + servers + core) {
        corI.push(name);
      }
    }
    // repeat the edge two times to show the links for server / we show this on the first part of second column of the table
    var repeated = new Array(Kvalue / 2).fill(edgeI).flat().sort();
    var repeatedAgg = new Array(Kvalue / 2).fill(AggI).flat().sort();
    let edgeLinked = [...serverI, ...repeated, ...repeatedAgg, ...corI];
    // repeat the edge two times to show the links for edges

    let aggInPod1 = [];
    const chunkSize = Kvalue / 2;
    let chunk = [];
    for (let i = 0; i < AggI.length; i += chunkSize) {
      chunk = AggI.slice(i, i + chunkSize);
      aggInPod1.push(chunk);
    }
    let jj = [];
    let aggInPod2 = [];
    aggInPod1.map((item, index) => {
      jj = new Array(Kvalue / 2).fill(item).flat();
      aggInPod2.push(jj);
    });

    setaggInPod(aggInPod2);
    // ------------------------------------------------------------------------
    // repeat the aggregation two times to show the links for edges
    let coreInPod = [];
    const chunkSize2 = Kvalue / 2;
    let chunk2 = [];
    for (let i = 0; i < corI.length; i += chunkSize2) {
      chunk2 = corI.slice(i, i + chunkSize2);
      coreInPod.push(chunk2);
    }
    let ii = [];
    let coreInPod2 = [];
    coreInPod.map((item, index) => {
      ii = new Array(Kvalue / 2).fill(item).flat();
      coreInPod2.push(ii);
      // console.log(ii);
    });
    let finalCore = [...coreInPod2, ...coreInPod2].sort();
    setcoreInPod(finalCore);

    // ------------------------------------------------------------------------

    setFirstRow(edgeLinked);
    setServerNum(serverI);
    // setEdgeNum(edgeI);
    setEdgeNum(repeated);

    setAggNum(AggI);
    setCoreNum(corI);
    // console.log(`server:${serverI} ,edge:${edgeI} , agg:${AggI}, core:${corI}`);
  };
  return (
    <div className="App">
      <form action="">
        <input
          type="number"
          placeholder="Enter the K"
          onChange={(e) => getInputValue(e)}
        />
        <button type="submit" onClick={calculateLevels}>
          submit K
        </button>
      </form>
      {/* TABLE  */}
      <div className="container text-center">
        <div className="row">
          <div className="col">
            <div className="flex">
              <div className="head border-bottom mb-2 pb-2">row_1</div>
              {firstRow.map((item, index) => {
                return (
                  <p className="border-bottom" key={index}>
                    {item}
                  </p>
                );
              })}
            </div>
          </div>
          {/* col 2 */}
          <div className="col">
            <div className="flex">
              <div className="head border-bottom mb-2 pb-2">row_2</div>
              <div>
                {EdgeNum.map((item, index) => {
                  return (
                    <p className="border-bottom" key={index}>
                      {item}
                    </p>
                  );
                })}
              </div>
              <div>
                {aggInPod.map((item1) => {
                  return (
                    <div>
                      {item1.map((item, index) => {
                        return (
                          <p className="border-bottom" key={index}>
                            {item}
                          </p>
                        );
                      })}
                    </div>
                  );
                })}
              </div>
              <div>
                {coreInPod.map((item1) => {
                  return (
                    <div>
                      {item1.map((item, index) => {
                        return (
                          <p className="border-bottom" key={index}>
                            {item}
                          </p>
                        );
                      })}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>{" "}
          <div className="col">
            <div className="flex">
              <div className="head border-bottom mb-2 pb-2">row_3</div>
              {firstRow.map((item, index) => {
                return (
                  <p className="border-bottom" key={index}>
                    1
                  </p>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
