import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import PageWrapper from '../components/PageWrapper';

// Configuration
const NUM_GEARS = 3;

// Helper to get place name (e.g., Units, Tens)
const getPlaceName = (index) => {
    const names = ['Units', 'Tens', 'Hundreds', 'Thousands', 'Ten Thousands'];
    return names[index] || `10^${index}`;
};

// Gear Component
const Gear = React.memo(({ index, digit, rotation }) => {
    const label = getPlaceName(index);

    return (
        <div className="gear-container">
            <div className="label">{label}</div>
            <div 
                id={`gear-${index}`} 
                className="gear"
                style={{ transform: `rotate(${rotation * 36}deg)` }} // 36 degrees per step
            ></div>
            <div id={`display-${index}`} className="digit-display">
                {digit}
            </div>
        </div>
    );
});

// Main Application Component
const MechanicalGearCounErAppPage = () => {
    // State initialization
    const [digits, setDigits] = useState(new Array(NUM_GEARS).fill(0)); // [Units, Tens, Hundreds]
    const [totalRotation, setTotalRotation] = useState(new Array(NUM_GEARS).fill(0));
    const [operation, setOperation] = useState('add');
    const [inputAmount, setInputAmount] = useState(1);
    const [statusMessage, setStatusMessage] = useState('Gears initialized and set to 0. Ready to calculate!');
    const [isAnimating, setIsAnimating] = useState(false);

    // Function to pause animation
    const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    // Initialization Function
    const initializeGears = useCallback(() => {
        setDigits(new Array(NUM_GEARS).fill(0));
        setTotalRotation(new Array(NUM_GEARS).fill(0));
        setStatusMessage('Gears initialized and set to 0. Ready to calculate!');
    }, []);

    // Effect to run initialization on mount
    useEffect(() => {
        initializeGears();
    }, [initializeGears]);


    // Core Calculation Logic
    const performOperation = async () => {
        if (isAnimating) return;
        
        const numAmount = parseInt(inputAmount);
        if (isNaN(numAmount) || numAmount <= 0) {
            setStatusMessage('Please enter a positive number.');
            return;
        }
        const maxCapacity = Math.pow(10, NUM_GEARS) - 1;
        if (numAmount > maxCapacity) {
            setStatusMessage(`Error: Input amount (${numAmount}) exceeds machine capacity (${maxCapacity}).`);
            return;
        }
        
        setIsAnimating(true);
        setStatusMessage(`${operation === 'add' ? 'Adding' : 'Subtracting'} ${numAmount}...`);
        
        const inputDigits = String(numAmount).split('').map(Number).reverse();
        let carryOrBorrow = 0;
        const operationSign = operation === 'add' ? 1 : -1;

        // Use a temporary copy of digits and rotation for the async loop
        let currentDigits = [...digits];
        let currentRotation = [...totalRotation];

        for (let i = 0; i < NUM_GEARS || carryOrBorrow !== 0; i++) {
            // Check for negative result (borrow from non-existent gear)
            if (i >= NUM_GEARS && carryOrBorrow < 0) {
                setStatusMessage(`Error: Result is negative! Cannot borrow from the next column.`);
                setIsAnimating(false);
                return;
            }

            // If we are past the number of physical gears but still handling carry/borrow
            if (i >= NUM_GEARS && carryOrBorrow === 0) break;
            if (i >= NUM_GEARS) continue; // Only process if carry/borrow exists

            
            const inputDigit = inputDigits[i] || 0; 
            const currentDigit = currentDigits[i];
            
            const totalChange = (inputDigit * operationSign) + carryOrBorrow;
            
            if (totalChange === 0 && i >= inputDigits.length && carryOrBorrow === 0) continue; 

            let newDigit;
            let newCarryOrBorrow;

            if (operation === 'add') {
                // Addition (Carry logic)
                const newValue = currentDigit + totalChange;
                newDigit = newValue % 10;
                newCarryOrBorrow = Math.floor(newValue / 10);
            } else {
                // Subtraction (Borrow logic)
                const tempValue = currentDigit + totalChange; // totalChange is negative here
                
                if (tempValue >= 0) {
                    // Simple subtraction, no borrow needed
                    newDigit = tempValue;
                    newCarryOrBorrow = 0;
                } else {
                    // Borrow required: Add 10, and generate a -1 borrow for the next column
                    newDigit = tempValue + 10;
                    newCarryOrBorrow = -1;
                }
            }
            
            // The rotation needed is proportional to the actual change requested
            const rotationSteps = totalChange;

            // Update local state copy
            currentDigits[i] = newDigit;
            currentRotation[i] += rotationSteps;
            carryOrBorrow = newCarryOrBorrow;

            // Update React state for visual refresh
            setDigits([...currentDigits]);
            setTotalRotation([...currentRotation]);
            
            const action = carryOrBorrow > 0 ? 'Carry' : carryOrBorrow < 0 ? 'Borrow' : 'Operation step';
            const actionAmount = Math.abs(carryOrBorrow) > 0 ? ` of ${Math.abs(carryOrBorrow)} generated.` : ' complete.';
            setStatusMessage(`${getPlaceName(i)} gear rotated by ${rotationSteps}. ${action}${actionAmount}`);

            // Wait for the visual transition
            await sleep(550); 
        }

        const finalResult = currentDigits.slice().reverse().join('');
        if (carryOrBorrow > 0) {
            setStatusMessage(`Operation complete. WARNING: Result (${finalResult}) exceeded machine capacity. Overflow: ${carryOrBorrow}`);
        } else {
            setStatusMessage(`Operation complete. Final Result: ${finalResult}.`);
        }

        setIsAnimating(false);
    };

    // JSX structure adapted from the original HTML
    return (
        <>
        <PageWrapper
            title="Mechanical Gear Counter"
            description="Interactive mechanical gear counter with addition and subtraction operations. Experience core mathematical operations with visual gear animations."
            keywords="gear counter, mechanical calculator, react, interactive, math, addition, subtraction"
            url="/mechanical-gear-coun-er-app"
        />
        <nav className="nav-bar" style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000 }}>
          <Link to="/" className="nav-link">← Back to Home</Link>
        </nav>
        <div style={{ 
            minHeight: '100vh', 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            justifyContent: 'flex-start',
            margin: 0, 
            padding: '2rem', 
            width: '100%', 
            paddingTop: '80px', 
            backgroundColor: '#1e1e1e', 
            color: '#cccccc',
            boxSizing: 'border-box'
        }}>
            {/* FIX: Replaced non-standard style attributes with dangerouslySetInnerHTML */}
            <style dangerouslySetInnerHTML={{__html: `
                /* Global styles for the gear visuals */
                .gear-container {
                    width: 100px;
                    height: 100px;
                    position: relative;
                    margin: 0 10px;
                }

                .gear {
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    border-radius: 50%;
                    border: 4px solid #333;
                    background-color: #A0A0A0;
                    transition: transform 0.5s ease-out;
                    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3) inset, 0 0 10px rgba(0, 0, 0, 0.1);
                }

                .gear::before {
                    content: '';
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    width: 30%;
                    height: 30%;
                    background: #2D3748;
                    border-radius: 50%;
                    box-shadow: 0 0 5px rgba(255, 255, 255, 0.5) inset;
                }

                .digit-display {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    width: 80px;
                    height: 80px;
                    background-color: #1A202C;
                    border: 2px solid #6B7280;
                    border-radius: 8px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    font-size: 3rem;
                    color: #10B981;
                    box-shadow: 0 0 10px rgba(0, 255, 150, 0.7);
                    z-index: 10;
                    font-family: monospace;
                }

                .label {
                    position: absolute;
                    top: -30px;
                    width: 100%;
                    text-align: center;
                    font-size: 0.875rem;
                    color: #CBD5E0;
                }

                .gear::after {
                    content: '';
                    position: absolute;
                    width: 120%;
                    height: 120%;
                    top: -10%;
                    left: -10%;
                    border-radius: 50%;
                    background: 
                        repeating-conic-gradient(
                            from 0deg,
                            #4B5563 0% 5%,
                            #6B7280 5% 10%,
                            transparent 10% 18%
                        );
                    mask-image: radial-gradient(circle at center, transparent 35%, black 40%);
                }
            `}} />

            <div style={{ 
                maxWidth: '900px', 
                width: '100%', 
                backgroundColor: '#252526', 
                padding: '2rem', 
                borderRadius: '4px', 
                border: '1px solid #3e3e42',
                boxSizing: 'border-box'
            }}>
                <h1 style={{ fontSize: '1.5rem', fontWeight: '500', marginBottom: '1rem', color: '#ffffff', textAlign: 'center' }}>
                    Mechanical Gear Counter
                </h1>
                <p style={{ textAlign: 'center', color: '#858585', marginBottom: '2rem', fontSize: '0.875rem' }}>
                    Experience the core operations. <strong>Addition</strong> triggers a carry. <strong>Subtraction</strong> triggers a borrow.
                </p>

                {/* Gear Display Area */}
                <div id="gear-assembly" style={{ 
                    display: 'flex', 
                    justifyContent: 'center', 
                    alignItems: 'center', 
                    padding: '1.5rem', 
                    backgroundColor: '#1e1e1e', 
                    borderRadius: '4px', 
                    border: '1px solid #3e3e42', 
                    marginBottom: '1.5rem',
                    gap: '1rem',
                    flexWrap: 'wrap'
                }}>
                    {/* Render gears from highest order (left) to lowest order (right) */}
                    {digits.slice().reverse().map((digit, index) => (
                        <Gear 
                            key={index}
                            index={NUM_GEARS - 1 - index} // Calculate true index for label/rotation mapping
                            digit={digit}
                            rotation={totalRotation[NUM_GEARS - 1 - index]}
                        />
                    ))}
                </div>

                {/* Input and Controls */}
                <div style={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'center', 
                    gap: '1rem', 
                    padding: '1.5rem', 
                    backgroundColor: '#1e1e1e', 
                    borderRadius: '4px', 
                    border: '1px solid #3e3e42' 
                }}>
                    
                    {/* Operation Selector */}
                    <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                        <label style={{ display: 'inline-flex', alignItems: 'center', fontSize: '0.875rem', color: '#cccccc', cursor: 'pointer' }}>
                            <input 
                                type="radio" 
                                name="operation" 
                                value="add" 
                                checked={operation === 'add'} 
                                onChange={() => setOperation('add')}
                                style={{ marginRight: '0.5rem', cursor: 'pointer' }}
                                disabled={isAnimating}
                            />
                            Addition (+)
                        </label>
                        <label style={{ display: 'inline-flex', alignItems: 'center', fontSize: '0.875rem', color: '#cccccc', cursor: 'pointer' }}>
                            <input 
                                type="radio" 
                                name="operation" 
                                value="subtract" 
                                checked={operation === 'subtract'} 
                                onChange={() => setOperation('subtract')}
                                style={{ marginRight: '0.5rem', cursor: 'pointer' }}
                                disabled={isAnimating}
                            />
                            Subtraction (-)
                        </label>
                    </div>
                    
                    <label htmlFor="op-input" style={{ fontSize: '0.875rem', color: '#cccccc', marginTop: '0.5rem' }}>
                        Number to Use in Operation (Max 999):
                    </label>
                    <input 
                        type="number" 
                        id="op-input" 
                        value={inputAmount} 
                        onChange={(e) => setInputAmount(e.target.value)}
                        min="1" 
                        max="999" 
                        style={{ 
                            width: '120px', 
                            textAlign: 'center', 
                            padding: '0.5rem', 
                            borderRadius: '4px', 
                            backgroundColor: '#3c3c3c', 
                            color: '#4ec9b0', 
                            border: '1px solid #3e3e42',
                            fontSize: '0.875rem',
                            outline: 'none'
                        }}
                        onFocus={(e) => e.target.style.borderColor = '#007acc'}
                        onBlur={(e) => e.target.style.borderColor = '#3e3e42'}
                        disabled={isAnimating}
                    />
                    
                    <button 
                        onClick={performOperation} 
                        style={{
                            padding: '0.5rem 1.5rem',
                            color: '#ffffff',
                            fontWeight: '400',
                            borderRadius: '4px',
                            border: 'none',
                            fontSize: '0.875rem',
                            cursor: isAnimating ? 'not-allowed' : 'pointer',
                            backgroundColor: isAnimating ? '#3c3c3c' : (operation === 'add' ? '#007acc' : '#c7254e'),
                            opacity: isAnimating ? 0.6 : 1,
                            transition: 'opacity 0.2s ease'
                        }}
                        disabled={isAnimating}
                        onMouseEnter={(e) => !isAnimating && (e.target.style.opacity = '0.8')}
                        onMouseLeave={(e) => !isAnimating && (e.target.style.opacity = '1')}
                    >
                        {isAnimating ? 'Calculating...' : `Execute ${operation === 'add' ? 'Addition' : 'Subtraction'}`}
                    </button>
                    
                    <button 
                        onClick={initializeGears} 
                        style={{
                            padding: '0.5rem 1rem',
                            backgroundColor: '#3c3c3c',
                            color: '#cccccc',
                            fontWeight: '400',
                            borderRadius: '4px',
                            border: '1px solid #3e3e42',
                            fontSize: '0.875rem',
                            cursor: isAnimating ? 'not-allowed' : 'pointer',
                            opacity: isAnimating ? 0.6 : 1,
                            transition: 'opacity 0.2s ease'
                        }}
                        disabled={isAnimating}
                        onMouseEnter={(e) => !isAnimating && (e.target.style.backgroundColor = '#454545')}
                        onMouseLeave={(e) => !isAnimating && (e.target.style.backgroundColor = '#3c3c3c')}
                    >
                        Reset Gears to 0
                    </button>
                </div>

                <div id="status-message" style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: '0.875rem', color: '#858585', minHeight: '2rem' }}>
                    {statusMessage}
                </div>
            </div>
        </div>
        </>
    );
};

export default MechanicalGearCounErAppPage;
