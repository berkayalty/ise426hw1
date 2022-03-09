import React, { useEffect, useState } from "react";

export default function Third({ keys }) {
  const [hex, setHex] = useState("");
  const [cipher, setCipher] = useState([]);
  const [plain, setPlain] = useState("");
  const handleHexChange = (event) => {
    const value = event.target.value;
    setHex(value);
    if (value === "") {
      setPlain("");
      setCipher([]);
      setHex("");
      return;
    }
    const fourDigitParsedArray = value.match(/.{1,4}/g);
    const tempCipher = fourDigitParsedArray.map((_fourDigit) => {
      return parseInt(_fourDigit, 16);
    });
    setCipher(tempCipher);
    let tempPlain = "";
    for (let c = 0; c < tempCipher.length; c++) {
      let ascii = 1;
      for (let index = 0; index < keys.private.dNum; index++) {
        ascii = (ascii * tempCipher[c]) % keys.private.nNum;
      }
      tempPlain += String.fromCharCode(ascii);
    }
    setPlain(tempPlain);
  };

  useEffect(() => {
    setPlain("");
    setCipher([]);
    setHex("");
  }, [keys]);
  return (
    <>
      <div className="row">
        <div className="col-2 my-auto">Your Private Key(d,n)</div>
        <div className="col-2">
          <div className="mb-4 form-group" controlId="zNum">
            <span className="form-label">D</span>
            <span className="bg-muted form-control">{keys.private.dNum}</span>
          </div>
        </div>
        <div className="col-2">
          <div className="mb-4 form-group" controlId="zNum">
            <span className="form-label">N</span>
            <span className="bg-muted form-control">{keys.private.nNum}</span>
          </div>
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-2 my-auto">Enter Ciphertext(in hex):</div>
        <div className="col-10">
          <textarea
            className="form-control"
            style={{ height: "100px" }}
            onChange={handleHexChange}
            value={hex}
          ></textarea>
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-2 my-auto">Plaintext(int):</div>
        <div className="col-10">
          <textarea
            className="form-control"
            style={{ height: "100px" }}
            disabled
            value={cipher}
          ></textarea>
        </div>
      </div>
      <div className="row mt-4">
        <div className="col-2 my-auto">Plaintext:</div>
        <div className="col-10">
          <textarea
            className="form-control"
            style={{ height: "100px" }}
            disabled
            value={plain}
          ></textarea>
        </div>
      </div>
    </>
  );
}
