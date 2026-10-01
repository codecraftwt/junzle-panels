import React from 'react';

export default function Header({
  onBack,
  showBack = true,
  currentStep = 1,
  totalSteps = 4,
}) {
  return (
    <div className="headerContainer">
      <div className="topRow">
        {/* Left Back Arrow Button (Figma rounded square card) */}
        <div className="leftCol">
          {showBack && (
            <button type="button" onClick={onBack} className="backButton" title="Go Back">
              <span className="backChevron">‹</span>
            </button>
          )}
        </div>

        {/* Center: Junzle Wordmark + Stepper with pill indicator */}
        <div className="centerCol">
          {/* Junzle Dark Logo */}
          <div className="logoRow">
            <img src="/assets/dark-logo.png" alt="Junzle" style={{ height: 26, objectFit: 'contain' }} />
          </div>

          {/* Stepper with connecting line and active elongated pill */}
          {totalSteps > 1 && (
            <div className="stepperContainer">
              <div className="stepperTrackLine" />
              <div
                className="stepperTrackLineProgress"
                style={{
                  width: `${
                    currentStep >= totalSteps
                      ? 110
                      : currentStep <= 1
                      ? 0
                      : Math.round(((currentStep - 1) / (totalSteps - 1)) * 110)
                  }px`,
                }}
              />
              <div className="dotsRow">
                {Array.from({ length: totalSteps }).map((_, index) => {
                  const stepIndex = index + 1;
                  const isCompleted = stepIndex < currentStep;
                  const isCurrent = stepIndex === currentStep;

                  if (isCurrent) {
                    return <div key={index} className="stepPillActive" />;
                  }

                  return (
                    <div
                      key={index}
                      className={`stepDot ${isCompleted ? 'stepDotCompleted' : 'stepDotFuture'}`}
                    />
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Right balance spacer */}
        <div className="rightCol" />
      </div>
    </div>
  );
}
