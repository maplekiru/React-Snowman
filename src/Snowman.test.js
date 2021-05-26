import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Snowman from "./Snowman";


it("renders Snowman without crashing", function () {
  render(<Snowman />);
});

it("matched snapshot of Snowman", function () {
  const { container } = render(<Snowman />);
  expect(container).toMatchSnapshot();
});

it("After max wrong # of guesses do not show button and show 'you lose'",
  function () {
    const { container } = render(<Snowman />);
    
    const letterB = container.querySelector("#b");
    fireEvent.click(letterB);
    const letterC = container.querySelector("#c");
    fireEvent.click(letterC);
    const letterZ = container.querySelector("#z");
    fireEvent.click(letterZ);
    const letterD = container.querySelector("#d");
    fireEvent.click(letterD);
    const letterF = container.querySelector("#f");
    fireEvent.click(letterF);
    const letterG = container.querySelector("#g");
    fireEvent.click(letterG);

    expect(
      container.querySelector('.Snowman-buttons')
    ).not.toBeInTheDocument();
    expect(container).toContainHTML("you lose");


  });


