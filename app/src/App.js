import "./styles/App.css";
import data from "./data/data.json";
import { useState } from "react";

function App() {
	const [buttons, setButtons] = useState(data);

	const [operand1, setOperand1] = useState("");
	const [operator, setOperator] = useState("");
	const [operand2, setOperand2] = useState("");

	const onNumberClick = (button) => {
		if (!operator) {
			setOperand1(operand1 + String(button.content));
		} else {
			setOperand2(operand2 + String(button.content));
		}
	};

	const onOperatorClick = (button) => {
		setOperator(button.content);
	};

	const onEqualClick = () => {
		switch (operator) {
			case "+":
				setOperand1(Number(operand1) + Number(operand2));
				break;
			case "-":
				setOperand1(Number(operand1) - Number(operand2));
				break;
			default:
				break;
		}
		setOperator("");
		setOperand2("");
	};

	const onCancelClick = () => {
		setOperand1("");
		setOperator("");
		setOperand2("");
	};

	const defineOnButtonClick = (button) => {
		if (button.type === "number") {
			onNumberClick(button);
		} else if (button.type === "plus" || button.type === "minus") {
			onOperatorClick(button);
		} else if (button.type === "equal") {
			onEqualClick();
		} else if (button.type === "cancel") {
			onCancelClick();
		}
	};

	return (
		<div className="app">
			<section className="calculator">
				<div className="calculator__screen">
					<p className="calculator__screen-text">{operand1 + operator + operand2}</p>
				</div>

				<section className="calculator__button-section">
					{buttons &&
						buttons.map((button) => {
							return (
								<button
									type="button"
									className={`calculator__button${button.content === "0" ? " calculator__button-zero" : ""}${button.content === "=" ? " calculator__button-equal" : ""}`}
									key={button.id}
									onClick={() => {
										defineOnButtonClick(button);
									}}
								>
									{button.content}
								</button>
							);
						})}
				</section>
			</section>
		</div>
	);
}

export default App;
