import { Formik, Form, Field } from "formik";
import React from "react";
export default function First({ setKeys }) {
  const isPrimeCheck = (num) => {
    for (let i = 2, s = Math.sqrt(num); i <= s; i++)
      if (num % i === 0) return false;
    return num > 1;
  };

  const ebob = (sayi1, sayi2) => {
    let ebob;
    let kucukSayi = sayi1 < sayi2 ? sayi1 : sayi2;

    for (let i = kucukSayi; i > 0; i--) {
      if (sayi1 % i === 0 && sayi2 % i === 0) {
        ebob = i;
        break;
      }
    }
    console.log("ebob -<", ebob);
    return ebob;
  };

  const validate = ({ pNum, qNum, eNum, nNum, zNum }) => {
    const errors = {};
    if (!isNaN(pNum) && pNum !== "" && !isPrimeCheck(pNum)) {
      errors.pNum = "First Number should be prime";
    } else {
      errors.pNum = "";
    }

    if (!isNaN(qNum) && qNum !== "" && !isPrimeCheck(qNum)) {
      errors.qNum = "Second Number should be prime";
    } else {
      errors.qNum = "";
    }

    if (eNum > 0 && !isNaN(eNum) && eNum !== "") {
      if (eNum >= nNum) {
        errors.eNum = "E number should be less than N number.";
      } else if (ebob(eNum, zNum) !== 1) {
        errors.eNum = "E number should be prime to Z number";
      }
    }

    if (!isNaN(nNum) && nNum !== "" && nNum <= 127) {
      errors.nNum = "N number should be greater than 127";
    }
    return errors;
  };

  const generateDNumber = ({ eNum, zNum, nNum }, setFieldValue) => {
    if (eNum > 0) {
      for (let i = nNum - 1; i > 0; i--) {
        if ((eNum * i - 1) % zNum === 0) {
          setFieldValue("dNum", i);
          setKeys({
            public: { eNum: eNum, nNum: nNum },
            private: { dNum: i, nNum: nNum },
          });
        }
      }
    }
  };

  const calculateNZNumbers = (setFieldValue, pNum, qNum) => {
    const nNum = isPrimeCheck(pNum) && isPrimeCheck(qNum) ? pNum * qNum : 0;
    const zNum =
      isPrimeCheck(pNum) && isPrimeCheck(qNum) ? (pNum - 1) * (qNum - 1) : 0;
    setFieldValue("nNum", nNum);
    setFieldValue("zNum", zNum);
  };

  return (
    <Formik
      initialValues={{
        pNum: "",
        qNum: "",
        nNum: "",
        zNum: "",
        eNum: "",
        dNum: "",
      }}
      onSubmit={(values) => {
        console.log("values submit", values);
      }}
      validateOnBlur
      validate={validate}
    >
      {({ values, errors, setFieldValue, handleChange, resetForm }) => {
        return (
          <Form>
            <div className="row">
              <div className="col-4">
                <div className="mb-4 form-group" controlId="formBasicEmail">
                  <span className="form-label">First Prime Number(p)</span>
                  <Field
                    name="pNum"
                    className="form-control"
                    type="number"
                    onChange={(event) => {
                      setFieldValue("pNum", event.target.value);
                      setFieldValue("eNum", 0);
                      calculateNZNumbers(
                        setFieldValue,
                        event.target.value,
                        values.qNum
                      );
                    }}
                  />
                  <span className="text-danger form-text">
                    {errors?.pNum ? errors?.pNum : ""}
                  </span>
                </div>
              </div>

              <div className="col-4">
                <div className="mb-4 form-group" controlId="pNum">
                  <span className="form-label">Second Prime Number(q)</span>
                  <Field
                    name="qNum"
                    className="form-control"
                    type="number"
                    onChange={(event) => {
                      setFieldValue("qNum", event.target.value);
                      setFieldValue("eNum", 0);
                      calculateNZNumbers(
                        setFieldValue,
                        values.pNum,
                        event.target.value
                      );
                    }}
                  />
                  <span className="text-danger form-text">
                    {errors?.qNum ? errors?.qNum : ""}
                  </span>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-2">
                <div className="mb-4 form-group" controlId="nNum">
                  <span className="form-label">N Number</span>
                  <Field
                    name="nNum"
                    className="form-control"
                    type="number"
                    disabled
                  />
                </div>
                <span className="text-danger" style={{ fontSize: "14px" }}>
                  {errors?.nNum ? errors?.nNum : ""}
                </span>
              </div>
              <div className="col-2">
                <div className="mb-4 form-group" controlId="zNum">
                  <span className="form-label">Z Number</span>
                  <Field
                    name="zNum"
                    className="form-control"
                    type="number"
                    disabled
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-4">
                <div className="mb-4 form-group" controlId="zNum">
                  <span className="form-label">
                    E Number({`'e<n' and prime to 'z'`})
                  </span>
                  <Field
                    name="eNum"
                    className="form-control"
                    type="number"
                    disabled={values.nNum <= 0 && values.zNum <= 0}
                  />
                  <span className="text-danger form-text">
                    {errors?.eNum ? errors?.eNum : ""}
                  </span>
                </div>
              </div>
            </div>
            <div className="row mb-4">
              <div className="col-4">
                <button
                  className="btn btn-success"
                  disabled={errors?.eNum || errors?.nNum}
                  onClick={() => {
                    generateDNumber(values, setFieldValue);
                  }}
                  type="button"
                >
                  Calculate Keys
                </button>
              </div>
              <div className="col-4">
                <button
                  className="btn btn-secondary float-right"
                  onClick={() => {
                    resetForm();
                    setKeys({
                      public: { eNum: null, nNum: null },
                      private: { dNum: null, nNum: null },
                    });
                  }}
                >
                  Clear
                </button>
              </div>
            </div>
            <div className="row">
              <div className="col-2">Your Public Key(e,n)</div>
              <div className="col-2">
                <div className="mb-4 form-group" controlId="zNum">
                  <span className="form-label">E</span>
                  <Field
                    name="eNum"
                    className="form-control"
                    type="number"
                    disabled
                  />
                </div>
              </div>
              <div className="col-2">
                <div className="mb-4 form-group" controlId="zNum">
                  <span className="form-label">N</span>
                  <Field
                    name="nNum"
                    className="form-control"
                    type="number"
                    disabled
                  />
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-2">Your Private Key(d,n)</div>
              <div className="col-2">
                <div className="mb-4 form-group" controlId="zNum">
                  <span className="form-label">D</span>
                  <Field
                    name="dNum"
                    className="form-control"
                    type="number"
                    disabled
                    value={errors?.eNum ? 0 : values.dNum}
                  />
                </div>
              </div>
              <div className="col-2">
                <div className="mb-4 form-group" controlId="zNum">
                  <span className="form-label">N</span>
                  <Field
                    name="nNum"
                    className="form-control"
                    type="number"
                    disabled
                  />
                </div>
              </div>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
}
