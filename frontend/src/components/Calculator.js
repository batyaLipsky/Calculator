import React, { Component } from "react";
import axios from "axios";
import exersizeModel from "../models/exerciseModel";
class Calculator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstNumber: null,
      secondNumber: null,
      result: null,
      value: "",
      id: "",
      exercises: [],
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleChangeFirstNumber = this.handleChangeFirstNumber.bind(this);
    this.handleChangeSecondNumber = this.handleChangeSecondNumber.bind(this);
    this.checkFormValidation = this.checkFormValidation.bind(this);
    this.calculate = this.calculate.bind(this);
    this.deleteExercise = this.deleteExercise.bind(this);
    this.updateExercise = this.updateExercise.bind(this);
  }
  componentDidMount() {
    axios
      .get(`https://localhost:44329/exercises`)
      .then((res) => {
        debugger;
        const exercises = res.data;
        this.setState({ exercises });
      })
      .catch((res) => console.log(res));
  }

  handleChange(event) {
    this.setState({ value: event.target.value }, () => {
      console.log("value: " + this.state.value);
      this.checkFormValidation();
    });
  }

  handleChangeFirstNumber(event) {
    this.setState({ firstNumber: event.target.value }, () => {
      console.log("firstNumber: " + this.state.firstNumber);
      this.checkFormValidation();
    });
  }
  handleChangeSecondNumber(event) {
    this.setState({ secondNumber: event.target.value }, () => {
      console.log("secondNumber: " + this.state.secondNumber);
      this.checkFormValidation();
    });
  }
  checkFormValidation() {
    if (
      this.state.firstNumber !== null &&
      this.state.secondNumber !== null &&
      this.state.value !== "NULL"
    ) {
      this.calculate();
    }
  }
  calculate() {
    axios
      .get(
        `https://localhost:44329/exercises/${this.state.value}?firstNumber=${this.state.firstNumber}&secondNumber=${this.state.secondNumber}&id=${this.state.id}`
      )
      .then((res) => {
        console.log(res.data);
        const exercises = res.data;
        this.setState({ exercises });
        this.setState({ result: [...exercises].pop().result });
        this.setState({ id: "" });
      });
  }

  deleteExercise(id) {
    const params = new URLSearchParams();
    params.append("id", id);
    axios(`https://localhost:44329/exercises/Delete/${id}`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      data: params,
    })
      .then((response) => {
        const exercises = response.data;
        this.setState({ exercises });
        this.setState({ id: "" });
      })
      .catch((error) => {
        throw error;
      });
    // axios.post(`https://localhost:44329/exercises/Delete/${id}`).then((res) => {
    //   console.log(res.data);
    //   const exercises = res.data;
    //   this.setState({ exercises });
    // });
  }

  updateExercise(exercise) {
    this.setState({ firstNumber: exercise.firstNumber });
    this.setState({ secondNumber: exercise.secondNumber });
    this.setState({ result: exercise.result });
    this.setState({ value: exercise.signName });
    this.setState({ id: exercise.id });
  }
  render() {
    return (
      <div className="container">
        <form className="row justify-content-center p-3">
          <div className="form-group col-2">
            <input
              className="form-control"
              type="number"
              value={this.state.firstNumber}
              onChange={this.handleChangeFirstNumber}
            />
          </div>
          <div className="row col-2 justify-content-center">
            <div className="form-group col-8">
              <select
                className="form-select"
                onChange={this.handleChange}
                value={this.state.value}
              >
                <option value="NULL">Select</option>
                <option value="Plus">+</option>
                <option value="Minus">-</option>
                <option value="Divide">:</option>
                <option
                  value="Multiplie"
                  selected={"Multiplie" == this.state.value}
                >
                  X
                </option>
              </select>
            </div>
          </div>
          <div className="form-group col-2">
            <input
              className="form-control"
              type="number"
              value={this.state.secondNumber}
              onChange={this.handleChangeSecondNumber}
            />
          </div>
          <div className="form-group col-1">
            <span>=</span>
          </div>
          <div className="form-group col-2">
            <input
              disabled
              className="form-control"
              type="number"
              value={this.state.result}
            />
          </div>
        </form>
        <div className="col-auto">
          <div className="col-auto">
            <table className="table table-responsive ">
              <tbody>
                {this.state.exercises.map((exercise) => (
                  <tr key={exercise.id}>
                    <td>{exercise.id}</td>
                    <td>{exercise.firstNumber}</td>
                    <td>{exercise.sign}</td>
                    <td>{exercise.secondNumber}</td>
                    <td>=</td>
                    <td>{exercise.result}</td>
                    <td onClick={() => this.deleteExercise(exercise.id)}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-x-circle"
                        viewBox="0 0 16 16"
                      >
                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                      </svg>
                    </td>
                    <td onClick={() => this.updateExercise(exercise)}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-arrow-right-circle"
                        viewBox="0 0 16 16"
                      >
                        <path
                          fillRule="evenodd"
                          d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"
                        />
                      </svg>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default Calculator;
