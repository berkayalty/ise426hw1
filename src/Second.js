import React, { useEffect, useState } from "react";

export default function Second({ keys }) {
  const [plain, setPlain] = useState("");
  const [cipher, setCipher] = useState([]);
  const [hex, setHex] = useState("");
  const onPlainChange = (event) => {
    const value = event.target.value;
    setPlain(value);
    const tempCipher = [];
    for (let i = 0; i < value.length; i++) {
      var c = 1;
      for (let j = 0; j < keys.public.eNum; j++) {
        c = (c * value.charCodeAt(i)) % keys.public.nNum;
      }
      c = c % keys.public.nNum;
      tempCipher.push(c);
    }
    var hexString = "";
    for (let i = 0; i < tempCipher.length; i++) {
      const eksikDigit = 4 - tempCipher[i].toString(16).length;
      for (let a = 0; a < eksikDigit; a++) {
        hexString += "0";
      }
      hexString += tempCipher[i].toString(16);
    }
    setCipher(tempCipher);
    setHex(hexString);
  };

  useEffect(() => {
    setPlain("");
    setCipher([]);
    setHex("");
  }, [keys]);

  return (
    <>
      <div className="row">
        <div className="col-2 my-auto">Your Public Key(e,n)</div>
        <div className="col-2">
          <div className="mb-4 form-group" controlId="zNum">
            <span className="form-label">E</span>
            <span className="bg-muted form-control">{keys.public.eNum}</span>
          </div>
        </div>
        <div className="col-2">
          <div className="mb-4 form-group" controlId="zNum">
            <span className="form-label">N</span>
            <span className="bg-muted form-control">{keys.public.nNum}</span>
          </div>
        </div>
      </div>
      <div className="row mt-4">
        <div className="col-2 my-auto">Enter Plaintext:</div>
        <div className="col-10">
          <textarea
            className="form-control"
            value={plain}
            onChange={onPlainChange}
            style={{ height: "100px" }}
          ></textarea>
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-2 my-auto">Ciphertext(int):</div>
        <div className="col-10">
          <textarea
            className="form-control"
            style={{ height: "100px" }}
            disabled
            value={cipher.map((_val) => {
              return _val;
            })}
          ></textarea>
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-2 my-auto">Ciphertext(in hex):</div>
        <div className="col-10">
          <textarea
            className="form-control"
            style={{ height: "100px" }}
            disabled
            value={hex}
          ></textarea>
        </div>
      </div>
    </>
  );
}
