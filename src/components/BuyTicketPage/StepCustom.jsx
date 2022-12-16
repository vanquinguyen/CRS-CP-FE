import React from "react";
import "./StepCustom.scss";

const STATUS = {
  DONE: "done",
  IN_PROGRESS: "in-progress",
  NEXT: "next",
};

const StepCustom = ({ title, desc, currentStep, setCurrentStep }) => {
  let status;
  if (currentStep > desc) {
    status = STATUS.DONE;
  } else if (currentStep < desc) {
    status = STATUS.NEXT;
  } else if (currentStep === desc) {
    status = STATUS.IN_PROGRESS;
  }
  const StepProgress = `step-progress step-progress-${status}`;
  return (
    <div
      className="step"
      onClick={() => status === "done" && setCurrentStep(desc)}
    >
      <div className="step-title">{title}</div>
      <div className={StepProgress}>
        <div className="step-desc">{desc}</div>
      </div>
    </div>
  );
};

export default StepCustom;
